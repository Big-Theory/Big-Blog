---
name: submit-theory
description: 为大理论合订本（Big Theory Blog）通过 Pull Request 投稿推文链接。用户给出 X/Twitter 原帖链接并要求收录或投稿时使用。
---

# 通过 PR 投稿推文链接

投稿只需要 URL。先读 [CONTRIBUTING.md](../../../CONTRIBUTING.md)，检查当前分支与工作区，保留无关修改。

## 更新链接目录

- 输入位置是 `data/submissions.json`，格式为 URL 字符串数组。
- 将用户给出的 X/Twitter status 链接规范为 `https://x.com/<handle>/status/<数字ID>`，移除分享查询参数与片段。保留真实帖子 ID，不猜测或编造。
- 在投稿数组与生成目录 `public/api/tweets.json` 中按帖子 ID 检查重复。已收录则报告已有记录；新增链接只追加到投稿数组。仓库来源记录中的待审线索不等于已收录。
- 不要求用户补充分类、标签、摘要、翻译、点赞数或截图。原帖暂不可访问时，在 PR 中说明即可；不伪造抓取结果。

## 验证与提交

依赖缺失时运行 `npm ci`，然后：

```sh
npm run catalog
npm run verify:catalog
npm run build
npm run verify
```

生成器合并来源与投稿并按 ID 去重，输出 `public/api/tweets.json`。不要手工编辑生成文件；仅包含该投稿导致的输入和生成目录差异。

用户要求投稿或提交 PR 时，检查目标远程与分支，创建贡献分支，提交相关文件并打开 PR。沿用 `.github/pull_request_template.md`，描述包含推文链接和实际检查结果即可。不要合并或部署。若用户只要求准备修改，则停在本地结果；缺少远程访问时报告本地补丁与阻碍，不声称已创建 PR。

贡献项目署名为 Big Theory Organization。代码采用 MIT，组织原创编辑内容采用 CC BY 4.0；链接指向的第三方推文与媒体仍归原作者。
