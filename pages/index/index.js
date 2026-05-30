const MBTI_IMG_BASE = 'https://laoguo-caiji.oss-cn-beijing.aliyuncs.com/ceping/static/81/img/16status'
const SBTI_IMG_BASE = 'https://laoguo-caiji.oss-cn-beijing.aliyuncs.com/ceping/sbti'

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

  stopPropagation(e) {
    e.stopPropagation()
  }
})
