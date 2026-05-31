/**
 * NMTI 职场牛马测试题库（28题）
 *
 * 4 大维度（每维度 7 题）：
 *  - MJ: 摸鱼(M) vs 内卷(J) — 工作强度偏好
 *  - DH: 独狼(D) vs 合群(H) — 职场协作方式
 *  - RG: 忍者(R) vs 刚哥(G) — 冲突处理风格
 *  - WP: 稳坐(W) vs 跑路(P) — 职业流动倾向
 *
 * score > 0 → 维度前字母 (M / D / R / W)
 * score < 0 → 维度后字母 (J / H / G / P)
 */

const nmtiQuestions = [
  // ========== MJ 维度：摸鱼 vs 内卷（7题）==========
  {
    id: 301,
    text: '同事都在加班，只有你完成了工作，你会：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 准时下班，生活是自己的', score: 5 },
      { id: 'B', text: 'B. 留下来继续学习或帮忙，不能落后', score: -5 }
    ]
  },
  {
    id: 302,
    text: '领导发了一个"自愿参加"的培训通知，你：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 自愿 = 不去，开心做自己的事', score: 4 },
      { id: 'B', text: 'B. 自愿也要去，多学点总没错', score: -4 }
    ]
  },
  {
    id: 303,
    text: '工作群周末发消息，你的反应是：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 看到了也假装没看到，周一再说', score: 5 },
      { id: 'B', text: 'B. 立刻回复，展示责任心', score: -5 }
    ]
  },
  {
    id: 304,
    text: '手头任务提前做完了，你会：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 假装还在忙，偷偷刷手机', score: 4 },
      { id: 'B', text: 'B. 主动找领导要新任务', score: -4 }
    ]
  },
  {
    id: 305,
    text: '你对"996"的态度是：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 违法的，ICU 的前奏', score: 5 },
      { id: 'B', text: 'B. 虽然辛苦但能快速成长', score: -5 }
    ]
  },
  {
    id: 306,
    text: '年终总结，你会：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 复制去年的改改日期和数字，最多花20分钟', score: 4 },
      { id: 'B', text: 'B. 加班做PPT加动画，这是全年唯一一次表现机会', score: -4 }
    ]
  },
  {
    id: 307,
    text: '面对一个可做可不做的额外项目：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 能不做就不做，做多错多', score: 3 },
      { id: 'B', text: 'B. 抢着做，这是展示能力的机会', score: -3 }
    ]
  },

  // ========== DH 维度：独狼 vs 合群（7题）==========
  {
    id: 308,
    text: '午饭时间到了，你更喜欢：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 一个人安静地吃，享受独处', score: 5 },
      { id: 'B', text: 'B. 和同事们一起约饭聊天', score: -5 }
    ]
  },
  {
    id: 309,
    text: '遇到工作难题，你倾向于：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 自己死磕，搞定再说', score: 4 },
      { id: 'B', text: 'B. 先问问同事或拉个群讨论', score: -4 }
    ]
  },
  {
    id: 310,
    text: '通知下来：本周六全员团建，密室逃脱+聚餐：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 开始编周六要看牙/搬家/家里有事的借口', score: 5 },
      { id: 'B', text: 'B. 好耶！已经在想穿什么衣服去了', score: -5 }
    ]
  },
  {
    id: 311,
    text: '你理想的工位环境是：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 角落里的独立工位，最好有挡板', score: 4 },
      { id: 'B', text: 'B. 开放式办公，随时和同事互动', score: -4 }
    ]
  },
  {
    id: 312,
    text: '同事来找你闲聊，你的内心是：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. "别来烦我，我要独处"', score: 5 },
      { id: 'B', text: 'B. 开心聊，工作也需要社交润滑', score: -5 }
    ]
  },
  {
    id: 313,
    text: '开会时你更常见的状态是：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 默默听，有事打字或私聊说', score: 4 },
      { id: 'B', text: 'B. 积极发言，参与讨论', score: -4 }
    ]
  },
  {
    id: 314,
    text: '下班后同事约你出去玩：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 下班了就是自己的时间，不去', score: 3 },
      { id: 'B', text: 'B. 经常参加，同事关系很重要', score: -3 }
    ]
  },

  // ========== RG 维度：忍者 vs 刚哥（7题）==========
  {
    id: 315,
    text: '领导提了一个明显不合理的需求，你会：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 忍了，上面的指示先照做吧', score: 5 },
      { id: 'B', text: 'B. 当面指出不合理的地方', score: -5 }
    ]
  },
  {
    id: 316,
    text: '同事在大会上把你做的方案说成是他的，你：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 忍了，心里记着就行，何必当众撕破脸', score: 4 },
      { id: 'B', text: 'B. 当场补一句"这个方案我当时的思路是..."不动声色拿回来', score: -4 }
    ]
  },
  {
    id: 317,
    text: '被甩锅了，你的第一反应是：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 先背着吧，以后注意就行', score: 5 },
      { id: 'B', text: 'B. 当场拿出证据，锅不是我的', score: -5 }
    ]
  },
  {
    id: 318,
    text: '公司制度你觉得不公平：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 私下吐槽但不会公开说', score: 4 },
      { id: 'B', text: 'B. 在公开场合提出质疑', score: -4 }
    ]
  },
  {
    id: 319,
    text: '面对职场 PUA，你会：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 先忍着，等找到下家再说', score: 5 },
      { id: 'B', text: 'B. 直接怼回去，大不了走人', score: -5 }
    ]
  },
  {
    id: 320,
    text: '甲方在群里@你说"这个方案全部推翻重做"，你：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. "好的收到" 咬着牙默默打开文档', score: 4 },
      { id: 'B', text: 'B. "可以明确一下哪些点不满意吗？全部推翻不太现实"', score: -4 }
    ]
  },
  {
    id: 321,
    text: '开会时有人一直打断你发言：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 算了不说了，让他表演', score: 3 },
      { id: 'B', text: 'B. "请让我说完，谢谢"', score: -3 }
    ]
  },

  // ========== WP 维度：稳坐 vs 跑路（7题）==========
  {
    id: 322,
    text: '你对跳槽的态度是：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 稳定压倒一切，轻易不换', score: 5 },
      { id: 'B', text: 'B. 此处不留爷，自有留爷处', score: -5 }
    ]
  },
  {
    id: 323,
    text: '猎头打电话说"有个机会薪资翻倍"，你：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. "谢谢，我现在挺稳定的，不考虑了"', score: 4 },
      { id: 'B', text: 'B. "发个JD我看看？晚上聊细节"', score: -4 }
    ]
  },
  {
    id: 324,
    text: '公司降薪但不裁员，你：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 能接受，至少还有工作', score: 5 },
      { id: 'B', text: 'B. 立刻更新简历，准备跑路', score: -5 }
    ]
  },
  {
    id: 325,
    text: '你的简历更新频率：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 上次更新还是入职前', score: 4 },
      { id: 'B', text: 'B. 随时保持最新版本', score: -4 }
    ]
  },
  {
    id: 326,
    text: '你对"铁饭碗"的看法：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 太好了，稳定是福', score: 5 },
      { id: 'B', text: 'B. 太无聊了，人生需要折腾', score: -5 }
    ]
  },
  {
    id: 327,
    text: '前同事发朋友圈晒跳槽后涨薪50%，你的真实反应：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 点个赞继续干活，人家是人家我是我', score: 3 },
      { id: 'B', text: 'B. 默默打开招聘APP看看有没有合适的...', score: -3 }
    ]
  },
  {
    id: 328,
    text: '你的五年职业计划是：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 在当前公司稳步晋升', score: 4 },
      { id: 'B', text: 'B. 可能换两三份工作找到最合适的', score: -4 }
    ]
  },

  // ========== 验证题（每维度 1 道，高权重锚定）==========

  // MJ 验证题
  {
    id: 329,
    text: '周五下午4点，活干完了还有1小时才下班，监控也拍不到你屏幕：',
    dimension: 'MJ',
    options: [
      { id: 'A', text: 'A. 打开购物/短视频/小说——摸到最后一秒，准时打卡走人', score: 6 },
      { id: 'B', text: 'B. 提前预习下周的任务/学个新工具——闲着也是闲着', score: -6 }
    ]
  },

  // DH 验证题
  {
    id: 330,
    text: '公司新来了一批实习生，其中有个坐你旁边的总找你聊天：',
    dimension: 'DH',
    options: [
      { id: 'A', text: 'A. 暗示性地戴上耳机——拜托让我安静工作', score: 6 },
      { id: 'B', text: 'B. 挺开心的，带新人聊聊天工作也没那么无聊', score: -6 }
    ]
  },

  // RG 验证题
  {
    id: 331,
    text: '领导当着全组的面说你负责的模块"做得很一般"，但你觉得不公平：',
    dimension: 'RG',
    options: [
      { id: 'A', text: 'A. 当场不反驳，会后私下找领导单独谈', score: 6 },
      { id: 'B', text: 'B. 当场礼貌但坚定地说"我有不同看法，可以展开聊聊吗"', score: -6 }
    ]
  },

  // WP 验证题
  {
    id: 332,
    text: '入职3年了，工作内容已经完全熟练，没什么新挑战：',
    dimension: 'WP',
    options: [
      { id: 'A', text: 'A. 挺好的，熟练意味着轻松，稳定就是幸福', score: 6 },
      { id: 'B', text: 'B. 开始觉得无聊了，该是找新刺激的时候了', score: -6 }
    ]
  }
]

module.exports = { nmtiQuestions }
