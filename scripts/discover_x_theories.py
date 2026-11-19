#!/usr/bin/env python3
"""Discover and verify public 大理论 source posts with an explicit collection target.

Searches bounded, paginated Official X API results when authenticated, then follows
public source links using FixTweet metadata. Existing archived texts are retained.
New discoveries contain short excerpts, bilingual editorial summaries when supplied
in the seed file, source provenance, and observed metrics. They are not full archives.
Unreviewed keyword matches are excluded from the editorial target count.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import time
import tempfile
import urllib.error
from concurrent.futures import ThreadPoolExecutor
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

SEED_POSTS = [
    "xzhang_billy/status/2121879505170210981",
]

DEFAULT_SEARCH_QUERIES = [
    '("大" "理论") (PhD OR 读博 OR 基模 OR 顶会 OR 科研 OR citation) lang:zh -is:retweet',
    '("大Bench理论" OR "大实习理论" OR "大粉理论" OR "大日结理论" OR "大斜率理论" OR "HR理论") -is:retweet',
    'url:"2121879505170210981" -is:retweet',
    '("大合作理论" OR "大理论理论" OR "大吞噬理论" OR "大密度理论" OR "大审美理论" OR "大开放理论" OR "大水群理论" OR "大心流理论") -is:retweet',
]

STATUS_PATTERN = re.compile(
    r"(?:https?://)?(?:www\.)?(?:x\.com|twitter\.com)/([A-Za-z0-9_]+)/status/(\d+)"
)


def fetch_json(url: str, headers: dict[str, str] | None = None, timeout: int = 20) -> dict[str, Any] | None:
    req_headers = {
        "User-Agent": "Big-Blog-Archiver/1.0 (+https://github.com/Big-Theory/Big-Blog)",
        "Accept": "application/json",
    }
    if headers:
        req_headers.update(headers)
    req = urllib.request.Request(url, headers=req_headers)
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as exc:
        print(f"[warn] request failed for {url}: {exc}", file=sys.stderr)
        return None


def fetch_fxtwitter_post(ref: str) -> dict[str, Any] | None:
    clean_ref = ref.strip().lstrip("/")
    m = STATUS_PATTERN.search(clean_ref)
    if m:
        clean_ref = f"{m.group(1)}/status/{m.group(2)}"
    data = fetch_json(f"https://api.fxtwitter.com/{clean_ref}")
    if data and data.get("code") == 200 and isinstance(data.get("tweet"), dict):
        return data["tweet"]
    return None


def extract_linked_statuses(tweet: dict[str, Any]) -> list[str]:
    found: list[str] = []
    text = tweet.get("text") or ""
    for user, status_id in STATUS_PATTERN.findall(text):
        found.append(f"{user}/status/{status_id}")

    raw_facets = (tweet.get("raw_text") or {}).get("facets") or []
    for facet in raw_facets:
        repl = facet.get("replacement") or ""
        m = STATUS_PATTERN.search(repl)
        if m:
            found.append(f"{m.group(1)}/status/{m.group(2)}")

    quote = tweet.get("quote")
    if isinstance(quote, dict) and quote.get("id"):
        q_author = (quote.get("author") or {}).get("screen_name") or "i"
        found.append(f"{q_author}/status/{quote['id']}")

    return list(dict.fromkeys(found))


def search_via_official_x_api(queries: list[str], min_likes: int,
                              max_pages: int = 5, endpoint: str = "recent",
                              diagnostics: list[str] | None = None) -> list[str]:
    """Read bounded pages; never treat missing credentials as a successful search."""
    diagnostics = diagnostics if diagnostics is not None else []
    discovered: list[str] = []
    bearer = os.environ.get("X_BEARER_TOKEN") or os.environ.get("TWITTER_BEARER_TOKEN")
    xurl_bin = shutil.which("xurl")
    if not bearer:
        try:
            status = subprocess.run([xurl_bin, "auth", "status"], capture_output=True,
                                    text=True, timeout=15) if xurl_bin else None
            if not status or status.returncode or "No apps registered" in status.stdout + status.stderr:
                diagnostics.append("official_x_search_unavailable: no bearer token or authenticated xurl app")
                return []
        except (OSError, subprocess.TimeoutExpired):
            diagnostics.append("official_x_search_unavailable: xurl authentication check failed")
            return []
    for query in queries:
        token = None
        seen_tokens: set[str] = set()
        for _ in range(max_pages):
            params = {"query": query, "max_results": 100,
                      "tweet.fields": "public_metrics,author_id,created_at,note_tweet",
                      "expansions": "author_id", "user.fields": "username,name"}
            if token:
                params["next_token"] = token
            path = f"/2/tweets/search/{endpoint}?{urllib.parse.urlencode(params)}"
            if bearer:
                payload = fetch_json("https://api.x.com" + path, {"Authorization": f"Bearer {bearer}"})
            else:
                try:
                    proc = subprocess.run([xurl_bin, path], capture_output=True, text=True, timeout=35)
                    payload = json.loads(proc.stdout) if proc.returncode == 0 else None
                except (OSError, subprocess.TimeoutExpired, json.JSONDecodeError):
                    payload = None
            if not payload or not isinstance(payload.get("data", []), list) or payload.get("errors"):
                diagnostics.append(f"official_x_search_failed: {endpoint}; check access, rate limits and credits")
                break
            users = {u["id"]: u.get("username", "i") for u in payload.get("includes", {}).get("users", [])}
            for item in payload.get("data", []):
                if item.get("public_metrics", {}).get("like_count", 0) >= min_likes:
                    discovered.append(f"{users.get(item.get('author_id'), 'i')}/status/{item['id']}")
            token = payload.get("meta", {}).get("next_token")
            if not token or token in seen_tokens:
                break
            seen_tokens.add(token)
    return list(dict.fromkeys(discovered))


def relevant_theory(text: str) -> bool:
    """Conservative candidate screen. Editorial review still determines relevance."""
    return bool(re.search(r"大.{0,12}理论|实习理论|HR\s*理论|PhD.*(?:理论|bench)|读博.*(?:理论|反馈)", text, re.I | re.S))


def excerpt(text: str, limit: int = 22) -> str:
    # A conservative 22-character excerpt also bounds Chinese text quotations.
    return text[:limit] + ("…" if len(text) > limit else "")


def write_json_atomic(path: Path, payload: dict[str, Any]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.NamedTemporaryFile("w", encoding="utf-8", dir=path.parent, delete=False) as f:
        json.dump(payload, f, ensure_ascii=False, indent=2)
        f.write("\n")
        temp = Path(f.name)
    temp.replace(path)


def normalize_tweet(tweet: dict[str, Any]) -> dict[str, Any]:
    author = tweet.get("author") or {}
    quote = tweet.get("quote")
    normalized_quote = None
    if isinstance(quote, dict) and quote.get("id"):
        q_author = quote.get("author") or {}
        q_media = ((quote.get("media") or {}).get("photos") or [])
        normalized_quote = {
            "id": quote.get("id"),
            "url": quote.get("url"),
            "text": quote.get("text"),
            "likes": quote.get("likes", 0),
            "author": {
                "name": q_author.get("name"),
                "handle": q_author.get("screen_name"),
            },
            "photos": [p.get("url") for p in q_media if p.get("url")],
        }

    return {
        "id": tweet.get("id"),
        "url": tweet.get("url"),
        "text": tweet.get("text"),
        "created_at": tweet.get("created_at"),
        "created_timestamp": tweet.get("created_timestamp"),
        "lang": tweet.get("lang"),
        "is_note_tweet": bool(tweet.get("is_note_tweet")),
        "metrics": {
            "likes": tweet.get("likes", 0),
            "bookmarks": tweet.get("bookmarks", 0),
            "views": tweet.get("views", 0),
            "retweets": tweet.get("retweets", 0),
            "replies": tweet.get("replies", 0),
            "quotes": tweet.get("quotes", 0),
        },
        "author": {
            "name": author.get("name"),
            "handle": author.get("screen_name"),
            "url": author.get("url"),
            "bio": author.get("description"),
            "location": author.get("location"),
            "avatar_url": author.get("avatar_url"),
            "website": (author.get("website") or {}).get("url")
            if isinstance(author.get("website"), dict)
            else None,
            "followers": author.get("followers", 0),
            "verified": bool((author.get("verification") or {}).get("verified")),
        },
        "quote": normalized_quote,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description="Discover >=20-like 大理论 posts; preserve prior archives.")
    parser.add_argument("--min-likes", type=int, default=20)
    parser.add_argument("--target-count", type=int, default=50)
    parser.add_argument("--require-target", action="store_true", help="Exit 2 when target remains unmet")
    parser.add_argument("--max-pages", type=int, default=5)
    parser.add_argument("--max-posts", type=int, default=300, help="Bound the number of public lookups")
    parser.add_argument("--search-endpoint", choices=["recent", "all"], default="recent")
    parser.add_argument("--extra-url", action="append", default=[])
    parser.add_argument("--query", action="append", default=[])
    parser.add_argument("--seed-file", default="data/discovery-seeds.json")
    parser.add_argument("--output", default="data/source-evidence.json")
    args = parser.parse_args()
    if min(args.min_likes, args.target_count, args.max_pages, args.max_posts) < 1:
        parser.error("thresholds and limits must be positive")

    now = datetime.now(timezone.utc).isoformat()
    diagnostics: list[str] = []
    out_path = Path(args.output)
    previous = json.loads(out_path.read_text()) if out_path.exists() else {}
    if not isinstance(previous.get("posts", []), list):
        parser.error("existing output must contain a posts array; refusing to overwrite")
    accepted = {str(p["id"]): p for p in previous.get("posts", [])
                if isinstance(p, dict) and p.get("id") and p.get("metrics", {}).get("likes", 0) >= args.min_likes}
    seeds_path = Path(args.seed_file)
    seeds = json.loads(seeds_path.read_text()).get("posts", []) if seeds_path.exists() else []
    seed_metadata = {str(p["id"]): p for p in seeds if p.get("id")}
    queue = list(SEED_POSTS) + args.extra_url + [p["url"] for p in seeds if p.get("url")]
    queue += [p["url"] for p in accepted.values() if p.get("url")]
    queue += search_via_official_x_api(DEFAULT_SEARCH_QUERIES + args.query, args.min_likes,
                                      args.max_pages, args.search_endpoint, diagnostics)
    # Prefetch only the initial unique bounded batch; discovered links are fetched on demand.
    normalized_queue = []
    queued_ids: set[str] = set()
    for ref in queue:
        match = STATUS_PATTERN.search(ref)
        normalized = f"{match.group(1)}/status/{match.group(2)}" if match else ref
        if re.fullmatch(r"[A-Za-z0-9_]+/status/\d+", normalized):
            source_id = normalized.split("/")[-1]
            if source_id not in queued_ids:
                queued_ids.add(source_id)
                normalized_queue.append(normalized)
    queue = list(dict.fromkeys(normalized_queue))
    initial = queue[:args.max_posts]
    with ThreadPoolExecutor(max_workers=4) as pool:
        prefetched = dict(zip(initial, pool.map(fetch_fxtwitter_post, initial)))
    visited: set[str] = set()
    results: list[dict[str, Any]] = []
    refreshed = 0
    index = 0
    while index < len(queue) and len(visited) < args.max_posts:
        ref = queue[index]
        index += 1
        match = STATUS_PATTERN.search(ref)
        tid = match.group(2) if match else ref.split("/")[-1]
        if not tid.isdigit() or tid in visited:
            continue
        visited.add(tid)
        tweet = prefetched.pop(ref) if ref in prefetched else fetch_fxtwitter_post(ref)
        if not tweet:
            results.append({"id": tid, "status": "fetch_failed", "retained": tid in accepted})
            continue
        for child in extract_linked_statuses(tweet):
            if child.split("/")[-1] not in visited:
                queue.append(child)
        likes = int(tweet.get("likes") or 0)
        meta = seed_metadata.get(tid, {})
        relevant = tid in accepted or meta.get("editorially_relevant") is True or relevant_theory(tweet.get("text") or "")
        if likes < args.min_likes:
            # Keep old source text as evidence but do not count a failed fresh threshold.
            if tid in accepted:
                accepted[tid]["latest_observed_likes"] = likes
                accepted[tid]["current_threshold_met"] = False
            results.append({"id": tid, "status": "below_threshold", "likes": likes})
            continue
        if not relevant:
            results.append({"id": tid, "status": "needs_relevance_review", "likes": likes,
                            "url": tweet.get("url")})
            continue
        record = normalize_tweet(tweet)
        if tid in accepted:
            old = accepted[tid]
            # Preserve the original snapshot (including verbatim text) byte-for-byte in its fields.
            old["latest_metrics"] = record["metrics"]
            old["last_verified_at"] = now
            old["current_threshold_met"] = True
            old.setdefault("text_status", "existing_archive")
            if meta.get("editorially_relevant"):
                for key in ["title", "summary", "kind"]:
                    if key in meta:
                        old[key] = meta[key]
                if old.get("verification"):
                    old["verification"]["relevance"] = "editorial"
        else:
            full_text = record.get("text") or ""
            record["text"] = excerpt(full_text)
            record["text_status"] = "excerpt"
            record["original_character_count"] = len(full_text)
            if record.get("quote"):
                record["quote"]["text"] = ""  # quoted-post text is not needed to verify this source
            record["verification"] = {"provider": "FixTweet public API", "checked_at": now,
                                      "official_x_api": False, "relevance": "editorial" if meta.get("editorially_relevant") else "keyword_candidate"}
            for key in ["title", "summary", "kind"]:
                if key in meta:
                    record[key] = meta[key]
            accepted[tid] = record
        refreshed += 1
        results.append({"id": tid, "status": "verified", "likes": likes})
        print(f"[verified] status/{tid}: {likes} likes")
        time.sleep(0.15)

    posts = sorted(accepted.values(), key=lambda p: p["metrics"]["likes"], reverse=True)
    count = sum(p.get("current_threshold_met", True) for p in posts)
    # An image-only quotation/context post is evidence, not an independent theory.
    for p in posts:
        if str(p["id"]) == "2109230855822708859":
            p["kind"] = "context"
    theory_count = sum(p.get("kind") != "context" and p.get("current_threshold_met", True)
                       and p.get("verification", {}).get("relevance") != "keyword_candidate" for p in posts)
    payload = {**previous, "schema_version": "1.1", "generated_at": now,
               "quality_threshold_min_likes": args.min_likes,
               "seed_post": f"https://x.com/{SEED_POSTS[0]}",
               "total_verified_posts": count, "total_theory_posts": theory_count,
               "target_count": args.target_count, "target_met": theory_count >= args.target_count,
               "posts": posts,
               "collection_status": {"attempted": len(visited), "refreshed": refreshed,
                   "search_endpoint": args.search_endpoint, "diagnostics": list(dict.fromkeys(diagnostics)),
                   "remaining_to_target": max(0, args.target_count - theory_count),
                   "pending_queue_count": max(0, len(queue) - index),
                   "note": "Counts include prior verified snapshots when refresh fails. New posts contain excerpts, not full archives.",
                   "results": results}}
    write_json_atomic(out_path, payload)
    print(f"[done] {theory_count}/{args.target_count} theory posts; {count} total source records; target_met={payload['target_met']}")
    for warning in diagnostics:
        print(f"[notice] {warning}", file=sys.stderr)
    return 2 if args.require_target and not payload["target_met"] else 0


if __name__ == "__main__":
    raise SystemExit(main())
