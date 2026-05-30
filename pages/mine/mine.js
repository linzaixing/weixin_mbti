Page({
  data: {
    avatarUrl: '',
    nickName: '',
    historyList: [],
    version: '',
    changelog: [],
    showChangelog: false
  },

  onLoad() {
    this.loadProfile()
    this.loadHistory()
    const app = getApp()
    this.setData({
      version: app.globalData.version || '',
      changelog: app.globalData.changelog || []
    })
  },

  onShow() {
    this.loadHistory()
  },

  loadProfile() {
    const avatarUrl = wx.getStorageSync('userAvatar') || ''
    const nickName = wx.getStorageSync('userNickName') || ''
    this.setData({ avatarUrl, nickName })
  },

  loadHistory() {
    const history = wx.getStorageSync('testHistory') || []
    const modeLabels = { mbti: 'MBTI', sbti: 'SBTI', nmti: 'NMTI' }
    const historyList = history.map(function (item, index) {
      return {
        id: index,
        testMode: item.testMode || 'mbti',
        modeLabel: modeLabels[item.testMode] || 'MBTI',
        resultCode: item.resultCode || '',
        resultName: item.resultName || '',
        time: item.time || '',
        raw: item
      }
    }).reverse()
    this.setData({ historyList })
  },

  chooseAvatar() {
    const that = this
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        const tempFilePath = res.tempFiles[0].tempFilePath
        that.setData({ avatarUrl: tempFilePath })
        wx.setStorageSync('userAvatar', tempFilePath)
      }
    })
  },

  onNickNameInput(e) {
    const val = (e.detail.value || '').trim()
    if (val) {
      this.setData({ nickName: val })
      wx.setStorageSync('userNickName', val)
    }
  },

  viewReport(e) {
    const index = e.currentTarget.dataset.index
    const item = this.data.historyList[index]
    if (!item || !item.raw) return

    const app = getApp()
    app.globalData.testResults = item.raw.results
    wx.navigateTo({ url: '/pages/result/result?from=history' })
  },

  clearHistory() {
    const that = this
    wx.showModal({
      title: '确认清除',
      content: '将清除所有历史测试记录，此操作不可撤回',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('testHistory')
          that.setData({ historyList: [] })
          wx.showToast({ title: '已清除', icon: 'success' })
        }
      }
    })
  },

  showVersionLog() {
    this.setData({ showChangelog: true })
  },

  hideVersionLog() {
    this.setData({ showChangelog: false })
  },

  stopPropagation(e) {
    e.stopPropagation()
  }
})
