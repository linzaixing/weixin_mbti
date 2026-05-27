const MBTI_GROUPS = [
  {
    label: '紫人',
    color: '#7c3aed',
    types: [
      { code: 'INTJ', name: '建筑师', emoji: '🧠', img: '/images/mbti/intj.png', color: '#7c3aed' },
      { code: 'INTP', name: '逻辑学家', emoji: '🔬', img: '/images/mbti/intp.png', color: '#7c3aed' },
      { code: 'ENTJ', name: '指挥官', emoji: '👑', img: '/images/mbti/entj.png', color: '#7c3aed' },
      { code: 'ENTP', name: '辩论家', emoji: '💡', img: '/images/mbti/entp.png', color: '#7c3aed' }
    ]
  },
  {
    label: '绿人',
    color: '#16a34a',
    types: [
      { code: 'INFJ', name: '提倡者', emoji: '🌙', img: '/images/mbti/infj.png', color: '#16a34a' },
      { code: 'INFP', name: '调停者', emoji: '🌸', img: '/images/mbti/infp.png', color: '#16a34a' },
      { code: 'ENFJ', name: '主人公', emoji: '🌟', img: '/images/mbti/enfj.png', color: '#16a34a' },
      { code: 'ENFP', name: '竞选者', emoji: '🎨', img: '/images/mbti/enfp.png', color: '#16a34a' }
    ]
  },
  {
    label: '蓝人',
    color: '#2563eb',
    types: [
      { code: 'ISTJ', name: '物流师', emoji: '📋', img: '/images/mbti/istj.png', color: '#2563eb' },
      { code: 'ISFJ', name: '守卫者', emoji: '🛡️', img: '/images/mbti/isfj.png', color: '#2563eb' },
      { code: 'ESTJ', name: '总经理', emoji: '📊', img: '/images/mbti/estj.png', color: '#2563eb' },
      { code: 'ESFJ', name: '执政官', emoji: '💝', img: '/images/mbti/esfj.png', color: '#2563eb' }
    ]
  },
  {
    label: '橙人',
    color: '#ea580c',
    types: [
      { code: 'ISTP', name: '鉴赏家', emoji: '🔧', img: '/images/mbti/istp.png', color: '#ea580c' },
      { code: 'ISFP', name: '探险家', emoji: '🎵', img: '/images/mbti/isfp.png', color: '#ea580c' },
      { code: 'ESTP', name: '企业家', emoji: '⚡', img: '/images/mbti/estp.png', color: '#ea580c' },
      { code: 'ESFP', name: '表演者', emoji: '🎭', img: '/images/mbti/esfp.png', color: '#ea580c' }
    ]
  }
]

const SBTI_HIGHLIGHTS = [
  { code: 'CTRL',   name: '拿捏者', emoji: '👑' },
  { code: 'HHHH',   name: '傻乐者', emoji: '😂' },
  { code: 'MONK',   name: '僧人',   emoji: '🧘' },
  { code: 'JOKE-R', name: '小丑',   emoji: '🤡' },
  { code: 'SOLO',   name: '孤儿',   emoji: '🐺' },
  { code: 'DEAD',   name: '死者',   emoji: '💀' },
  { code: 'SEXY',   name: '尤物',   emoji: '🔥' },
  { code: 'IMFW',   name: '废物',   emoji: '🌌' }
]

Page({
  data: {
    showModal: false,
    showChangelog: false,
    version: '',
    changelog: [],
    mbtiGroups: MBTI_GROUPS,
    sbtiTypes: SBTI_HIGHLIGHTS,
    imgErr: {}
  },

  onLoad() {
    const app = getApp()
    this.setData({
      version: app.globalData.version || '',
      changelog: app.globalData.changelog || []
    })
  },

  startMBTI() {
    wx.navigateTo({ url: '/pages/test/test?mode=mbti' })
  },

  startSBTI() {
    wx.navigateTo({ url: '/pages/test/test?mode=sbti' })
  },

  showAbout() {
    this.setData({ showModal: true })
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
