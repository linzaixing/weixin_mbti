Page({
  data: {
    testResult: null
  },

  onLoad(options) {
    // 从全局获取测试结果
    const app = getApp()
    const result = app.globalData.testResults
    
    if (!result) {
      wx.showToast({
        title: '数据异常，请重新测试',
        icon: 'none'
      })
      wx.redirectTo({
        url: '/pages/index/index'
      })
      return
    }
    
    this.setData({
      testResult: result
    })
  },

  // 模拟支付（开发阶段使用）
  makePayment() {
    wx.showLoading({
      title: '正在发起支付...',
    })

    // 模拟支付成功（实际项目中这里调用 wx.requestPayment）
    setTimeout(() => {
      wx.hideLoading()
      
      wx.showToast({
        title: '支付成功！',
        icon: 'success',
        duration: 1500
      })

      // 保存支付状态并跳转到报告页
      const app = getApp()
      app.globalData.hasPaid = true
      
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/result/result'
        })
      }, 1600)
    }, 1200)
  },

  // 真实微信支付示例（后续可替换上面的makePayment）
  realPayment() {
    const that = this
    wx.requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success(res) {
        console.log('支付成功', res)
        const app = getApp()
        app.globalData.hasPaid = true
        wx.redirectTo({
          url: '/pages/result/result'
        })
      },
      fail(res) {
        console.log('支付失败', res)
        wx.showToast({
          title: '支付失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  backToTest() {
    wx.redirectTo({
      url: '/pages/test/test'
    })
  }
})