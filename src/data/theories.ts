import { TheoryEntry } from '../types';

export const CANONICAL_THEORIES: TheoryEntry[] = [
  {
    id: 'theory-01-big-bench',
    slug: 'big-bench',
    catalogCode: 'THEORY · 01',
    category: 'paradigm',
    title: {
      zh: '大 Bench 理论',
      en: 'The Grand Benchmark Theory',
    },
    subtitle: {
      zh: '基模吞噬一切时代的学术重构与挂件自救纲领',
      en: 'Academic Survival & Task Formalization Under Foundation-Model Cannibalization',
    },
    axiomFormula: 'lim(FM → ∞) Subfield = Dataset ⊕ Benchmark ⊕ Attention',
    axiomSummary: {
      zh: '当基础模型（Foundation Models）吞噬一切细分赛道时，PhD 唯一具备正期望值的科研生态位，是将跨界领域改造为「基模友好型」的数据集与评测基准（Benchmark），并辅以可直接触达模型权重的传播策略。',
      en: 'As Foundation Models cannibalize specialized subfields, the PhD researcher’s sole positive-EV niche is to reformulate domain problems into foundation-model-friendly datasets and benchmarks—amplified by multi-platform distribution.',
    },
    fullTextParagraphs: {
      zh: [
        "基模吞噬一切的情况下，PhD 感觉真的只能造 bench。",
        "想了想，这里面学问其实好多。",
        "一方面得学会怎么定义一个清晰的问题，同时尽量跟别人切入的角度不一样。现在很多情憵是大家都有共识，一个 idea 谁都能想到，全拼手速和资源。但执行力确实也很关键，毕竟 talk (maybe) still is cheap。",
        "二是把跨界的变成「基模友好型」。最近半年也逐渐看到，自己做的领域从风头正盛，慢慢要沦为基模挂件（甚至快保不住了。后来想，与其悲伤，不如造数据、造 bench：把自己的数据做成方便基模训的，把任务做成方便基模完成的，把自己的研究方向逐渐变成给基模定义的一个任务。",
        "三是要学会宣传，尤其是多平台宣传，毕竟大粉理论。但宣传策略上也要贴合基模，be like 基模能直接改模型权重这种。Attention is all you need。",
        "这波看似是基模思维了，实际上是没招了。"
],
      en: [
        'As Foundation Models swallow everything in their path, it genuinely feels like building benchmarks is the only viable path left for a PhD.',
        'Upon reflection, however, there is surprisingly deep craft hidden inside this survival strategy.',
        'First, you must learn to define a crisp problem from an angle orthogonal to everyone else. Right now, consensus forms instantly—any decent idea occurs to ten labs simultaneously, turning research into a brute-force race of typing speed and GPU clusters. Still, execution remains decisive; talk (maybe) is still cheap.',
        'Second, convert interdisciplinary domains into "Foundation-Model-Friendly" formats. Over the past six months, I have watched my own once-thriving subfield slowly get demoted into a mere plugin for foundation models—and barely hold onto even that status. Rather than mourning, build data and build benchmarks: structure your domain data so foundation models can train on it effortlessly, frame tasks so foundation models can evaluate on them cleanly, and redefine your entire research area as a canonical task specification for foundation models.',
        'Third, master multi-platform evangelism—after all, the Big-Fandom Theory holds. Yet even your publicity must speak the native tongue of foundation-model teams, pitching insights that look ready to shift model weights directly. Attention is, quite literally, all you need.',
        'On the surface, this looks like peak Foundation-Model Mindset; in truth, we have simply run out of other cards to play.',
      ],
    },
    highlightQuote: {
      zh: '与其悲伤，不如造数据、造 bench：把自己的研究方向逐渐变成给基模定义的一个任务……这波看似是基模思维了，实际上是没招了。',
      en: 'Rather than mourning, build data and benchmarks: redefine your entire subfield as a canonical task for foundation models. It looks like Foundation-Model Mindset; in truth, we simply ran out of cards.',
    },
    corollaries: [
      {
        title: {
          zh: '正交切入与执行速度定理',
          en: 'Orthogonal Framing & Execution Velocity',
        },
        detail: {
          zh: '共识性 Idea 的半衰期已缩短至周级别；差异化问题定义（Problem Formulation）叠加极致执行手速，是小算力团队对抗大厂算力碾压的唯一壁垒。',
          en: 'Consensus ideas decay within weeks; differentiated problem formulation paired with relentless execution is the last moat for compute-constrained PhDs.',
        },
      },
      {
        title: {
          zh: '挂件顺民化改造公设',
          en: 'The Plugin Domestication Postulate',
        },
        detail: {
          zh: '一切试图在架构层对抗基模的垂直小模型终将被苦涩教训（The Bitter Lesson）清算；主动向基模提供清洗好的训练语料与评测标尺，方能从「被吞噬者」转为「立标尺者」。',
          en: 'Vertical bespoke architectures inevitably lose to The Bitter Lesson; supplying clean training corpora and evaluation rulers converts a doomed subfield into an indispensable judge.',
        },
      },
      {
        title: {
          zh: '大粉耦合宣传律',
          en: 'Fandom-Coupled Weight-Shift Evangelism',
        },
        detail: {
          zh: '造出的 Bench 若无人跑分则等于零；必须与「大粉理论」耦合，在 X 与小红书进行多平台宣发，使基模团队相信该 Bench 能直接指导 Post-training 权重更新。',
          en: 'An un-run benchmark has zero academic mass; multi-platform amplification must convince frontier lab researchers that your benchmark directly informs post-training weights.',
        },
      },
    ],
    lineageAndContext: {
      zh: '由香港中文大学（CUHK）博士生 Xinye (Victor) Li (@vclee8) 于 2026 年 11 月提出，单帖斩获 27.5 万阅读与 444 赞，成为 2026 秋季简中 AI 博士圈传播最广的范式总结。该理论精准捕捉了多模态、3D、Agent 等垂直方向在原生基模泛化能力冲击下的集体焦虑，并主动将「大粉理论」纳入其第三公设。',
      en: 'Formulated in November 2026 by CUHK PhD researcher Xinye (Victor) Li (@vclee8), garnering 275k+ views and 444 likes. It captures the existential pivot across vision, 3D, and agent subfields as frontier models absorb downstream tasks, explicitly integrating the Big-Fandom Theory as its distribution engine.',
    },
    peerReviewNote: {
      zh: '审稿委员会按：《慢科研倡议》呼吁学生不要急于在两三个月内产出论文，而《大 Bench 理论》揭示了残酷的另一面——你慢下来打磨精巧模块的那半年，基模升了一代，你的整个研究方向直接消失了。',
      en: 'Editorial Note: Where the Slow Research Initiative urges patience over rapid publication, the Grand Benchmark Theory exposes the structural trap: spend six quiet months crafting an elegant module, and the next foundation-model release may deprecate your entire subfield overnight.',
    },
    tags: {
      zh: ['基模吞噬', 'Benchmark', '苦涩教训', '研究品味'],
      en: ['Foundation Models', 'Benchmarking', 'Bitter Lesson', 'Problem Framing'],
    },
    source: {
      platform: 'X',
      tweetId: '2120212679470268893',
      url: 'https://x.com/vclee8/status/2120212679470268893',
      publishedAt: '2026-11-10T17:51:09Z',
      publishedDateDisplay: '2026-11-10',
      verifiedMinLikes20: true,
    },
    author: {
      name: 'Xinye (Victor) Li',
      handle: 'vclee8',
      profileUrl: 'https://x.com/vclee8',
      affiliation: {
        zh: '香港中文大学 (CUHK) 博士生 · Data & Benchmark / World Models',
        en: 'PhD Student @ CUHK · Data & Benchmark, Foundation & World Models',
      },
      location: 'Hong Kong',
      website: 'http://asdfo123.github.io',
      avatarUrl: 'https://pbs.twimg.com/profile_images/2037087337315000320/PwXlWsuL_200x200.jpg',
      followers: 607,
    },
    metrics: {
      likes: 444,
      bookmarks: 313,
      views: 275230,
      retweets: 45,
      replies: 23,
      quotes: 16,
    },
    coordinates: {
      pragmatism: 68,
      shortDuration: 34,
    },
    citationKey: 'li2026bigbench',
  },
  {
    id: 'theory-02-big-hr',
    slug: 'big-hr',
    catalogCode: 'THEORY · 02',
    category: 'career',
    title: {
      zh: 'HR 理论',
      en: 'HR Theory',
    },
    subtitle: {
      zh: '寒冬就业市场下 AI 博士的人力资源同构与终极转行猜想',
      en: 'Structural Isomorphism Between AI Doctoral Training and Technical Recruiting',
    },
    axiomFormula: 'AI_PhD ≅ Tech_HR ≅ SAC(Candidates, Headcount)',
    axiomSummary: {
      zh: '在算力集中与教职冻结的就业寒冬中，AI PhD 五年练就的「个人账号宣发、技术鉴别、同门人脉网、AI 自动化流与审稿仲裁」五大技能树，在拓扑结构上与顶级技术猎头 / HR 完全同构——本质上，HR 就是工业界招聘流程里的 SAC（Senior Area Chair）。',
      en: 'Amid tight academic job markets, the five core competencies of an AI PhD—social amplification, technical vetting, lab-network reach, AI workflow automation, and meta-review arbitration—are structurally isomorphic to elite Tech HR: you become the Senior Area Chair (SAC) of talent.',
    },
    fullTextParagraphs: {
      zh: [
        "面对今年异常艰难的就业市场，AI PhD 或许更适合转行做 HR：\n1. 深谙大粉理论，个人账号宣传效果拉满。\n2. 懂技术，更能精准匹配候选人与实际业务需求。\n3. 人脉直达目标群体，同门、同行遍地都是。\n4. 熟练使用 AI 工具，招聘提效、候选人体验双提升。\n5. 某种程度上，你就是招聘流程里的 SAC。"
],
      en: [
        'Facing this year’s brutally unforgiving job market, AI PhDs might actually be best suited to pivot into HR and technical recruiting:',
        '1. Fluent in the Big-Fandom Theory—personal social accounts already maximize inbound publicity and employer branding.',
        '2. Deeply technical—capable of matching candidates to real model/system bottlenecks rather than keyword-matching resumes.',
        '3. Zero-hop network access—labmates, co-authors, and conference peers already populate the exact target talent pool.',
        '4. Native mastery of AI tooling—automating sourcing pipelines while elevating candidate experience.',
        '5. Ultimately, you are the SAC (Senior Area Chair) of the hiring pipeline.',
      ],
    },
    highlightQuote: {
      zh: '深谙大粉理论，个人账号宣传效果拉满……某种程度上，你就是招聘流程里的 SAC。',
      en: 'Fluent in the Big-Fandom Theory, wired straight into the lab network—ultimately, you are the Senior Area Chair (SAC) of the hiring pipeline.',
    },
    corollaries: [
      {
        title: {
          zh: 'OpenReview—ATS 映射定理',
          en: 'The OpenReview–ATS Mapping Theorem',
        },
        detail: {
          zh: '面试官打分即 Reviewer 审稿（含大量随机噪声与个人偏见），Hiring Manager 争抢 HC 即 Rebuttal 博弈，而懂技术的 PhD 型 HR 则是手握生杀予夺建议权的 SAC。',
          en: 'Interviewer scorecards mirror noisy NeurIPS reviews, hiring-manager calibration mirrors AC rebuttal battles, and the technical PhD recruiter presides as Senior Area Chair.',
        },
      },
      {
        title: {
          zh: '零跳同门图谱套利',
          en: 'Zero-Hop Co-Author Graph Arbitrage',
        },
        detail: {
          zh: '传统猎头靠冷邮件大海捞针，AI PhD 只需在师门群与顶会酒局问一句「谁今年毕业想看机会」，即可实现亚秒级精准触达与高信噪比背调。',
          en: 'Where legacy recruiters cold-message blindly on LinkedIn, an AI PhD queries co-author WeChat groups and NeurIPS socials for instant, high-signal backchannel calibration.',
        },
      },
      {
        title: {
          zh: '挖矿卖铲子对冲律',
          en: 'The Pick-and-Shovel Talent Hedge',
        },
        detail: {
          zh: '结合「大日结理论」，当大模型研究员跳槽频率缩至半年一结时，按年薪比例抽成的顶尖 AI 猎头/HR 反而比亲自下场炼丹拥有更稳健的夏普比率（Sharpe Ratio）。',
          en: 'Paired with the Mark-to-Market Theory, rapid researcher turnover across frontier labs turns technical talent brokerage into a higher-Sharpe business than training models yourself.',
        },
      },
    ],
    lineageAndContext: {
      zh: '由新加坡国立大学（NUS）博士生 Xuan (Billy) Zhang (@xzhang_billy) 于 2026 年 11 月 4 日提出（110 赞、4.08 万阅读），随后在《简中区 PhD 相关理论总纲》中被正式列为第六大理论。一句「你就是招聘流程里的 SAC」精准击中顶会审稿制度与大厂招聘黑箱的荒诞共鸣。',
      en: 'Proposed by NUS PhD researcher Xuan (Billy) Zhang (@xzhang_billy) on November 4, 2026 (110 likes, 40.8k views). The punchline—"you are the SAC of the hiring pipeline"—instantly resonated across researchers exhausted by both OpenReview lotteries and tech headcount freezes.',
    },
    peerReviewNote: {
      zh: '审稿委员会按：建议各大实验室将「模拟 SAC 仲裁与高潜候选人精准挖角」纳入博士资格考（Qualifying Exam），毕业即无缝衔接百万年薪 AI Talent Partner。',
      en: 'Editorial Note: Doctoral programs should consider replacing outdated qualifying exams with simulated SAC calibration and frontier-lab talent poaching practicums.',
    },
    tags: {
      zh: ['就业寒冬', 'SAC同构', '人脉套利', '职业转型'],
      en: ['Job Market', 'SAC Isomorphism', 'Talent Graph', 'Career Pivot'],
    },
    source: {
      platform: 'X',
      tweetId: '2117991393683750962',
      url: 'https://x.com/xzhang_billy/status/2117991393683750962',
      publishedAt: '2026-11-04T14:44:33Z',
      publishedDateDisplay: '2026-11-04',
      verifiedMinLikes20: true,
    },
    author: {
      name: 'Xuan (Billy) Zhang',
      handle: 'xzhang_billy',
      profileUrl: 'https://x.com/xzhang_billy',
      affiliation: {
        zh: '新加坡国立大学 (NUS) 博士生 · Big-Theory 编纂发起人',
        en: 'PhD Researcher @ National University of Singapore (NUS)',
      },
      location: 'Singapore',
      website: 'https://xuanzhang.io',
      avatarUrl: 'https://pbs.twimg.com/profile_images/2102328956859142144/u7hTrfLy_200x200.jpg',
      followers: 659,
    },
    metrics: {
      likes: 110,
      bookmarks: 29,
      views: 40792,
      retweets: 6,
      replies: 26,
      quotes: 10,
    },
    coordinates: {
      pragmatism: 86,
      shortDuration: 52,
    },
    citationKey: 'zhang2026hr',
  },
  {
    id: 'theory-03-big-slope',
    slug: 'big-slope',
    catalogCode: 'THEORY · 03',
    category: 'paradigm',
    title: {
      zh: '大斜率理论',
      en: 'The High-Slope Theory',
    },
    subtitle: {
      zh: '一阶导数本质主义：唯有最高增长斜率之事方为本质',
      en: 'First-Derivative Essentialism: Only Steepest-Gradient Endeavors Are Fundamental',
    },
    axiomFormula: 'Essential(x) ⟺ dV(x)/dt = max  ∧  d(Noise)/dt = 0',
    axiomSummary: {
      zh: '技术浪潮与个人投入的唯一判准在于「斜率」（一阶导数）：做斜率最高的事情就是本质的，否则就是不本质的；绝不能让次要事务稀释主航道的斜率。',
      en: 'In exponential technology waves, first-derivative steepness is the sole criterion of ontological essence: working on the highest-slope trajectory is fundamental; everything else is non-essential noise that must never dilute your primary gradient.',
    },
    fullTextParagraphs: {
      zh: [
        "我曾和mihoyo创始人大伟哥交谈，关于LLM的投入问题，他反复强调，做某些事情，\"斜率\"是最高的，不能让次要的事情影响到主要的事情的\"斜率\".  我将在接下来发展大斜率理论，做斜率高的事情，就是本质的，否则就是不本质的."
],
      en: [
        'I once spoke with miHoYo founder Dawei Liu regarding resource allocation in LLMs. He emphasized repeatedly that certain endeavors possess the steepest "slope," and one must never allow secondary matters to compromise the "slope" of the primary mission. Going forward, I shall develop the High-Slope Theory: pursuing high-slope endeavors is essential; anything else is non-essential.',
      ],
    },
    highlightQuote: {
      zh: '做斜率高的事情，就是本质的，否则就是不本质的。不能让次要的事情影响到主要的事情的「斜率」。',
      en: 'Pursuing high-slope endeavors is essential; anything else is non-essential. Never allow secondary matters to dilute the slope of the primary mission.',
    },
    corollaries: [
      {
        title: {
          zh: '斜率即本体论公理',
          en: 'Ontology of the First Derivative',
        },
        detail: {
          zh: '传统学术界执着于静态的「完备性」与「优雅性」，但在 Scaling Law 与大模型迭代周期中，导数（变化率）直接决定了十二个月后的绝对高度。低斜率赛道的精雕细琢终将被高斜率赛道的溢出效应覆盖。',
          en: 'Classical academia prizes static elegance, yet under Scaling Laws the derivative dictates absolute altitude twelve months out; low-slope craftsmanship gets swept away by high-slope spillover.',
        },
      },
      {
        title: {
          zh: '次要杂事正交裁剪律',
          en: 'Ruthless Pruning of Sub-Gradient Distractions',
        },
        detail: {
          zh: '横向杂活、凑数挂名、无意义审稿拉扯与迎合缺乏客观标准的「老登评价体系」，表面上增加了简历厚度，实则严重拖慢主线认知的复利斜率。',
          en: 'Side-quest projects, token co-authorships, and appeasing subjective legacy gatekeepers pad CVs in the short run while fatally flattening your main learning curve.',
        },
      },
      {
        title: {
          zh: '赛道择时大于局部勤奋',
          en: 'Regime Selection Dominates Local Grinding',
        },
        detail: {
          zh: '在具身智能（VLA vs WAM）、Post-training 强化学习与原生多模态路线之争中，选对陡峭曲线的一阶红利远超在饱和曲线上刷 0.3% SOTA。',
          en: 'Across LLM RL, world models, and embodied AI route debates, positioning on an inflection curve outweighs grinding 0.3% SOTA gains on a saturated benchmark.',
        },
      },
    ],
    lineageAndContext: {
      zh: '由香港大学 MMLab 博士生 Yue Su (@Selen7005717917) 于 2026 年 10 月 27 日受米哈游创始人刘伟（大伟哥）关于 LLM 投入对话启发而正式命名（85 赞），并迅速外溢至具身智能（VLA/WAM 路线之争）与高能物理转 AI（逃离低斜率传统权威评价体系）的广泛行业讨论中。',
      en: 'Coined on October 27, 2026 by HKU MMLab PhD researcher Yue Su (@Selen7005717917) following a conversation with miHoYo founder Dawei Liu on LLM investment, and rapidly adopted across Embodied AI (VLA vs. WAM) and frontier RL communities.',
    },
    peerReviewNote: {
      zh: '审稿委员会按：《大斜率理论》以极具张力的绝对化修辞（「否则就是不本质的」）完成了对功利主义与本质主义的惊险缝合——当斜率成为唯一正义，慢科研便成了需要极高定力才敢踏入的逆风局。',
      en: 'Editorial Note: With its uncompromising binary—"essential vs. non-essential"—High-Slope Theory fuses venture-scale velocity with philosophical essentialism, standing in direct tension with Slow Research.',
    },
    tags: {
      zh: ['大伟哥', 'Scaling Law', '第一性原理', '路线选择'],
      en: ['Scaling Law', 'First Derivative', 'Route Selection', 'Focus'],
    },
    source: {
      platform: 'X',
      tweetId: '2115096138223342072',
      url: 'https://x.com/Selen7005717917/status/2115096138223342072',
      publishedAt: '2026-10-27T14:59:50Z',
      publishedDateDisplay: '2026-10-27',
      verifiedMinLikes20: true,
    },
    author: {
      name: 'Yue Su',
      handle: 'Selen7005717917',
      profileUrl: 'https://x.com/Selen7005717917',
      affiliation: {
        zh: '香港大学 (HKU) MMLab 博士生 · Founder of IAAI Team',
        en: 'PhD at MMLab @ HKU · Next Transformer Initiator',
      },
      location: 'Hong Kong',
      website: 'http://selen-suyue.github.io',
      avatarUrl: 'https://pbs.twimg.com/profile_images/1883348413330419712/jAvSAo6a_200x200.jpg',
      followers: 1612,
    },
    metrics: {
      likes: 85,
      bookmarks: 29,
      views: 6612,
      retweets: 4,
      replies: 13,
      quotes: 0,
    },
    coordinates: {
      pragmatism: 42,
      shortDuration: -28,
    },
    citationKey: 'su2026slope',
  },
  {
    id: 'theory-04-big-fandom',
    slug: 'big-fandom',
    catalogCode: 'THEORY · 04',
    category: 'attention',
    title: {
      zh: '大粉理论',
      en: 'The Big-Fandom Theory',
    },
    subtitle: {
      zh: '注意力经济不等式：社交媒体粉丝量大于学术引用量',
      en: 'The Attention-Economy Inequality: Social Followers Outweigh Scholar Citations',
    },
    axiomFormula: '|Followers(X ∪ RedNote)|  >  |Citations(Google_Scholar)|',
    axiomSummary: {
      zh: '在顶会论文单届破五千篇的严重通货膨胀时代，被动等待检索与审稿周期的传统学术传播链路已经拥塞失效；研究者在 X（Twitter）与小红书上的粉丝数与主动声量，在求职、合作、开源影响力与资源调配上的真实权重已超越 Google Scholar 引用数。',
      en: 'In an era of 5,000-paper conference inflation, passive academic discovery has collapsed; a PhD’s follower count and active reach on X and Xiaohongshu carry higher real-world weight for collaboration, recruiting, and impact than Google Scholar citations.',
    },
    fullTextParagraphs: {
      zh: [
        "大粉理论：对于PhD来说，推特/小红书粉丝数量>Google Scholar Citation数量"
],
      en: [
        'The Big-Fandom Theory: For a PhD student today, your follower count on X (Twitter) / Xiaohongshu > your Google Scholar citation count.',
      ],
    },
    highlightQuote: {
      zh: '大粉理论：对于 PhD 来说，推特 / 小红书粉丝数量 > Google Scholar Citation 数量。',
      en: 'For a PhD researcher today: X / Xiaohongshu Follower Count > Google Scholar Citation Count.',
    },
    quotedOrigin: {
      id: '210923085582270859',
      url: 'https://x.com/Alenjonesyi/status/2109230855822708859',
      authorName: 'sudo fixes everything',
      authorHandle: 'Alenjonesyi',
      likes: 143,
      views: 24562,
      caption: {
        zh: '引用源推文（@Alenjonesyi，143 赞）：「大晚上看到🍠这篇笔记有点没绷住」',
        en: 'Quoted Catalyst Post (@Alenjonesyi, 143 Likes): "Saw this Xiaohongshu note late at night and lost my composure"',
      },
      extractedText: {
        zh: 'PhD应该不遗余力地搞传播学。\nPhD应该不遗余力地建立个人IP。\nPhD应该不遗余力地让更多人认识你。',
        en: 'PhDs should spare no effort mastering media communication.\nPhDs should spare no effort building a personal IP.\nPhDs should spare no effort making more people know your name.',
      },
    },
    corollaries: [
      {
        title: {
          zh: '顶会通胀与注意力稀缺第一定律',
          en: 'Conference Inflation & Attention Scarcity Law',
        },
        detail: {
          zh: '当早年一年几百篇精读论文演变为如今单会数千篇灌水洪流，同行已不再通过翻阅 Proceedings 发现工作，而是依赖社交推荐流筛选 Research Taste。没有分发，再好的工作也是暗物质。',
          en: 'When conferences balloon from hundreds to thousands of papers, peers stop browsing proceedings and rely on social feeds to filter research taste; unpromoted work becomes academic dark matter.',
        },
      },
      {
        title: {
          zh: '引用滞后 vs 社交即时反馈闭环',
          en: 'Citation Lag vs. Zero-Latency Taste Clustering',
        },
        detail: {
          zh: 'Citation 是滞后 12–24 个月且极易被综述/刷榜劫持的指标；而在 X 与小红书分享 Minimal Hypothesis 与 Toy Experiment，能在 24 小时内聚拢同频合作者与工业界 Sponsor。',
          en: 'Citations lag by 12–24 months and suffer Goodhart distortion; sharing minimal hypotheses and open-source artifacts on social platforms attracts collaborators and compute sponsors within 24 hours.',
        },
      },
      {
        title: {
          zh: '诸大理论的通用耦合底座',
          en: 'Universal Coupling Base Across Grand Theories',
        },
        detail: {
          zh: '无论是《大 Bench 理论》的第三公设（贴合基模多平台宣发），还是《HR 理论》的第一公设（个人账号宣传拉满），皆显式调用了「大粉理论」作为基础引流算子。',
          en: 'Both Grand Benchmark Theory (Axiom 3) and PhD-to-HR Theory (Axiom 1) explicitly import Big-Fandom Theory as their foundational distribution operator.',
        },
      },
    ],
    lineageAndContext: {
      zh: '「大粉理论」由港大 NLP 博士生、小米 MiMo 研究员李磊在播客访谈中系统阐述（「Attention is all you need 在个人发展层面的显性化」），后由康奈尔大学（Cornell）CS 博士生、Qwen 实习研究员 Collin Zhang (@collinzrj2001) 于 2026 年 10 月 11 日在引用小红书「PhD 搞传播学三连」暴论时提炼为极简不等式公式，单帖获 13.2 万阅读与 77 赞，成为整个「大理论宇宙」引用率最高的基石公理。',
      en: 'Articulated conceptually by HKU NLP PhD & Xiaomi MiMo researcher Lei Li in podcast interviews ("Attention is all you need made explicit in personal careers"), and crystallized into its iconic inequality by Cornell CS PhD & Qwen intern Collin Zhang (@collinzrj2001) on October 11, 2026 (132k views, 77 likes), quoting @Alenjonesyi’s viral Xiaohongshu screenshot (143 likes).',
    },
    peerReviewNote: {
      zh: '审稿委员会按：最具讽刺意味的莫过于——连批判或解构「大粉理论」的帖子本身，也必须遵循「大粉理论」的传播学规律才能被人看见。本学刊亦不例外。',
      en: 'Editorial Note: The ultimate self-referential proof of Big-Fandom Theory is that even critiques of Big-Fandom Theory must obey its laws of algorithmic distribution to be read—this very journal included.',
    },
    tags: {
      zh: ['注意力经济', '个人IP', 'Citation通胀', '传播学'],
      en: ['Attention Economy', 'Personal IP', 'Citation Inflation', 'SciComm'],
    },
    source: {
      platform: 'X',
      tweetId: '2109310595690336566',
      url: 'https://x.com/collinzrj2001/status/2109310595690336566',
      publishedAt: '2026-10-11T15:50:09Z',
      publishedDateDisplay: '2026-10-11',
      verifiedMinLikes20: true,
    },
    author: {
      name: 'Collin Zhang',
      handle: 'collinzrj2001',
      profileUrl: 'https://x.com/collinzrj2001',
      affiliation: {
        zh: '康奈尔大学 (Cornell) CS 博士生 · Qwen 研究实习生',
        en: 'CS PhD Student @ Cornell · Research Intern @ Alibaba Qwen',
      },
      avatarUrl: 'https://pbs.twimg.com/profile_images/1857109563184418817/eavA_UMk_200x200.jpg',
      followers: 156,
    },
    metrics: {
      likes: 77,
      bookmarks: 38,
      views: 132449,
      retweets: 2,
      replies: 7,
      quotes: 5,
    },
    coordinates: {
      pragmatism: 78,
      shortDuration: 64,
    },
    citationKey: 'zhang2026fandom',
  },
  {
    id: 'theory-05-big-internship',
    slug: 'big-internship',
    catalogCode: 'THEORY · 05',
    category: 'career',
    title: {
      zh: '大实习理论',
      en: 'The Grand Internship Theory',
    },
    subtitle: {
      zh: '头衔祛魅与真实反馈杠杆：读博本身不是杠杆，实习才是',
      en: 'Prestige Flattening & Real-World Feedback: The PhD Is Not the Leverage—Internships Are',
    },
    axiomFormula: 'Leverage(Title, Prestige) → 0,   Leverage(Real_World_Feedback) ≫ 1',
    axiomSummary: {
      zh: 'AI 已经把论文、代码、工具与静态知识全部拉平；名校光环、导师头衔与实验室规模的溢价正在迅速归零。唯一还能拉开代际差距的，是你有没有进入一线工业界真实问题与大规模基础设施中拿到过硬核反馈。',
      en: 'AI has flattened access to papers, code, tools, and static knowledge, driving university and advisor prestige premiums toward zero. The sole remaining differentiator is closed-loop feedback earned inside real frontier industrial problems.',
    },
    fullTextParagraphs: {
      zh: [
        "我将提出实习理论：",
        "清北华五还是港三新二，没用。 导师是杰青还是新ap，没用。 是大组还是小组，没用。\nAI把论文、代码、工具、知识，全部拉平了。 你能读到的，别人也能读到。 你能调的，别人也能调。\n真正还在拉开差距的，只剩你有没有在真实问题里拿到过反馈。\n读博本身不是杠杆。 实习才是。\n别人还在纠结哪个组更响。 你已经在真实场景里交过卷了。\n镜子不会因为你名校title就多给你五分。 \n不要把学校和头衔看得太重。 把实习做完。 把反馈拿回来。 把选择权留在自己手里。\n这才是AI时代读博真正该抓住的东西。"
],
      en: [
        'I hereby propose the Internship Theory:',
        'Tsinghua, Peking, C9, or HKU/NUS/NTU—it no longer matters.\nWhether your advisor is a decorated senior chair or a brand-new AP—it no longer matters.\nBig famous lab or tiny group—it no longer matters.',
        'AI has leveled every paper, codebase, tool, and body of textbook knowledge.\nWhat you can read, everyone else can read.\nWhat you can tune locally, everyone else can tune.',
        'The only force still separating trajectories is whether you have closed the loop on real-world problems and received ground-truth feedback.\nThe PhD degree itself is not the leverage.\nThe internship is.',
        'While others agonize over which lab carries a louder name,\nyou have already shipped answers in live production arenas.\nreality’s mirror will not award you five extra points for an elite university crest.',
        'Stop over-indexing on alma maters and titles.\nFinish the internship.\nBring back the real feedback.\nKeep optionality firmly in your own hands.\nThat is what a PhD in the AI era must actually seize.',
      ],
    },
    highlightQuote: {
      zh: '读博本身不是杠杆。实习才是。镜子不会因为你名校 title 就多给你五分。',
      en: 'The PhD itself is not the leverage—the internship is. Reality’s mirror awards zero bonus points for an elite university crest.',
    },
    corollaries: [
      {
        title: {
          zh: '知识拉平与算力鸿沟二象性',
          en: 'Knowledge Flattening vs. Infra Asymmetry',
        },
        detail: {
          zh: 'LLM 让公开论文与开源代码的阅读门槛归零，但千卡集群经验、真实脏数据分布与线上 RL 崩溃排障只存在于工业界一线实验室内。不去实习，就只能在象牙塔玩具集上空转。',
          en: 'LLMs democratized code and literature comprehension, yet cluster-scale failure modes, proprietary data distributions, and post-training recipes exist only inside frontier labs.',
        },
      },
      {
        title: {
          zh: 'Title 折旧定律',
          en: 'Rapid Depreciation of Academic Pedigree',
        },
        detail: {
          zh: '招生季纠结「港三新二还是华五」「大牛组边缘人还是新 AP 嫡系」属于典型的上一世代路径依赖；真实工程与模型产出构成的无偏镜子对一切虚名免疫。',
          en: 'Obsessing over university tiers or advisor seniority reflects pre-LLM path dependence; empirical model capability acts as an unbiased mirror indifferent to pedigree.',
        },
      },
      {
        title: {
          zh: '选择权本位主义',
          en: 'Optionality Standard of Doctoral Training',
        },
        detail: {
          zh: '把读博五年的核心资产从「一纸学位证」重定义为「连续多段高密度工业界正反馈与 Return Offer 选择权」，彻底夺回面对学界内卷时的议价主动权。',
          en: 'Redefining doctoral equity from a diploma to compounded industrial feedback loops and return-offer optionality restores agency to the student.',
        },
      },
    ],
    lineageAndContext: {
      zh: '由 CUHK 博士生 Xinye (Victor) Li (@vclee8) 于 2026 年 10 月 10 日率先以宣言体（「我将提出实习理论：」）发布，斩获 71 赞与 30 收藏，开启了其个人「大实习 + 大 Bench」双子星理论体系，也是简中 PhD 圈从「卷申博选组」转向「卷核心组实习」的分水岭文本。',
      en: 'Published in manifesto verse by CUHK PhD student Xinye (Victor) Li (@vclee8) on October 10, 2026 (71 likes, 30 bookmarks), forming a twin pillar alongside his Grand Benchmark Theory and marking the shift from lab-prestige obsession to frontier-internship pragmatism.',
    },
    peerReviewNote: {
      zh: '审稿委员会按：如果说《慢科研倡议》代表了高校导师希望学生留在实验室沉心静气的古典理想，《大实习理论》则是博士生用脚投票给出的现实主义答卷——不是不想慢，而是象牙塔里没有万卡集群的真实反馈。',
      en: 'Editorial Note: If Slow Research voices faculty hopes for unhurried campus contemplation, Grand Internship Theory is the doctoral cohort’s realist rebuttal: campus clusters simply lack the ground-truth feedback loop of frontier industry.',
    },
    tags: {
      zh: ['工业界反馈', '头衔祛魅', '选择权', '杠杆率'],
      en: ['Industry Feedback', 'Anti-Pedigree', 'Optionality', 'Leverage'],
    },
    source: {
      platform: 'X',
      tweetId: '2108964342679183668',
      url: 'https://x.com/vclee8/status/2108964342679183668',
      publishedAt: '2026-10-10T16:54:16Z',
      publishedDateDisplay: '2026-10-10',
      verifiedMinLikes20: true,
    },
    author: {
      name: 'Xinye (Victor) Li',
      handle: 'vclee8',
      profileUrl: 'https://x.com/vclee8',
      affiliation: {
        zh: '香港中文大学 (CUHK) 博士生 · Data & Benchmark / World Models',
        en: 'PhD Student @ CUHK · Data & Benchmark, Foundation & World Models',
      },
      location: 'Hong Kong',
      website: 'http://asdfo123.github.io',
      avatarUrl: 'https://pbs.twimg.com/profile_images/2037087337315000320/PwXlWsuL_200x200.jpg',
      followers: 607,
    },
    metrics: {
      likes: 71,
      bookmarks: 30,
      views: 7973,
      retweets: 4,
      replies: 2,
      quotes: 1,
    },
    coordinates: {
      pragmatism: 74,
      shortDuration: 18,
    },
    citationKey: 'li2026internship',
  },
  {
    id: 'theory-06-daily-settlement',
    slug: 'big-daily-settlement',
    catalogCode: 'THEORY · 06',
    category: 'labor',
    title: {
      zh: '大日结理论',
      en: 'The Mark-to-Market Theory (Daily Settlement)',
    },
    subtitle: {
      zh: '从三和大神到 OpenAI 顶尖研究员：对手方风险飙升下的 T+0 人生清算',
      en: 'From Sanhe Day-Laborers to Frontier Lab Hoppers: T+0 Settlement Under Counterparty Distrust',
    },
    axiomFormula: 'lim(Counterparty_Trust → 0) Settlement_Cycle = T + 0',
    axiomSummary: {
      zh: '打工的本质是一张信用久期合约：对手方越不可信，结算周期就必然越短。如同期货「逐日盯市」与美股 T+1 改革，当员工不再相信公司四年后还在、公司也不再相信员工明年还有用时，从按 Token 计费的大模型到几个月一跳槽买断期权的 AI 顶薪研究员，全社会都在向三和大神式的「日结化」收敛；唯有身上那些「不按天结算」的作品、名声与身边之人，才能对抗力气的折旧。',
      en: 'Employment is a credit-duration contract: as counterparty trust approaches zero, settlement cycles shrink toward T+0—exactly like futures mark-to-market. From per-token LLM APIs to frontier AI researchers cashing out unvested equity every few months, modern elite labor is converging on day-labor settlement; only non-daily-settled assets—enduring work, reputation, and loved ones—resist depreciation.',
    },
    fullTextParagraphs: {
      zh: [
        "最近刷到很多东西 大家都从上班变成了接活。写代码按项目结 设计按单结 短剧群演按天结 数据标注按条结 陪诊 上门喂猫 婚礼跟拍全按次结。连大模型都是日结的 按token收钱 用完就走。",
        "国内大厂的大模型团队到OpenAI Anthropic 哪怕是非常高位的人也是说走就走 很多人干不满一年 几个月就换地方 Anthropic还有人股权没兑现就走了。",
        "以前日结是三和大神的专属标签 干一天玩三天 被当成笑话看。现在回头看 我觉得他们只是比我们早想明白了。",
        "我第一反应想到的是期货的逐日盯市。每天收盘 交易所把你的盈亏当天结清 保证金不够就得补 补不上就强平。这么麻烦 是因为交易所不确定你明天还在不在。对手方越不可信 结算周期就越短。美股2024年把结算从T+2缩到T+1 理由也是降低对手方风险。",
        "打工也是一份合约。月薪按月结 年终奖按年结 期权按四年结 退休金按几十年结。周期越长 你借给公司的劳动越多 你得相信它到时候还在 还认账。现在你不信公司明天还在 公司也不信你明天还有用 两边都不想被拖欠 那就今天的活今天结。三和大神只是最早一批对老板说我不信你的人。",
        "大模型圈的高位的人其实也在日结 只是单价高。猎头天天报价 新东家把你没归属的期权折现买断 本来四年结清的账 几个月就按市价结一次。",
        "长期饭票本来是一张长久期的债 年轻时少给你一点 后面靠晋升涨薪补回来。可现在35岁就可能被优化 这份溢价还没兑付就作废了 锁住反而亏 聪明人自然往短了走。",
        "但日结有个代价 钱结清了 经验也跟着结清了。而且日结的价也不稳定 今天年轻能拿一百五 一年后身体精力往下走 可能只能拿一百。力气是会折旧的。这是三和最让我难过的地方。大模型圈跳得太勤 什么都没做出来就走 一样会掉价。能一直被高价挖的 是身上有不按天结算的东西的人 做过的模型 论文 带过的团队 圈子里的名声 猎头的价其实是给这些的。",
        "写到这里我也有点不确定 技能的保质期在变短 论文一两个会议季就过时 连名声都换得很快 人生可能也在慢慢变成日结。我现在能想到还按年结算的 大概只剩身边的人了。"
],
      en: [
        'Lately everything across my feed shows people shifting from salaried jobs to piecework gigs. Code settled per project, design per ticket, micro-drama extras per day, data labeling per row, hospital companionship, cat-sitting, wedding shoots—all settled per session. Even Large Language Models work day-labor: billed per token, paid and dismissed on the spot.',
        'From domestic Big Tech LLM teams all the way to OpenAI and Anthropic, even remarkably senior researchers walk out at a moment’s notice. Many stay less than a year, switching labs every few months; some at Anthropic even walked away before their equity vested.',
        'Daily settlement used to be the exclusive badge of the "Sanhe Gods"—work one day, wander three, treated as a cautionary joke. Looking back now, I think they simply figured out the math earlier than the rest of us.',
        'My immediate intuition as a quant went to futures Mark-to-Market. Every market close, the exchange settles your PnL that very day; fall below maintenance margin and you top up or get liquidated. Exchanges endure this friction because they cannot trust you will still be solvent tomorrow. The lower the counterparty trust, the shorter the settlement cycle—the exact reason US equities compressed settlement from T+2 to T+1 in 2024.',
        'Employment is likewise a credit contract. Base salary settles monthly, bonuses annually, stock options over four years, pensions over decades. The longer the cycle, the more labor you lend the firm on credit—betting it will still exist and honor its ledger. Today, you don’t trust the firm will need you tomorrow, and the firm doesn’t trust your skills won’t be obsolete tomorrow. Neither side wants counterparty default, so today’s labor settles today. Sanhe day-laborers were merely the first cohort to look bosses in the eye and say: I don’t buy your long bond.',
        'Top大模型 researchers are working day-labor too—just at astronomical unit prices. Recruiters quote daily spot prices; rival labs buy out unvested four-year equity grants in cash, marking a four-year bond to market every few months.',
        'Career tenure used to be a long-duration bond: underpaid in youth, compensated later via seniority and promotion. When 35-year-old "optimization" cancels that bond before maturity, locking into long duration has negative convexity; rational actors shorten duration.',
        'Yet daily settlement carries a tragic hidden cost: when cash settles cleanly at dusk, accumulated compounding often resets to zero too. Spot labor depreciates as stamina fades—150 yuan today, 100 next year. That was always the saddest part of Sanhe. Frontier AI researchers who job-hop every quarter without shipping a single defining model depreciate the exact same way. Those who command enduring buyouts carry assets that refuse daily settlement: landmark models shipped, foundational papers, teams built, reputation earned.',
        'Even writing that, I hesitate—skill half-lives are shrinking, papers age out in one or two conference cycles, even reputations turn over faster than ever. Perhaps human life itself is drifting toward daily settlement. Right now, the only contract I can think of that still settles in years is the people standing beside us.',
      ],
    },
    highlightQuote: {
      zh: '对手方越不可信，结算周期就越短……我现在能想到还按年结算的，大概只剩身边的人了。',
      en: 'The lower the counterparty trust, the shorter the settlement cycle… Right now, the only contract left that still settles in years is the people beside us.',
    },
    corollaries: [
      {
        title: {
          zh: '劳动合约的期货逐日盯市同构律',
          en: 'Labor Duration & Mark-to-Market Compression',
        },
        detail: {
          zh: '四年期权、终身教职（Tenure）本质是高久期信用债；当 AI 技术颠覆率与裁员违约率飙升（CDS 利差走阔），理性个体必然抛售长久期画饼，拥抱签字费（Sign-on）与买断折现的短久期结算。',
          en: 'Four-year vesting and academic tenure are long-duration bonds; when technological obsolescence widens default spreads, rational agents dump long promises for T+0 spot cash.',
        },
      },
      {
        title: {
          zh: '高频日结的折旧陷阱',
          en: 'The Spot-Labor Depreciation Trap',
        },
        detail: {
          zh: '纯粹出卖当期算力/体力的日结会导致经验随日清零；无论是三和零工还是频繁横跳却无代表作的大模型研究员，一旦缺乏「不按天结算」的底层代表作，议价权将随年龄单调递减。',
          en: 'Pure spot labor resets compounding each evening; frequent lab-hopping without shipping a landmark artifact erodes pricing power just like physical day-labor.',
        },
      },
      {
        title: {
          zh: '亲密关系作为最后的长久期资产',
          en: 'Intimacy as Humanity’s Last Long-Duration Bond',
        },
        detail: {
          zh: '当代码按项目结、API 按 Token 结、论文一两个顶会季就过时，唯有真实的人际羁绊与深度信任仍保留着「按年乃至按生结算」的反脆弱久期。',
          en: 'When APIs settle per token and papers expire in two conference seasons, human companionship remains the final sanctuary of multi-year settlement.',
        },
      },
    ],
    lineageAndContext: {
      zh: '由新加坡国立大学（NUS）CS 博士候选人兼量化研究员「鸭基米德」(@persdre) 于 2026 年 11 月 4 日撰写（23 赞、12 收藏）。这也是本学刊将高质门槛定为「≥20 赞」的黄金标尺——它虽无流量噱头，却以金融工程「逐日盯市（Mark-to-Market）」与久期定价视角，写出了 2026 简中大理论中最具文学性与社会学纵深的一篇散文诗。',
      en: 'Written on November 4, 2026 by NUS CS PhD candidate & quant researcher @persdre ("Archimedes Duck", 23 likes, 12 bookmarks). Bridging financial derivatives (mark-to-market, T+1 settlement, bond duration) with labor sociology, it stands as the literary crown jewel of the Grand Theories corpus.',
    },
    peerReviewNote: {
      zh: '审稿委员会按：全文 882 字无一句废话，从 Token 计费写到三和大神，再从期货强平写回身边之人。若大理论合订本只选一篇收入未来社会学教科书，必属此篇。',
      en: 'Editorial Note: In 882 characters—moving seamlessly from per-token billing and Sanhe day-laborers to futures margin calls and human intimacy—this essay achieves genuine sociological permanence.',
    },
    tags: {
      zh: ['逐日盯市', '久期压缩', '三和大神', '大模型跳槽'],
      en: ['Mark-to-Market', 'Duration Risk', 'Labor Economics', 'AI Talent'],
    },
    source: {
      platform: 'X',
      tweetId: '2117955709778403425',
      url: 'https://x.com/persdre/status/2117955709778403425',
      publishedAt: '2026-11-04T12:22:45Z',
      publishedDateDisplay: '2026-11-04',
      verifiedMinLikes20: true,
    },
    author: {
      name: '鸭基米德 (Persdre)',
      handle: 'persdre',
      profileUrl: 'https://x.com/persdre',
      affiliation: {
        zh: '新加坡国立大学 (NUS) CS 博士候选人 & 量化研究员 (ex-SJTU)',
        en: 'CS PhD Candidate & Quant Researcher @ NUS · LLM for Finance',
      },
      location: 'Singapore',
      website: 'https://persdre.github.io/',
      avatarUrl: 'https://pbs.twimg.com/profile_images/1835003451929137152/GQDK4zvD_200x200.jpg',
      followers: 922,
    },
    metrics: {
      likes: 23,
      bookmarks: 12,
      views: 3080,
      retweets: 2,
      replies: 3,
      quotes: 0,
    },
    coordinates: {
      pragmatism: 28,
      shortDuration: 88,
    },
    citationKey: 'persdre2026daily',
  },
  {
    id: 'theory-00-prolegomena',
    slug: 'prolegomena-six-schools',
    catalogCode: 'SYNTHESIS · 00',
    category: 'synthesis',
    title: {
      zh: '简中 PhD 大理论总纲（百家争鸣篇）',
      en: 'Prolegomena to the Six Sinophone PhD Grand Theories',
    },
    subtitle: {
      zh: '2026 秋季简中青年学者民间学派编目与系统耦合总览',
      en: 'Canonical Taxonomy & Systemic Coupling of 2026 Doctoral Survival Schools',
    },
    axiomFormula: 'Grand_System = {Bench, Internship, Fandom, MarkToMarket, HighSlope, HR}',
    axiomSummary: {
      zh: '单点吐槽只是情绪，六派合流便成了时代的精神拓扑学：当「大斜率」指引赛道、「大 Bench」重构课题、「大实习」提供真实杠杆、「大粉」放大注意力权重、「大日结」完成久期祛魅、「HR 理论」备好退路，当代 AI PhD 自发完成了一套严丝合缝的认知自救闭环。',
      en: 'An isolated complaint is mere venting; six theories synthesized form an intellectual topology. Together—High-Slope route selection, Benchmark framing, Internship leverage, Fandom distribution, Mark-to-Market duration pricing, and HR exit optionality—constitute a complete closed-loop survival calculus for the 2026 PhD.',
    },
    fullTextParagraphs: {
      zh: [
        "总结下简中区与PhD相关理论：\n1. 大 Bench 理论：https://x.com/vclee8/status/2120212679470268893\n2. 大实习理论：\nhttps://x.com/vclee8/status/2108964342679183668\n3. 大粉理论：\nhttps://x.com/collinzrj2001/status/2109310595690336566\n4. 大日结理论：https://x.com/persdre/status/2117955709778403425\n5. 大斜率理论：https://x.com/Selen7005717917/status/2115096138223342072\n6. HR 理论：https://x.com/xzhang_billy/status/2117991393683750962\n颇有百家争鸣的氛围"
],
      en: [
        'Summarizing the emerging PhD-related Grand Theories across the Sinophone research community:',
        '1. The Grand Benchmark Theory (大 Bench 理论): https://x.com/vclee8/status/2120212679470268893',
        '2. The Grand Internship Theory (大实习理论): https://x.com/vclee8/status/2108964342679183668',
        '3. The Big-Fandom Theory (大粉理论): https://x.com/collinzrj2001/status/2109310595690336566',
        '4. The Mark-to-Market Daily-Settlement Theory (大日结理论): https://x.com/persdre/status/2117955709778403425',
        '5. The High-Slope Theory (大斜率理论): https://x.com/Selen7005717917/status/2115096138223342072',
        '6. The PhD-to-HR Theory (HR 理论): https://x.com/xzhang_billy/status/2117991393683750962',
        'Truly the atmosphere of a Hundred Schools of Thought contending.',
      ],
    },
    highlightQuote: {
      zh: '总结下简中区与 PhD 相关六大理论——颇有百家争鸣的氛围。',
      en: 'Six Sinophone PhD Grand Theories side by side—truly the atmosphere of a Hundred Schools of Thought contending.',
    },
    corollaries: [
      {
        title: {
          zh: '六派完备性定理',
          en: 'Completeness Theorem of the Six Schools',
        },
        detail: {
          zh: '六大理论分别精确覆盖了博士生涯的六个正交自由度：选方向（大斜率）、立题目（大 Bench）、找杠杆（大实习）、做分发（大粉）、签契约（大日结）、谋退路（HR 理论）。',
          en: 'The six theories span all six orthogonal degrees of doctoral freedom: Direction (Slope), Problem (Bench), Leverage (Internship), Distribution (Fandom), Contract (Daily Settlement), and Pivot (HR).',
        },
      },
      {
        title: {
          zh: '收藏大于点赞的私藏效应',
          en: 'The Bookmark-Over-Like Revealed Preference',
        },
        detail: {
          zh: '该总纲推文获得 614 次收藏（超过 526 次公开点赞，Bookmark/Like 比高达 1.17）——证明大量博士生嘴上不敢在导师可见的时间线点赞，身体却诚实地将其收入深夜自救收藏夹。',
          en: 'Accumulating 614 bookmarks against 526 public likes (a 1.17x bookmark-to-like ratio), this synthesis reveals massive silent resonance among PhDs hesitant to like publicly under advisor visibility.',
        },
      },
      {
        title: {
          zh: '从碎片化热梗到去中心化共同体',
          en: 'From Ephemeral Tweets to Persistent Archive',
        },
        detail: {
          zh: '散落在时间线算法中的高赞洞见极易在数周后淹没；将全文、溯源、译本、批注与社区续写留存在独立学刊（Big-Blog）上，方能开启真正的持续社区迭代。',
          en: 'Algorithmic timelines bury insights within days; archiving full texts, bilingual translations, formal axioms, and community extensions on Big-Blog converts fleeting tweets into a cumulative canon.',
        },
      },
    ],
    lineageAndContext: {
      zh: '由 Xuan (Billy) Zhang (@xzhang_billy) 于 2026 年 11 月 15 日整理发布，短时间内突破 11 万阅读、526 赞与 614 收藏，直接催生了「Big-Theory / Big-Blog（大理论合订本）」开源档案馆计划。',
      en: 'Compiled and published on November 15, 2026 by Xuan (Billy) Zhang (@xzhang_billy), surpassing 110k views, 526 likes, and 614 bookmarks—directly inspiring the creation of the Big-Theory / Big-Blog open archive.',
    },
    peerReviewNote: {
      zh: '审稿委员会按：公元前四世纪稷下学宫百家争鸣，诞生了儒墨道法；公元 2026 年算力内卷时代简中推友百家争鸣，诞生了 Bench、实习、大粉、日结、斜率与 HR 六大家。历史总是押着荒诞却精准的韵脚。',
      en: 'Editorial Note: Just as the Jixia Academy birthed warring philosophical schools in antiquity, the compute-constrained crucible of 2026 birthed the Six Doctoral Schools of Sinophone X.',
    },
    tags: {
      zh: ['总纲', '百家争鸣', '六大学派', '开刊导言'],
      en: ['Prolegomena', 'Six Schools', 'Synthesis', 'Taxonomy'],
    },
    source: {
      platform: 'X',
      tweetId: '2121879505170210981',
      url: 'https://x.com/xzhang_billy/status/2121879505170210981',
      publishedAt: '2026-11-15T08:14:31Z',
      publishedDateDisplay: '2026-11-15',
      verifiedMinLikes20: true,
    },
    author: {
      name: 'Xuan (Billy) Zhang',
      handle: 'xzhang_billy',
      profileUrl: 'https://x.com/xzhang_billy',
      affiliation: {
        zh: '新加坡国立大学 (NUS) 博士生 · Big-Theory 编纂发起人',
        en: 'PhD Researcher @ National University of Singapore (NUS)',
      },
      location: 'Singapore',
      website: 'https://xuanzhang.io',
      avatarUrl: 'https://pbs.twimg.com/profile_images/2102328956859142144/u7hTrfLy_200x200.jpg',
      followers: 659,
    },
    metrics: {
      likes: 526,
      bookmarks: 614,
      views: 110194,
      retweets: 82,
      replies: 26,
      quotes: 29,
    },
    coordinates: {
      pragmatism: 55,
      shortDuration: 30,
    },
    citationKey: 'zhang2026prolegomena',
  },
];

export function formatBibTeX(theory: TheoryEntry, siteOrigin = 'https://big-theory.github.io/Big-Blog'): string {
  const year = theory.source.publishedDateDisplay.slice(0, 4) || '2026';
  return `@article{${theory.citationKey},
  title     = {${theory.title.zh} (${theory.title.en}): ${theory.subtitle.en}},
  author    = {${theory.author.name} (@${theory.author.handle})},
  journal   = {Big Theory Blog (大理论合订本 · Big-Blog)},
  year      = {${year}},
  month     = {${theory.source.publishedDateDisplay.slice(5, 7) || '11'}},
  note      = {Engagement observed on X (${theory.metrics.likes} likes, ${theory.metrics.views.toLocaleString()} views). Archived full text at ${siteOrigin}/#/theory/${theory.slug}},
  url       = {${theory.source.url}}
}`;
}

export function formatGBT7714(theory: TheoryEntry, siteOrigin = 'https://big-theory.github.io/Big-Blog'): string {
  return `${theory.author.name} (@${theory.author.handle}). ${theory.title.zh} / ${theory.title.en}[EB/OL]. 大理论合订本 (Big-Blog), ${theory.source.publishedDateDisplay}. ${siteOrigin}/#/theory/${theory.slug} (原帖出处: ${theory.source.url}).`;
}
