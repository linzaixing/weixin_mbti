Page({
  data: {
    avatarUrl: '',
    nickName: '',
    editingName: false,
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
        var tempPath = res.tempFiles[0].tempFilePath
        var fs = wx.getFileSystemManager()
        var savedDir = wx.env.USER_DATA_PATH + '/avatar'
        try { fs.mkdirSync(savedDir, true) } catch (e) { /* ignore */ }
        var savedPath = savedDir + '/user_avatar.png'
        fs.saveFile({
          tempFilePath: tempPath,
          filePath: savedPath,
          success: function () {
            that.setData({ avatarUrl: savedPath })
            wx.setStorageSync('userAvatar', savedPath)
          },
          fail: function () {
            that.setData({ avatarUrl: tempPath })
            wx.setStorageSync('userAvatar', tempPath)
          }
        })
      }
    })
  },

  startEditName() {
    this.setData({ editingName: true })
  },

  onNickNameDone(e) {
    const val = (e.detail.value || '').trim()
    if (val) {
      this.setData({ nickName: val, editingName: false })
      wx.setStorageSync('userNickName', val)
    } else {
      this.setData({ editingName: false })
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
  },

  onShareAppMessage() {
    return {
      title: 'MBTI + SBTI + NMTI 性格测试，测测你是什么类型？',
      path: '/pages/index/index'
    }
  },

  onShareTimeline() {
    return {
      title: 'MBTI + SBTI + NMTI 性格测试，测测你是什么类型？'
    }
  }
})
