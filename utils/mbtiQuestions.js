/**
 * MBTI 性格测试题库（28题）
 * 完全独立于 SBTI
 * 
 * MBTI 聚焦：认知偏好（如何获取信息、做决定、生活结构偏好）
 * EI 维度强调“注意力与能量指向”（思考、创意、工作方式），而非单纯社交能量
 */

const mbtiQuestions = [
  // EI 维度（外向 / 内向）- 7 题（聚焦注意力与能量指向）
  {
    id: 1,
    text: '当你需要集中思考一个复杂问题时，你更喜欢：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 和别人一起讨论，边聊边理清思路', score: 5 },
      { id: 'B', text: 'B. 自己独处，安静地深入思考', score: -5 }
    ]
  },
  {
    id: 2,
    text: '在学习新知识时，你更倾向于：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 参加讲座、工作坊或小组学习', score: 4 },
      { id: 'B', text: 'B. 自己阅读、研究或观看教学视频', score: -4 }
    ]
  },
  {
    id: 3,
    text: '你更喜欢的工作方式是：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 开放式办公室，能随时和同事交流想法', score: 5 },
      { id: 'B', text: 'B. 独立空间，能专注完成自己的任务', score: -5 }
    ]
  },
  {
    id: 4,
    text: '当你有新点子或感受时，你通常会：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 立刻和别人分享，获得反馈', score: 4 },
      { id: 'B', text: 'B. 先在心里反复琢磨，成熟后再说', score: -4 }
    ]
  },
  {
    id: 5,
    text: '你更喜欢通过什么方式了解世界：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 实际参与、亲身经历和与人互动', score: 5 },
      { id: 'B', text: 'B. 阅读、思考、观察和内省', score: -5 }
    ]
  },
  {
    id: 6,
    text: '在团队项目中，你更常扮演的角色是：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 活跃的发起者和协调者', score: 4 },
      { id: 'B', text: 'B. 深入思考和提供专业意见的贡献者', score: -4 }
    ]
  },
  {
    id: 7,
    text: '你更喜欢的生活节奏是：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 充满刺激和外部活动', score: 3 },
      { id: 'B', text: 'B. 安静、有规律的个人节奏', score: -3 }
    ]
  },

  // SN 维度（实感 / 直觉）- 7 题（信息获取方式）
  {
    id: 8,
    text: '你更相信哪种信息：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 具体的事实、数据和亲身经验', score: 5 },
      { id: 'B', text: 'B. 直觉、可能性和潜在含义', score: -5 }
    ]
  },
  {
    id: 9,
    text: '当你描述一件事物时，你更倾向于：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 描述它的外观、功能和具体细节', score: 4 },
      { id: 'B', text: 'B. 描述它给你的感觉、象征意义或可能性', score: -4 }
    ]
  },
  {
    id: 10,
    text: '你更喜欢哪种类型的书或内容：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 实用指南、传记或真实故事', score: 5 },
      { id: 'B', text: 'B. 科幻、哲学或充满想象力的作品', score: -5 }
    ]
  },
  {
    id: 11,
    text: '解决问题时，你更常使用：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 经过验证的方法和步骤', score: 4 },
      { id: 'B', text: 'B. 创新的思路和跳跃性联想', score: -4 }
    ]
  },
  {
    id: 12,
    text: '你对未来的看法更接近：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 基于当前事实的合理预测', score: 5 },
      { id: 'B', text: 'B. 充满各种可能性和愿景', score: -5 }
    ]
  },
  {
    id: 13,
    text: '在谈话中，你更关注：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 具体的事实和实际内容', score: 4 },
      { id: 'B', text: 'B. 背后的模式、意义和隐含信息', score: -4 }
    ]
  },
  {
    id: 14,
    text: '你更喜欢哪种学习方式：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 一步步掌握具体技能和知识', score: 3 },
      { id: 'B', text: 'B. 快速把握整体概念和原理', score: -3 }
    ]
  },

  // TF 维度（思考 / 情感）- 7 题（决策方式）
  {
    id: 15,
    text: '做决定时，你更看重：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 客观事实、逻辑和效率', score: 5 },
      { id: 'B', text: 'B. 个人价值观、人际和谐和感受', score: -5 }
    ]
  },
  {
    id: 16,
    text: '当你需要给出反馈时，你更倾向于：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 直接指出问题和改进方向', score: 4 },
      { id: 'B', text: 'B. 先肯定优点，再委婉提出建议', score: -4 }
    ]
  },
  {
    id: 17,
    text: '你更欣赏哪种领导风格：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 公正、理性、注重结果', score: 5 },
      { id: 'B', text: 'B. 关怀、激励、注重团队氛围', score: -5 }
    ]
  },
  {
    id: 18,
    text: '面对冲突时，你通常会：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 分析原因，寻找最合理的解决方案', score: 4 },
      { id: 'B', text: 'B. 优先考虑各方感受，寻求双方都能接受的结果', score: -4 }
    ]
  },
  {
    id: 19,
    text: '你认为“正确”的决定更应该是：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 基于逻辑和客观标准', score: 5 },
      { id: 'B', text: 'B. 符合个人价值观和内心感受', score: -5 }
    ]
  },
  {
    id: 20,
    text: '在帮助别人时，你更常提供：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 实用建议和解决方案', score: 4 },
      { id: 'B', text: 'B. 情感支持和共情理解', score: -4 }
    ]
  },
  {
    id: 21,
    text: '你更容易被什么打动：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 严谨的逻辑和有力的论证', score: 3 },
      { id: 'B', text: 'B. 真诚的情感和人文关怀', score: -3 }
    ]
  },

  // JP 维度（判断 / 感知）- 7 题（生活结构偏好）
  {
    id: 22,
    text: '你更喜欢哪种日程安排方式：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 提前计划好每天的行程和任务', score: 5 },
      { id: 'B', text: 'B. 保持灵活，根据当时的心情和情况调整', score: -5 }
    ]
  },
  {
    id: 23,
    text: '完成任务时，你更常见的模式是：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 提前规划，按部就班逐步完成', score: 4 },
      { id: 'B', text: 'B. 在截止日期前集中精力赶工完成', score: -4 }
    ]
  },
  {
    id: 24,
    text: '你的生活状态更接近：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 有序、可控、井井有条', score: 5 },
      { id: 'B', text: 'B. 灵活、自发、充满变化', score: -5 }
    ]
  },
  {
    id: 25,
    text: '做决定时，你更倾向于：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 尽快做出决定并坚持执行', score: 4 },
      { id: 'B', text: 'B. 保持开放，收集更多信息后再决定', score: -4 }
    ]
  },
  {
    id: 26,
    text: '你更喜欢哪种旅行方式：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 提前做好详细的行程规划', score: 5 },
      { id: 'B', text: 'B. 随遇而安，临时决定去哪里', score: -5 }
    ]
  },
  {
    id: 27,
    text: '你对规则和框架的态度是：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 喜欢明确的规则和结构，能带来安全感', score: 3 },
      { id: 'B', text: 'B. 更喜欢根据实际情况灵活变通', score: -3 }
    ]
  },
  {
    id: 28,
    text: '你的工作或生活空间通常是：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 整洁有序，每样东西都有固定位置', score: 4 },
      { id: 'B', text: 'B. 创意满满，东西随手可得，比较随意', score: -4 }
    ]
  }
]

module.exports = { mbtiQuestions }
