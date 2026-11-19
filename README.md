# 大理论合订本 · Big Theory Blog

收集科研社区的「大理论」推文，以 X 官方嵌入展示原帖，支持搜索、排序和中文 / English 界面切换。

A collection of research-community “Grand Theory” posts, displayed through official X embeds with search, sorting, and Chinese / English navigation.

由 **Big Theory Organization** 维护。

## 投稿：只需推文链接

把原帖链接加入 [`data/submissions.json`](data/submissions.json) 的 URL 数组，提交 Pull Request 即可。无需填写分类、标签、摘要、翻译或点赞数。

也可以让编码助手使用仓库 skill：

```text
$submit-theory https://x.com/作者/status/帖子ID
```

详见 [投稿说明](CONTRIBUTING.md) 和 [submit-theory skill](.agents/skills/submit-theory/SKILL.md)。维护者审核并合并后，网站随部署更新。

## 本地运行

```sh
npm ci
npm run dev
```

生成目录并检查：

```sh
npm run catalog
npm run verify:catalog
npm run build
npm run verify
```

`data/source-evidence.json` 保存仓库内的来源记录，`data/submissions.json` 保存投稿链接。生成器按推文 ID 去重，生成供网页使用的 `public/api/tweets.json`；请修改输入文件，不要直接修改生成目录。网页不把历史采集指标展示为实时数据。X 嵌入不可用时，仍可通过原帖链接访问来源。

## 部署

GitHub Pages 使用 `.github/workflows/deploy-pages.yml`，由 `main` 更新或手动运行触发。仓库 Pages 的发布来源需设为 **GitHub Actions**。

## 版权与许可

- 代码采用 [MIT](LICENSE) 许可。
- Big Theory Organization 的原创编辑内容采用 [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) 许可。
- 第三方推文、图片及其他引用内容的权利归原作者所有，不受本站代码或原创编辑内容许可覆盖。
