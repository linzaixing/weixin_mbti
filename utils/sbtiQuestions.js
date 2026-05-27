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
    text: '你怎么看自己的优点？',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 心里很清楚我强在哪，不需要外界证明', score: 4 },
      { id: 'B', text: 'B. 总觉得自己只是运气好，不算什么', score: -4 }
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
    text: '当朋友夸你时，你的真实反应是：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 坦然接受，"嗯我确实不错"', score: 3 },
      { id: 'B', text: 'B. 谦虚否认，怀疑对方是客气', score: -3 }
    ]
  },
  {
    id: 206,
    text: '一个人独处的时候，你最常的状态是：',
    dimension: 'SLF',
    options: [
      { id: 'A', text: 'A. 自在放松，享受和自己待在一起', score: 4 },
      { id: 'B', text: 'B. 容易胡思乱想，自我怀疑', score: -4 }
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
      { id: 'A', text: 'A. 必须要有，黏TT的我会窒息', score: 4 },
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
    text: '感情里你更接近哪一种？',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 投入但保持自我，不会迷失', score: 4 },
      { id: 'B', text: 'B. 容易把全部生活都围着对方转', score: -4 }
    ]
  },
  {
    id: 212,
    text: '深夜emo时你最常做的事是：',
    dimension: 'EMO',
    options: [
      { id: 'A', text: 'A. 睡一觉就好了，明天又是新的一天', score: 3 },
      { id: 'B', text: 'B. 翻聊天记录、循环伤感歌、内耗到天亮', score: -3 }
    ]
  },

  // ========== 态度模型 ATT（6题）==========
  {
    id: 213,
    text: '面对规则，你的态度是：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 大部分都遵守，规则带来秩序', score: 5 },
      { id: 'B', text: 'B. 该破就破，规则是给"听话的人"准备的', score: -5 }
    ]
  },
  {
    id: 214,
    text: '当生活突然有大变化，你会：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 谨慎评估风险，做好计划再行动', score: 5 },
      { id: 'B', text: 'B. 直接干就完事，刺激就完了', score: -5 }
    ]
  },
  {
    id: 215,
    text: '你看待"人生意义"更接近：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 一步步把该做的事做好，意义自然生成', score: 4 },
      { id: 'B', text: 'B. 想做就做，意义这个东西想多了反而累', score: -4 }
    ]
  },
  {
    id: 216,
    text: '别人安利你"打破舒适区"，你的反应是：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 嗯听起来不错，但我先评估一下', score: 4 },
      { id: 'B', text: 'B. 安排，今晚就去做点疯狂的事', score: -4 }
    ]
  },
  {
    id: 217,
    text: '对"红线"的态度更接近：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 我会清晰地划出底线，不轻易越过', score: 4 },
      { id: 'B', text: 'B. 红线？那不就是用来跨的吗', score: -4 }
    ]
  },
  {
    id: 218,
    text: '你更欣赏哪一种生活态度：',
    dimension: 'ATT',
    options: [
      { id: 'A', text: 'A. 稳扎稳打、负重前行', score: 3 },
      { id: 'B', text: 'B. 人生苦短，及时行乐', score: -3 }
    ]
  },

  // ========== 行动模型 ACT（6题）==========
  {
    id: 219,
    text: '面对一个有 50% 成功率的机会，你通常会：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 直接上，机会都是抢出来的', score: 5 },
      { id: 'B', text: 'B. 等等看，再观察观察', score: -5 }
    ]
  },
  {
    id: 220,
    text: '做决定时你更接近：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 想清楚就立刻下结论，绝不拖泥带水', score: 4 },
      { id: 'B', text: 'B. 反复纠结，最后能拖就拖', score: -4 }
    ]
  },
  {
    id: 221,
    text: '冲突来临时，你最常做的事是：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 主动正面应对，把问题摆在台面上', score: 5 },
      { id: 'B', text: 'B. 能避就避，最好别让我面对', score: -5 }
    ]
  },
  {
    id: 222,
    text: '一个长期目标，你的执行风格更接近：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 列计划+按时执行，能落地', score: 4 },
      { id: 'B', text: 'B. 立志一阵子，三天打鱼两天晒网', score: -4 }
    ]
  },
  {
    id: 223,
    text: '面对突如其来的麻烦，你的本能反应是：',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 立刻分析、立刻处理', score: 4 },
      { id: 'B', text: 'B. 头大，先逃避一会儿再说', score: -4 }
    ]
  },
  {
    id: 224,
    text: '你更欣赏自己的哪一面？',
    dimension: 'ACT',
    options: [
      { id: 'A', text: 'A. 行动派，说干就干', score: 3 },
      { id: 'B', text: 'B. 谨慎派，不见兔子不撒鹰', score: -3 }
    ]
  },

  // ========== 社交模型 SOC（7题）==========
  {
    id: 225,
    text: '陌生场合你最常的状态是：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 主动出击，找人聊起来', score: 5 },
      { id: 'B', text: 'B. 安静观察，能不说话就不说话', score: -5 }
    ]
  },
  {
    id: 226,
    text: '关于"社交边界"，你的标准是：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 比较宽松，朋友越多越好', score: 4 },
      { id: 'B', text: 'B. 非常清晰，亲疏有别', score: -4 }
    ]
  },
  {
    id: 227,
    text: '在不同场合的"你"：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 大体一致，谁来都是这个我', score: 5 },
      { id: 'B', text: 'B. 完全分人，社交面具切换自如', score: -5 }
    ]
  },
  {
    id: 228,
    text: '群聊里你通常是：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 活跃发言，氛围担当', score: 4 },
      { id: 'B', text: 'B. 潜水观摩，必要时才冒泡', score: -4 }
    ]
  },
  {
    id: 229,
    text: '陌生人想加你微信/好友时：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 一般都加，多个朋友多条路', score: 4 },
      { id: 'B', text: 'B. 会想清楚是否必要，不轻易开放', score: -4 }
    ]
  },
  {
    id: 230,
    text: '你更喜欢哪一种关系：',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 广而活，认识各种各样的人', score: 4 },
      { id: 'B', text: 'B. 少而精，几个真心人就够了', score: -4 }
    ]
  },
  {
    id: 231,
    text: '在朋友面前你会展示真实的自己吗？',
    dimension: 'SOC',
    options: [
      { id: 'A', text: 'A. 会，我面前都是同一个我', score: 3 },
      { id: 'B', text: 'B. 看人，有的人面前我永远在表演', score: -3 }
    ]
  }
]

module.exports = { sbtiQuestions }
