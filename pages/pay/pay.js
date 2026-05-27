const { PAY_CONFIG } = require('../../utils/config.js')

Page({
  data: {
    testResult: null,
    paying: false,
    payEnabled: PAY_CONFIG.ENABLED,
    product: PAY_CONFIG.PRODUCTS.fullReport
  },

  onLoad () {
    const app = getApp()
    const result = app.globalData.testResults

    if (!result) {
      wx.showToast({ title: '数据异常，请重新测试', icon: 'none' })
      setTimeout(() => {
        wx.redirectTo({ url: '/pages/index/index' })
      }, 1200)
      return
    }

    this.setData({ testResult: result })
  },

  /**
   * 入口：点击「立即支付」按钮
   * 根据配置走真实支付或演示模式
   */
  onPay () {
    if (this.data.paying) return
    if (PAY_CONFIG.ENABLED) {
      this.realPayment()
    } else {
      this.demoPayment()
    }
  },

  /**
   * 演示模式（开发阶段）：直接模拟支付成功
   */
  demoPayment () {
    this.setData({ paying: true })
    wx.showLoading({ title: '正在唤起支付...', mask: true })

    setTimeout(() => {
      wx.hideLoading()
      wx.showModal({
        title: '演示支付',
        content: '当前为演示模式，是否模拟支付成功并解锁报告？\n\n（生产环境请在 utils/config.js 中开启 ENABLED）',
        confirmText: '确认支付',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.onPaySuccess('demo-' + Date.now())
          } else {
            this.setData({ paying: false })
          }
        }
      })
    }, 600)
  },

  /**
   * 真实微信支付：
   *   1) 调 wx.login 拿 code → 发给后端换 openid
   *   2) 后端调微信"统一下单" → 返回支付参数
   *   3) 前端 wx.requestPayment 拉起付款界面
   */
  realPayment () {
    const that = this
    that.setData({ paying: true })
    wx.showLoading({ title: '正在创建订单...', mask: true })

    wx.login({
      success (loginRes) {
        if (!loginRes.code) {
          wx.hideLoading()
          wx.showToast({ title: '登录失败，请重试', icon: 'none' })
          that.setData({ paying: false })
          return
        }

        // 调用后端创建订单接口
        wx.request({
          url: PAY_CONFIG.BACKEND_BASE_URL + PAY_CONFIG.CREATE_ORDER_PATH,
          method: 'POST',
          data: {
            code: loginRes.code,
            productId: that.data.product.id,
            price: that.data.product.price
          },
          header: { 'content-type': 'application/json' },
          success (res) {
            wx.hideLoading()
            if (res.statusCode !== 200 || !res.data || res.data.code !== 0) {
              wx.showToast({ title: '订单创建失败', icon: 'none' })
              that.setData({ paying: false })
              return
            }

            const payParams = res.data.data || res.data
            const orderNo = payParams.orderNo

            // 拉起微信支付
            wx.requestPayment({
              timeStamp: payParams.timeStamp,
              nonceStr: payParams.nonceStr,
              package: payParams.package,
              signType: payParams.signType || 'RSA',
              paySign: payParams.paySign,
              success () {
                that.onPaySuccess(orderNo)
              },
              fail (err) {
                console.warn('支付失败/取消', err)
                wx.showToast({
                  title: err.errMsg && err.errMsg.includes('cancel') ? '支付已取消' : '支付失败',
                  icon: 'none'
                })
                that.setData({ paying: false })
              }
            })
          },
          fail () {
            wx.hideLoading()
            wx.showToast({ title: '网络错误，请重试', icon: 'none' })
            that.setData({ paying: false })
          }
        })
      },
      fail () {
        wx.hideLoading()
        wx.showToast({ title: '登录失败', icon: 'none' })
        that.setData({ paying: false })
      }
    })
  },

  /**
   * 支付成功后续：标记 + 持久化 + 跳转结果页
   */
  onPaySuccess (orderNo) {
    const app = getApp()
    app.globalData.hasPaid = true
    app.globalData.lastOrderNo = orderNo

    // 持久化（避免冷启动丢失）
    try {
      wx.setStorageSync('lastPaidOrder', {
        orderNo,
        ts: Date.now()
      })
    } catch (e) {}

    wx.showToast({ title: '支付成功！', icon: 'success', duration: 1200 })
    setTimeout(() => {
      // 优先返回上一页（结果页会通过 onShow 检测付费状态自动刷新）
      wx.navigateBack({
        delta: 1,
        fail: () => {
          wx.redirectTo({ url: '/pages/result/result' })
        }
      })
    }, 1200)
  },

  backToTest () {
    wx.navigateBack({ delta: 1, fail: () => {
      wx.redirectTo({ url: '/pages/index/index' })
    }})
  }
})
