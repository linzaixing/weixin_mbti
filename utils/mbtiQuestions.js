/**
 * MBTI 性格测试题库（28题）
 * 完全独立于 SBTI
 * 
 * MBTI 聚焦：认知偏好（如何获取信息、做决定、生活结构偏好）
 * EI 维度强调"注意力与能量指向"（思考、创意、工作方式），而非单纯社交能量
 */

const mbtiQuestions = [
  // EI 维度（外向 / 内向）- 7 题（聚焦注意力与能量指向）
  {
    id: 1,
    text: '周五晚上，朋友突然拉群说"走，去KTV"，你的第一反应是：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 马上换衣服出门，人多才好玩', score: 5 },
      { id: 'B', text: 'B. 找个借口婉拒，窝沙发上追剧更香', score: -5 }
    ]
  },
  {
    id: 2,
    text: '你独自旅行到一个陌生城市，在青旅遇到一群背包客在聊天：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 主动坐过去加入，旅途中认识新朋友是最大乐趣', score: 4 },
      { id: 'B', text: 'B. 戴上耳机去角落坐着，享受一个人的自由', score: -4 }
    ]
  },
  {
    id: 3,
    text: '参加了一场3小时的大型聚会后，你通常的状态是：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 兴奋得睡不着，脑子里还在回味刚才的对话', score: 5 },
      { id: 'B', text: 'B. 像被抽干了电一样累，需要独处好几天才能恢复', score: -5 }
    ]
  },
  {
    id: 4,
    text: '脑子里突然冒出一个很酷的想法，你会：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 立刻打电话/发消息给朋友："我跟你说个事！"', score: 4 },
      { id: 'B', text: 'B. 打开备忘录默默记下来，自己想明白再说', score: -4 }
    ]
  },
  {
    id: 5,
    text: '理想的周末是这样度过的：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 约人逛街、吃饭、打球——排满社交活动才叫充实', score: 5 },
      { id: 'B', text: 'B. 睡到自然醒，看书、打游戏、做饭——一个人的自由时光', score: -5 }
    ]
  },
  {
    id: 6,
    text: '你更喜欢哪种解决问题的方式：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 拉几个人头脑风暴，在讨论中碰撞出答案', score: 4 },
      { id: 'B', text: 'B. 一个人关上门，泡杯茶慢慢想透再开口', score: -4 }
    ]
  },
  {
    id: 7,
    text: '如果手机坏了三天联系不上任何人，你会：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 焦虑到不行，感觉和世界断了连接', score: 3 },
      { id: 'B', text: 'B. 居然有点爽？终于没人打扰了', score: -3 }
    ]
  },

  // SN 维度（实感 / 直觉）- 7 题（信息获取方式）
  {
    id: 8,
    text: '朋友送你一个礼物盒子，你打开后第一个念头是：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 看看是什么牌子、什么材质、值多少钱', score: 5 },
      { id: 'B', text: 'B. 想ta为什么挑这个——是不是有什么深意', score: -5 }
    ]
  },
  {
    id: 9,
    text: '看完一部电影，和朋友讨论时你更关注：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 剧情逻辑通不通、演员演技如何、特效哪里穿帮', score: 4 },
      { id: 'B', text: 'B. 导演想表达什么、隐喻是什么、和现实的联系', score: -4 }
    ]
  },
  {
    id: 10,
    text: '你在做菜，看到食谱写"适量盐"：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 烦躁——到底是几克？给我个精确数字', score: 5 },
      { id: 'B', text: 'B. 无所谓，凭感觉来就行，做菜本来就是创作', score: -5 }
    ]
  },
  {
    id: 11,
    text: '老板说"这个季度业绩需要有突破"，你脑子里首先浮现的是：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 具体数字——现在多少、目标多少、差距多少', score: 4 },
      { id: 'B', text: 'B. 新方向——有没有全新的玩法可以颠覆现状', score: -4 }
    ]
  },
  {
    id: 12,
    text: '逛博物馆时，你会：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 仔细看每个展品的年代、材质、出土地点等信息牌', score: 5 },
      { id: 'B', text: 'B. 更喜欢想象这些东西背后的故事和那个时代的生活', score: -5 }
    ]
  },
  {
    id: 13,
    text: '描述你家附近的一条路，你会怎么说：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. "出门右转200米有个红绿灯，对面是便利店"', score: 4 },
      { id: 'B', text: 'B. "一条很有感觉的路，梧桐树特多，秋天像走在画里"', score: -4 }
    ]
  },
  {
    id: 14,
    text: '学新东西时，你更习惯：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 先看说明书/教程，按步骤一步步来', score: 3 },
      { id: 'B', text: 'B. 直接上手摸索，在折腾中搞懂原理', score: -3 }
    ]
  },

  // TF 维度（思考 / 情感）- 7 题（决策方式）
  {
    id: 15,
    text: '好朋友创业拉你入伙，但你分析后觉得项目不靠谱：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 直接把分析结果给ta看，事实就是事实', score: 5 },
      { id: 'B', text: 'B. 不忍心打击ta的热情，找个委婉的方式表达', score: -5 }
    ]
  },
  {
    id: 16,
    text: '同事写了一份报告，内容有明显问题，领导让你提意见：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 开门见山指出问题："第三页数据有误，逻辑不通"', score: 4 },
      { id: 'B', text: 'B. "整体思路不错，这几个地方如果调整一下会更好"', score: -4 }
    ]
  },
  {
    id: 17,
    text: '两个朋友吵架了都来找你评理，你会：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 客观分析谁对谁错，有道理就是有道理', score: 5 },
      { id: 'B', text: 'B. 两边都安抚一下感受，道理没有关系重要', score: -5 }
    ]
  },
  {
    id: 18,
    text: '公司裁员，你是决策者，必须在两人中选一个留下：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 看业绩数据说话，谁产出高留谁', score: 4 },
      { id: 'B', text: 'B. 会考虑谁家庭负担更重、谁更需要这份工作', score: -4 }
    ]
  },
  {
    id: 19,
    text: '网上看到一则悲惨新闻，下面有人理性分析原因：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 觉得分析得很好，找到原因才能解决问题', score: 5 },
      { id: 'B', text: 'B. 觉得这时候分析太冷血了，应该先表达同情', score: -5 }
    ]
  },
  {
    id: 20,
    text: '闺蜜/兄弟失恋了来找你哭，你的本能反应是：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 帮ta分析这段关系的问题，下次该找什么样的', score: 4 },
      { id: 'B', text: 'B. 什么都不说先抱抱，陪ta吃顿好的', score: -4 }
    ]
  },
  {
    id: 21,
    text: '选择一份工作时，让你最终做出决定的因素是：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 薪资、发展前景、行业趋势等客观数据', score: 3 },
      { id: 'B', text: 'B. 团队氛围、是否喜欢这份工作、内心的直觉', score: -3 }
    ]
  },

  // JP 维度（判断 / 感知）- 7 题（生活结构偏好）
  {
    id: 22,
    text: '明天要出门旅行，今晚你会：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 列好清单、收好行李、查好路线，闹钟定三个', score: 5 },
      { id: 'B', text: 'B. 到时候再说呗，带上手机钱包就够了', score: -5 }
    ]
  },
  {
    id: 23,
    text: '论文/报告的deadline在两周后：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 第一周就开始做，留出修改时间，提前两天完成', score: 4 },
      { id: 'B', text: 'B. 前13天酝酿灵感，最后一天一气呵成——是的每次都这样', score: -4 }
    ]
  },
  {
    id: 24,
    text: '朋友问你"下周三晚上有空吗"：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 打开日历看——有空/没空，给你一个明确答复', score: 5 },
      { id: 'B', text: 'B. "到时候看吧，现在说不准"', score: -5 }
    ]
  },
  {
    id: 25,
    text: '逛街买东西，你属于哪种：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 出门前就想好买什么，直奔目标，买完就走', score: 4 },
      { id: 'B', text: 'B. 随便逛逛看到什么好的再说，计划赶不上变化', score: -4 }
    ]
  },
  {
    id: 26,
    text: '你的手机相册/桌面/房间通常是：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 分类清晰，文件夹都有命名，东西各归其位', score: 5 },
      { id: 'B', text: 'B. 一团混乱但我找得到——我有自己的"系统"', score: -5 }
    ]
  },
  {
    id: 27,
    text: '计划好的周末安排临时有变（朋友爽约了），你会：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 有点不爽，赶紧安排一个替代方案', score: 3 },
      { id: 'B', text: 'B. 无所谓，随机应变也挺好的', score: -3 }
    ]
  },
  {
    id: 28,
    text: '打游戏时你更喜欢：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 先查攻略、研究最优路线，不走弯路', score: 4 },
      { id: 'B', text: 'B. 盲玩探索，被剧情惊喜到才是乐趣所在', score: -4 }
    ]
  },

  // ========== 验证题（每维度 2 道，高权重锚定）==========

  // EI 验证题
  {
    id: 29,
    text: '连续加了一周班，终于放假了，你恢复精力的方式是：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 约一帮朋友出去嗨，人越多我越来劲', score: 6 },
      { id: 'B', text: 'B. 谁也别找我，让我一个人待三天', score: -6 }
    ]
  },
  {
    id: 30,
    text: '想象一下：你中了彩票可以环游世界，你会选择：',
    dimension: 'EI',
    options: [
      { id: 'A', text: 'A. 和一群好友组团出发，热热闹闹的才有意思', score: 6 },
      { id: 'B', text: 'B. 一个人背包走天涯，按自己的节奏和心情来', score: -6 }
    ]
  },

  // SN 验证题
  {
    id: 31,
    text: '朋友跟你说"我昨天做了一个很奇怪的梦"，你的反应是：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. "梦就是大脑随机放电，别想太多"', score: 6 },
      { id: 'B', text: 'B. "说说看！我觉得梦可能在暗示什么"', score: -6 }
    ]
  },
  {
    id: 32,
    text: '如果你要装修新房，你更在意的是：',
    dimension: 'SN',
    options: [
      { id: 'A', text: 'A. 收纳空间够不够、动线合不合理、材料耐不耐用', score: 6 },
      { id: 'B', text: 'B. 整体氛围对不对、有没有独特的设计感和意境', score: -6 }
    ]
  },

  // TF 验证题（重点加强，排除社会期望干扰）
  {
    id: 33,
    text: '你发现一个你很喜欢的餐厅卫生不达标，会怎么做：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 举报——食品安全是底线，不能因为喜欢就纵容', score: 6 },
      { id: 'B', text: 'B. 不忍心——老板人很好也不容易，私下提醒一下就算了', score: -6 }
    ]
  },
  {
    id: 34,
    text: '评价一部电影或一本书，你给高分的理由通常是：',
    dimension: 'TF',
    options: [
      { id: 'A', text: 'A. 结构精巧、逻辑自洽、论证有力——即使我不喜欢主题', score: 6 },
      { id: 'B', text: 'B. 让我产生强烈共鸣、感动落泪——即使结构有瑕疵', score: -6 }
    ]
  },

  // JP 验证题
  {
    id: 35,
    text: '和朋友约了下周出去玩，你的状态是：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 当天就开始查攻略订餐厅，细化到几点干什么', score: 6 },
      { id: 'B', text: 'B. 到那天再说呗，随缘才好玩', score: -6 }
    ]
  },
  {
    id: 36,
    text: '你的衣柜状态更接近：',
    dimension: 'JP',
    options: [
      { id: 'A', text: 'A. 按季节/颜色/场合分类，拿什么一目了然', score: 6 },
      { id: 'B', text: 'B. "创意叠放"——从那堆里凭感觉翻出今天想穿的', score: -6 }
    ]
  }
]

module.exports = { mbtiQuestions }
