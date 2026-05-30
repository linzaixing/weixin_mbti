const MBTI_IMG_BASE = 'https://laoguo-caiji.oss-cn-beijing.aliyuncs.com/ceping/static/81/img/16status'
const SBTI_IMG_BASE = 'https://laoguo-caiji.oss-cn-beijing.aliyuncs.com/ceping/sbti'

const MBTI_DESC = {
  INTJ: '独立远见的战略家，善于制定长远计划，追求效率与完美，内心有着清晰的蓝图和坚定信念。',
  INTP: '热爱思考的逻辑大师，对知识和真理有无穷好奇心，擅长发现事物本质规律，享受智力挑战。',
  ENTJ: '天生的领导者，果断高效，善于组织统筹全局，目标明确且执行力超强，不达目的不罢休。',
  ENTP: '充满创意的辩论家，思维敏捷，热爱探索各种可能性，善于挑战既有规则，点子层出不穷。',
  INFJ: '富有洞察力的理想主义者，内心温暖有远见，致力于帮助他人成长，追求深层人生意义。',
  INFP: '充满想象力的梦想家，内心世界丰富细腻，追求真诚与内在价值的和谐，感性而有深度。',
  ENFJ: '天生的引导者，富有感染力和同理心，善于激励他人，致力于帮助周围人发挥最大潜力。',
  ENFP: '充满热情的创意者，好奇心旺盛，善于发现生活中的无限可能，用热情感染身边每个人。',
  ISTJ: '可靠务实的执行者，做事一丝不苟，责任感极强，是规则和传统的坚定守护者。',
  ISFJ: '温暖可靠的守护者，默默付出，细心体贴，用实际行动为身边人提供踏实的安全感。',
  ESTJ: '高效果断的管理者，注重秩序和效率，天生的组织者，善于将计划变为现实。',
  ESFJ: '热心慷慨的照顾者，关注他人需求，善于营造和谐氛围，是团队中的社交粘合剂。',
  ISTP: '冷静务实的手艺人，擅长分析和解决实际问题，喜欢动手实践，灵活应变能力强。',
  ISFP: '安静敏感的艺术家，享受当下之美，用行动而非言语表达自己丰富而细腻的内心。',
  ESTP: '大胆果敢的冒险家，活在当下，行动力强，善于抓住机会，享受刺激和挑战。',
  ESFP: '热情洋溢的表演者，享受生活每一刻，天生社交达人，用快乐感染身边所有人。'
}

const SBTI_DESC = {
  CTRL: '稳定输出的"老大"原型——心里有底，情绪稳得住，行动狠得下，社交吃得开，一切尽在掌握。',
  HHHH: '随时在high的party主理人——不焦虑不守规则，行动力爆棚社交满分，所到之处都是欢乐。',
  MONK: '安静经营自己小世界的禅者——内核稳、有原则，不爱出击也不爱社交，岁月静好型选手。',
  'JOKE-R': '白天嘎嘎乐深夜哭一场——心稳但情感敏感，朋友面前嘻嘻哈哈，回家就emo的表里不一型。',
  SOLO: '典型"独狼型"酷盖——内核稳、随性果断，一个人的精彩胜过千军万马，高冷但自洽。',
  DEAD: '丧但稳，不影响别人——情感敏感、不爱守规则、行动慢、社交封闭，人间不值得但无所谓。',
  SEXY: '社交圈的快乐发电机——特别擅长夸别人，也希望被人夸，感染力强善解人意会聊天。',
  IMFW: '靠近会被吸走能量的类型——焦虑、行动慢、社交封闭，散发沉重感，但深度真实不假装。'
}

const NMTI_DESC = {
  MDRW: '办公室不倒翁——摸鱼炉火纯青，一个人默默苟着，深谙"做多错多"，已把带薪养老玩到极致。',
  JDRW: '最纯粹的卷王——一个人默默加班，被骂也不反驳就是埋头干，相信天道酬勤终会被看到。',
  JHRW: '每个老板都想要的员工——拼命干活、团队配合、从不抱怨还不跳槽，最辛苦但觉得是责任。',
  JHGW: '职场天花板——拼命卷人缘好不受气，领导看好的接班人，同事又爱又怕，目标一路升到顶。',
  MHGW: '办公室信息中心——不爱干活超爱社交，谁吵架谁离职你都知道，专业吃瓜顺便上班。',
  MHGP: '最快乐的打工人——不卷、爱社交、敢说话、说走就走，哪里钱多去哪里，快乐最重要。',
  JDGP: '天生创业胚子——拼命卷独来独往不受气说走就走，每份工作都当学习，目标是自己当老板。',
  JDGW: '职场最硬核存在——拼命卷喜欢独处不好惹，能力是护城河，不屑政治只想做到极致。'
}

const MBTI_GROUPS = [
  {
    label: '分析家',
    color: '#7c3aed',
    types: [
      { code: 'INTJ', name: '建筑师', emoji: '🧠', img: MBTI_IMG_BASE + '/INTJ.png', color: '#7c3aed' },
      { code: 'INTP', name: '逻辑学家', emoji: '🔬', img: MBTI_IMG_BASE + '/INTP.png', color: '#7c3aed' },
      { code: 'ENTJ', name: '指挥官', emoji: '👑', img: MBTI_IMG_BASE + '/ENTJ.png', color: '#7c3aed' },
      { code: 'ENTP', name: '辩论家', emoji: '💡', img: MBTI_IMG_BASE + '/ENTP.png', color: '#7c3aed' }
    ]
  },
  {
    label: '提倡者',
    color: '#16a34a',
    types: [
      { code: 'INFJ', name: '提倡者', emoji: '🌙', img: MBTI_IMG_BASE + '/INFJ.png', color: '#16a34a' },
      { code: 'INFP', name: '调停者', emoji: '🌸', img: MBTI_IMG_BASE + '/INFP.png', color: '#16a34a' },
      { code: 'ENFJ', name: '主人公', emoji: '🌟', img: MBTI_IMG_BASE + '/ENFJ.png', color: '#16a34a' },
      { code: 'ENFP', name: '竞选者', emoji: '🎨', img: MBTI_IMG_BASE + '/ENFP.png', color: '#16a34a' }
    ]
  },
  {
    label: '守护者',
    color: '#2563eb',
    types: [
      { code: 'ISTJ', name: '物流师', emoji: '📋', img: MBTI_IMG_BASE + '/ISTJ.png', color: '#2563eb' },
      { code: 'ISFJ', name: '守卫者', emoji: '🛡️', img: MBTI_IMG_BASE + '/ISFJ.png', color: '#2563eb' },
      { code: 'ESTJ', name: '总经理', emoji: '📊', img: MBTI_IMG_BASE + '/ESTJ.png', color: '#2563eb' },
      { code: 'ESFJ', name: '执政官', emoji: '💝', img: MBTI_IMG_BASE + '/ESFJ.png', color: '#2563eb' }
    ]
  },
  {
    label: '探索者',
    color: '#ea580c',
    types: [
      { code: 'ISTP', name: '鉴赏家', emoji: '🔧', img: MBTI_IMG_BASE + '/ISTP.png', color: '#ea580c' },
      { code: 'ISFP', name: '探险家', emoji: '🎵', img: MBTI_IMG_BASE + '/ISFP.png', color: '#ea580c' },
      { code: 'ESTP', name: '企业家', emoji: '⚡', img: MBTI_IMG_BASE + '/ESTP.png', color: '#ea580c' },
      { code: 'ESFP', name: '表演者', emoji: '🎭', img: MBTI_IMG_BASE + '/ESFP.png', color: '#ea580c' }
    ]
  }
]

const SBTI_HIGHLIGHTS = [
  { code: 'CTRL',   name: '拿捏者', emoji: '👑', img: SBTI_IMG_BASE + '/CTRL.png' },
  { code: 'HHHH',   name: '傻乐者', emoji: '😂', img: SBTI_IMG_BASE + '/HHHH.png' },
  { code: 'MONK',   name: '僧人',   emoji: '🧘', img: SBTI_IMG_BASE + '/MONK.png' },
  { code: 'JOKE-R', name: '小丑',   emoji: '🤡', img: SBTI_IMG_BASE + '/JOKE-R.jpg' },
  { code: 'SOLO',   name: '孤儿',   emoji: '🐺', img: SBTI_IMG_BASE + '/SOLO.png' },
  { code: 'DEAD',   name: '死者',   emoji: '💀', img: SBTI_IMG_BASE + '/DEAD.png' },
  { code: 'SEXY',   name: '尤物',   emoji: '🔥', img: SBTI_IMG_BASE + '/SEXY.png' },
  { code: 'IMFW',   name: '废物',   emoji: '🌌', img: SBTI_IMG_BASE + '/IMFW.png' }
]

const NMTI_HIGHLIGHTS = [
  { code: 'MDRW', name: '老油条',     emoji: '🐟', img: '/images/nmti/mdrw.png' },
  { code: 'JDRW', name: '孤独卷王',   emoji: '⚡', img: '/images/nmti/jdrw.png' },
  { code: 'JHRW', name: '老黄牛',     emoji: '🐂', img: '/images/nmti/jhrw.png' },
  { code: 'JHGW', name: '职场一哥',   emoji: '👔', img: '/images/nmti/jhgw.png' },
  { code: 'MHGW', name: '吃瓜前排',   emoji: '🍉', img: '/images/nmti/mhgw.png' },
  { code: 'MHGP', name: '快乐咸鱼',   emoji: '🐠', img: '/images/nmti/mhgp.png' },
  { code: 'JDGP', name: '创业狠人',   emoji: '🚀', img: '/images/nmti/jdgp.png' },
  { code: 'JDGW', name: '技术大佬',   emoji: '💻', img: '/images/nmti/jdgw.png' }
]

Page({
  data: {
    showModal: false,
    showChangelog: false,
    showMbtiDetail: false,
    mbtiDetailType: null,
    mbtiDetailDesc: '',
    version: '',
    changelog: [],
    mbtiGroups: MBTI_GROUPS,
    sbtiTypes: SBTI_HIGHLIGHTS,
    nmtiTypes: NMTI_HIGHLIGHTS,
    imgErr: {},
    lastMode: ''
  },

  onLoad() {
    const app = getApp()
    this.setData({
      version: app.globalData.version || '',
      changelog: app.globalData.changelog || []
    })
  },

  onShow() {
    const lastMode = wx.getStorageSync('lastTestMode') || 'mbti'
    this.setData({ lastMode })
  },

  startMBTI() {
    wx.setStorageSync('lastTestMode', 'mbti')
    this.setData({ lastMode: 'mbti' })
    wx.navigateTo({ url: '/pages/test/test?mode=mbti' })
  },

  startSBTI() {
    wx.setStorageSync('lastTestMode', 'sbti')
    this.setData({ lastMode: 'sbti' })
    wx.navigateTo({ url: '/pages/test/test?mode=sbti' })
  },

  startNMTI() {
    wx.setStorageSync('lastTestMode', 'nmti')
    this.setData({ lastMode: 'nmti' })
    wx.navigateTo({ url: '/pages/test/test?mode=nmti' })
  },

  showAbout() {
    wx.setStorageSync('lastTestMode', 'about')
    this.setData({ lastMode: 'about', showModal: true })
  },

  hideModal() {
    this.setData({ showModal: false })
  },

  showVersionLog() {
    this.setData({ showChangelog: true })
  },

  hideVersionLog() {
    this.setData({ showChangelog: false })
  },

  onImgError(e) {
    const code = e.currentTarget.dataset.code
    this.setData({ [`imgErr.${code}`]: true })
  },

  onMbtiTap(e) {
    const code = e.currentTarget.dataset.code
    const name = e.currentTarget.dataset.name
    const color = e.currentTarget.dataset.color
    this.setData({
      showMbtiDetail: true,
      mbtiDetailType: { code, name, color },
      mbtiDetailDesc: MBTI_DESC[code] || ''
    })
  },

  onSbtiTap(e) {
    const code = e.currentTarget.dataset.code
    const name = e.currentTarget.dataset.name
    this.setData({
      showMbtiDetail: true,
      mbtiDetailType: { code, name, color: '#db2777' },
      mbtiDetailDesc: SBTI_DESC[code] || ''
    })
  },

  onNmtiTap(e) {
    const code = e.currentTarget.dataset.code
    const name = e.currentTarget.dataset.name
    this.setData({
      showMbtiDetail: true,
      mbtiDetailType: { code, name, color: '#ea580c' },
      mbtiDetailDesc: NMTI_DESC[code] || ''
    })
  },

  hideMbtiDetail() {
    this.setData({ showMbtiDetail: false })
  },

  stopPropagation(e) {
    e.stopPropagation()
  }
})
