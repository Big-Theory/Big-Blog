"""Offline regression checks for archive retention and discovery accounting."""
import importlib.util
import json
import os
from pathlib import Path
import sys
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('discovery', Path(__file__).with_name('discover_x_theories.py'))
discovery = importlib.util.module_from_spec(spec)
spec.loader.exec_module(discovery)


class DiscoveryTests(unittest.TestCase):
    def test_paginated_search_filters_likes_and_stops_repeated_cursor(self):
        page = {'data': [{'id': '10', 'author_id': '1', 'public_metrics': {'like_count': 20}},
                         {'id': '11', 'public_metrics': {'like_count': 19}}],
                'includes': {'users': [{'id': '1', 'username': 'author'}]},
                'meta': {'next_token': 'repeat'}}
        with patch.dict(os.environ, {'X_BEARER_TOKEN': 'test-only'}), \
                patch.object(discovery, 'fetch_json', return_value=page) as fetch:
            self.assertEqual(discovery.search_via_official_x_api(['theory'], 20), ['author/status/10'])
            self.assertEqual(fetch.call_count, 2)
            self.assertIn('next_token=repeat', fetch.call_args.args[0])

    def run_collection(self, old, response, seeds=None, extra_args=None):
        with tempfile.TemporaryDirectory() as folder:
            output = Path(folder) / 'archive.json'
            seed_file = Path(folder) / 'seeds.json'
            output.write_text(json.dumps({'posts': old}))
            seed_file.write_text(json.dumps({'posts': seeds or []}))
            argv = ['discover', '--output', str(output), '--seed-file', str(seed_file),
                    '--max-posts', '1', '--target-count', '50', '--require-target'] + (extra_args or [])
            with patch.object(sys, 'argv', argv), \
                    patch.object(discovery, 'SEED_POSTS', ['author/status/10']), \
                    patch.object(discovery, 'search_via_official_x_api', return_value=[]), \
                    patch.object(discovery, 'fetch_fxtwitter_post', return_value=response), \
                    patch.object(discovery.time, 'sleep'):
                code = discovery.main()
            return code, json.loads(output.read_text())

    def test_failed_refresh_preserves_existing_archive(self):
        old = {'id': '10', 'url': 'https://x.com/author/status/10', 'text': 'original archive',
               'metrics': {'likes': 21}, 'author': {'handle': 'author'}}
        code, data = self.run_collection([old], None)
        self.assertEqual(code, 2)
        self.assertEqual(data['posts'][0], old)
        self.assertEqual(data['total_theory_posts'], 1)
        self.assertFalse(data['target_met'])
        self.assertEqual(data['collection_status']['results'][0]['status'], 'fetch_failed')

    def test_freshly_below_threshold_not_counted_but_text_retained(self):
        old = {'id': '10', 'url': 'https://x.com/author/status/10', 'text': 'original archive',
               'metrics': {'likes': 21}, 'author': {'handle': 'author'}}
        _, data = self.run_collection([old], {'id': '10', 'likes': 19, 'text': 'changed'})
        self.assertEqual(data['total_theory_posts'], 0)
        self.assertEqual(data['posts'][0]['text'], old['text'])
        self.assertFalse(data['posts'][0]['current_threshold_met'])

    def test_new_editorial_post_is_excerpt_and_counted_once(self):
        tweet = {'id': '10', 'url': 'https://x.com/author/status/10', 'likes': 20,
                 'text': '大合作理论' + '文本' * 100, 'author': {'screen_name': 'author'}}
        seeds = [{'id': '10', 'url': tweet['url'], 'editorially_relevant': True,
                  'title': {'zh': '大合作理论', 'en': 'Collaboration'}, 'kind': 'theory'}]
        _, data = self.run_collection([], tweet, seeds)
        self.assertEqual(len(data['posts']), 1)
        self.assertEqual(data['total_theory_posts'], 1)
        post = data['posts'][0]
        self.assertEqual(post['text_status'], 'excerpt')
        self.assertLessEqual(len(post['text']), 23)
        self.assertEqual(post['original_character_count'], len(tweet['text']))
        self.assertFalse(post['verification']['official_x_api'])

    def test_keyword_candidate_needs_editorial_review(self):
        _, data = self.run_collection([], {'id': '10', 'text': '大斜率理论', 'likes': 30})
        self.assertEqual(data['total_verified_posts'], 1)
        self.assertEqual(data['total_theory_posts'], 0)
        self.assertEqual(data['posts'][0]['verification']['relevance'], 'keyword_candidate')


if __name__ == '__main__':
    unittest.main()
