/**
 * SBTI 抽象人格测试题库（31题）
 * 参考风云智测 SBTI 框架：15维度 / 5大模型 / 趣味化结果
 *
 * 5 大模型（每题归属一个模型，得分正负代表两端倾向）：
 *  - SLF (Self 自我模型)     ： + 自洽稳定 / - 摇摆怀疑
 *  - EMO (Emotion 情感模型)  ： + 安全自洽 / - 焦虑黏着
 *  - ATT (Attitude 态度模型) ： + 守序谨慎 / - 冲动随性
 *  - ACT (Action 行动模型)   ： + 进攻果断 / - 规避拖延
 *  - SOC (Social 社交模型)   ： + 主动开放 / - 边界封闭
 */

const sbtiQuestions = [
  // ========== 自我模型 SLF（6题）==========
  {
    id: 201,
    text: '当别人批评你时，你最常的反应是：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 听完后理性判断对错，不轻易动摇', score: 5 },
      { id: 'B', text: 'B. 心里很受伤，反复琢磨自己是不是真的不好', score: -5 }
    ]
  },
  {
    id: 202,
    text: '发了一条朋友圈半小时了只有2个赞，你会：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 无所谓，我发是因为我想发', score: 4 },
      { id: 'B', text: 'B. 开始焦虑——是不是不好看？要不要删掉？', score: -4 }
    ]
  },
  {
    id: 203,
    text: '面对一个完全不认识的新场合，你的内心独白是：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. "我就是我，做自己就行"', score: 4 },
      { id: 'B', text: 'B. "他们会怎么看我？我会不会出丑？"', score: -4 }
    ]
  },
  {
    id: 204,
    text: '你心里有没有"无论如何不会让步"的核心信念？',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 有，非常清楚，那是我的底线', score: 5 },
      { id: 'B', text: 'B. 不太清楚，常常被别人的想法影响', score: -5 }
    ]
  },
  {
    id: 205,
    text: '同龄人晒升职加薪买房买车，你看到后：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 每个人节奏不同，我对自己的路很清楚', score: 3 },
      { id: 'B', text: 'B. 焦虑上头——我是不是比别人差太多了', score: -3 }
    ]
  },
  {
    id: 206,
    text: '一个人待着什么都不做的时候，你脑子里通常在：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 放空或想些有趣的事，挺享受的', score: 4 },
      { id: 'B', text: 'B. 自动开始复盘最近说错的话做错的事', score: -4 }
    ]
  },

  // ========== 情感模型 EMO（6题）==========
  {
    id: 207,
    text: '在亲密关系里，对方很久没回消息时你会：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 默认ta在忙，等就好了', score: 5 },
      { id: 'B', text: 'B. 各种胡思乱想，是不是不爱我了', score: -5 }
    ]
  },
  {
    id: 208,
    text: '关于"独立空间"，你的需求是：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 必须要有，天天黏在一起我会窒息', score: 4 },
      { id: 'B', text: 'B. 越粘越好，希望24小时都在一起', score: -4 }
    ]
  },
  {
    id: 209,
    text: '面对感情中的不确定，你倾向于：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 先稳住自己，关系自然会找到答案', score: 4 },
      { id: 'B', text: 'B. 反复确认对方是否爱我，心一直悬着', score: -4 }
    ]
  },
  {
    id: 210,
    text: '当朋友突然冷淡，你的第一反应是：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 大概ta最近状态不好，给点空间', score: 5 },
      { id: 'B', text: 'B. 立刻开始反思自己是不是哪里做错了', score: -5 }
    ]
  },
  {
    id: 211,
    text: '分手后/友谊结束后，你恢复的方式是：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 难过一阵但能自我修复，生活很快回到正轨', score: 4 },
      { id: 'B', text: 'B. 很长时间都走不出来，反复回想哪里出了问题', score: -4 }
    ]
  },
  {
    id: 212,
    text: '深夜emo时你最常做的事是：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 告诉自己"睡一觉就好了"，然后真的睡了', score: 3 },
      { id: 'B', text: 'B. 翻聊天记录、循环伤感歌、内耗到天亮', score: -3 }
    ]
  },

  // ========== 态度模型 ATT（6题）==========
  {
    id: 213,
    text: '点外卖时你通常是：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 固定几家店轮着来，踩雷概率为零', score: 5 },
      { id: 'B', text: 'B. 专挑没吃过的新店，万一发现宝藏呢', score: -5 }
    ]
  },
  {
    id: 214,
    text: '朋友突然说"走，现在去另一个城市看演唱会"：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 等等，让我查一下路线、住宿、明天的安排...', score: 5 },
      { id: 'B', text: 'B. 走走走！买票上车再说！', score: -5 }
    ]
  },
  {
    id: 215,
    text: '打游戏选难度，你一般选：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 普通模式，稳稳通关才有成就感', score: 4 },
      { id: 'B', text: 'B. 直接地狱难度，不刺激玩什么', score: -4 }
    ]
  },
  {
    id: 216,
    text: '存钱这件事，你更接近哪种：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 每月固定存一笔，有计划有节制', score: 4 },
      { id: 'B', text: 'B. 想买就买，人生苦短开心最重要', score: -4 }
    ]
  },
  {
    id: 217,
    text: '对"红线"的态度更接近：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 我会清晰地划出底线，不轻易越过', score: 4 },
      { id: 'B', text: 'B. 很多事情没有绝对对错，灵活点比较好', score: -4 }
    ]
  },
  {
    id: 218,
    text: '如果人生是一场公路旅行，你更想要：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 一份靠谱的地图和详细的路线规划', score: 3 },
      { id: 'B', text: 'B. 一辆加满油的车和一颗随时转弯的心', score: -3 }
    ]
  },

  // ========== 行动模型 ACT（6题）==========
  {
    id: 219,
    text: '闹钟响了，今天有个重要但不紧急的事要办：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 直接起来做掉，拖着更累', score: 5 },
      { id: 'B', text: 'B. 再躺五分钟...十分钟...算了明天吧', score: -5 }
    ]
  },
  {
    id: 220,
    text: '餐厅菜单有100道菜，你点菜的方式是：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 扫一眼30秒做决定，吃啥不是吃', score: 4 },
      { id: 'B', text: 'B. 翻来翻去纠结十分钟，最后让别人帮我选', score: -4 }
    ]
  },
  {
    id: 221,
    text: '快递显示"派送异常"，你的反应是：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 立刻打电话问客服怎么回事', score: 5 },
      { id: 'B', text: 'B. 先等等吧，说不定过两天就正常了', score: -5 }
    ]
  },
  {
    id: 222,
    text: '年初立的flag（健身/读书/学技能），到现在：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 在按计划执行中，虽然偶尔断但能接上', score: 4 },
      { id: 'B', text: 'B. 你为什么要提醒我这件事...', score: -4 }
    ]
  },
  {
    id: 223,
    text: '发现租房合同里有个不合理条款：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 当场指出，要求修改再签', score: 4 },
      { id: 'B', text: 'B. 算了应该不会真执行吧，别为这点事闹不愉快', score: -4 }
    ]
  },
  {
    id: 224,
    text: '想学一个新技能（吉他/画画/编程），你通常是：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 当天就下单买装备/报课，趁热打铁', score: 3 },
      { id: 'B', text: 'B. 先收藏一堆教程，然后...就没有然后了', score: -3 }
    ]
  },

  // ========== 社交模型 SOC（7题）==========
  {
    id: 225,
    text: '电梯里只有你和一个不认识的邻居，你会：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 微笑打个招呼，聊两句天气或快递', score: 5 },
      { id: 'B', text: 'B. 掏出手机假装看消息，祈祷赶紧到楼层', score: -5 }
    ]
  },
  {
    id: 226,
    text: '微信好友数量，你的态度是：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 多多益善，说不定什么时候就用上了', score: 4 },
      { id: 'B', text: 'B. 定期清理，不熟的人留着干嘛', score: -4 }
    ]
  },
  {
    id: 227,
    text: '有人在社交场合想深入了解你的私事：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 愿意分享，敞开心扉拉近关系', score: 5 },
      { id: 'B', text: 'B. 礼貌地岔开话题，不是所有人都需要了解我', score: -5 }
    ]
  },
  {
    id: 228,
    text: '群聊里你通常是：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 活跃发言，表情包担当，没我就冷场', score: 4 },
      { id: 'B', text: 'B. 安静潜水，有人@我才冒个泡', score: -4 }
    ]
  },
  {
    id: 229,
    text: '刚到一个新公司/学校，第一周你会：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 主动和周围人自我介绍，请大家喝奶茶', score: 4 },
      { id: 'B', text: 'B. 安静观察，等别人来找我说话', score: -4 }
    ]
  },
  {
    id: 230,
    text: '关于朋友的数量，你觉得：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 朋友遍天下才有意思，我的生日趴能来三桌人', score: 4 },
      { id: 'B', text: 'B. 三五知己足矣，多了我维护不过来', score: -4 }
    ]
  },
  {
    id: 231,
    text: '有人约你参加一个你只认识一两个人的饭局：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 好呀！认识新朋友的好机会', score: 3 },
      { id: 'B', text: 'B. 那种场合我会全程尬聊，不去了', score: -3 }
    ]
  },

  // ========== 验证题（每模型 1 道，高权重锚定）==========

  // SLF 验证题
  {
    id: 232,
    text: '你做了一个重大决定后，周围人都说你选错了：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 我想清楚了才决定的，别人不了解我的情况', score: 6 },
      { id: 'B', text: 'B. 开始严重动摇——这么多人反对，是不是我真的错了', score: -6 }
    ]
  },

  // EMO 验证题
  {
    id: 233,
    text: '最好的朋友突然和别人走得很近，你的真实感受：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 挺好的呀，朋友多了路好走，我们的关系不会变', score: 6 },
      { id: 'B', text: 'B. 说不出的失落，是不是我不够好所以ta需要新朋友', score: -6 }
    ]
  },

  // ATT 验证题
  {
    id: 234,
    text: '导航显示前方堵车，但你知道有条小路可能更快也可能迷路：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 跟着导航走大路，堵就堵吧至少确定能到', score: 6 },
      { id: 'B', text: 'B. 冲小路！迷路了也是一种冒险体验', score: -6 }
    ]
  },

  // ACT 验证题
  {
    id: 235,
    text: '你在网上看到一个限时24小时的绝佳机会（课程/旅行/演出）：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 立刻下单，想太多就错过了', score: 6 },
      { id: 'B', text: 'B. 这么急迫肯定有套路...算了等下一次吧', score: -6 }
    ]
  },

  // SOC 验证题
  {
    id: 236,
    text: '搬到新城市一个月了，你交到朋友的方式是：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 加了一堆群、参加了各种活动，已经有好几个饭搭子了', score: 6 },
      { id: 'B', text: 'B. 还是只有同事打招呼，下班回家关上门，这样也挺好', score: -6 }
    ]
  }
]

module.exports = { sbtiQuestions }
