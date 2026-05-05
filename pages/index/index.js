Page({
  data: {
    showModal: false
  },

  startTest() {
    wx.navigateTo({
      url: '/pages/test/test'
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