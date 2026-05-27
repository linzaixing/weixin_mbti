Page({
  data: {
    showModal: false
  },

  startMBTI() {
    wx.navigateTo({
      url: '/pages/test/test?mode=mbti'
    })
  },

  startSBTI() {
    wx.navigateTo({
      url: '/pages/test/test?mode=sbti'
    })
  },

  showAbout() {
    this.setData({
      showModal: true
    })
  },

  hideModal() {
    this.setData({
      showModal: false
    })
  },

  stopPropagation(e) {
    e.stopPropagation()
  }
})