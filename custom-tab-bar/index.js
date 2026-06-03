Component({
  data: {
    selected: 0,
    list: [
      {
        pagePath: '/pages/index/index',
        text: '首页',
        iconPath: '/images/tab-home.png',
        selectedIconPath: '/images/tab-home-active.png'
      },
      {
        pagePath: '/pages/mine/mine',
        text: '我的',
        iconPath: '/images/tab-mine.png',
        selectedIconPath: '/images/tab-mine-active.png'
      }
    ]
  },
  methods: {
    switchTab (e) {
      const url = e.currentTarget.dataset.path
      wx.switchTab({ url })
    }
  }
})
