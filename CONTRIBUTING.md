# 为大理论合订本投稿

**只需提供推文链接，通过 Pull Request 投稿。**

1. 在 [`data/submissions.json`](data/submissions.json) 的数组末尾加入原帖 URL，例如 `https://x.com/作者/status/帖子ID`。使用真实作者账号和数字帖子 ID；移除链接末尾的分享参数。
2. 按帖子 ID 检查是否已收录。已有条目无需重复添加。
3. 提交 PR，在说明中贴上原帖链接即可。

不需要分类、标签、摘要、翻译、点赞数或截图。维护者在 PR 中审核来源与内容相关性；合并并部署后显示在网站中。

使用编码助手时，可调用仓库 [submit-theory skill](.agents/skills/submit-theory/SKILL.md)：

```text
$submit-theory https://x.com/作者/status/帖子ID
```

## 本地检查

```sh
npm ci
npm run catalog
npm run verify:catalog
npm run build
npm run verify
```

目录生成器会把投稿链接与仓库内的 `data/source-evidence.json` 合并并按帖子 ID 去重，输出 `public/api/tweets.json`。更新输入文件后运行生成器，把相关数据差异一起放入 PR。无需 X API 凭据。

维护者通过 PR 讨论修订，不使用网站投稿表单或 Issue 投稿。请保留工作区中的无关修改，只提交本次投稿所需的文件。

## 署名与许可

项目由 **Big Theory Organization** 维护。代码采用 MIT 许可，组织的原创编辑内容采用 CC BY 4.0；第三方推文及媒体的权利仍归原作者。提交原帖 URL 不代表将原帖版权转授给本项目。
