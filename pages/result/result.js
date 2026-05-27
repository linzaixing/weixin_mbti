const { buildReport } = require('../../utils/personalityData.js')
const { getSBTIType } = require('../../utils/sbtiTypes.js')

Page({
  data: {
    result: null,
    report: null,
    sbtiBarWidth: 0,
    sbtiArchetype: null,
    sbtiLevels: [],
    isPaid: false,
    isSBTI: false
  },

  onLoad () {
    const app = getApp()
    const result = app.globalData.testResults
    const hasPaid = app.globalData.hasPaid || false

    if (!result) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }

    const isSBTI = result.testMode === 'sbti'
    const setData = {
      result,
      isPaid: hasPaid,
      isSBTI
    }

    if (isSBTI) {
      // SBTI：5模型 + 趣味原型
      const archetype = getSBTIType(result.sbtiCode)
      const levels = (result.sbtiLevels || []).map(m => Object.assign({}, m, {
        // 进度条左侧 0% ~ 中点 50% ~ 右侧 100%，level 范围 -100..100
        barPosition: Math.round((m.level + 100) / 2)
      }))
      setData.sbtiArchetype = archetype
      setData.sbtiLevels = levels
      wx.setNavigationBarTitle({
        title: hasPaid
          ? `SBTI · ${archetype.name}`
          : `SBTI · ${archetype.name}（预览）`
      })
    } else {
      // MBTI：原报告
      const report = buildReport(result.mbtiType, result.sbtiLevel || 0)
      const sbtiBarWidth = Math.round(((result.sbtiLevel || 0) + 100) / 2)
      setData.report = report
      setData.sbtiBarWidth = sbtiBarWidth
      wx.setNavigationBarTitle({
        title: hasPaid ? `${result.mbtiType} 完整报告` : `${result.mbtiType} 测试结果（预览）`
      })
    }

    this.setData(setData)
  },

  goToPay () {
    wx.navigateTo({ url: '/pages/pay/pay' })
  },

  // 从支付页返回时（页面被重新显示），重读支付状态
  onShow () {
    const app = getApp()
    const hasPaid = app.globalData.hasPaid || false
    if (hasPaid !== this.data.isPaid) {
      this.setData({ isPaid: hasPaid })
      const { result, isSBTI, sbtiArchetype } = this.data
      const title = isSBTI
        ? (hasPaid && sbtiArchetype ? `SBTI · ${sbtiArchetype.name}` : 'SBTI 测试结果（预览）')
        : (hasPaid && result ? `${result.mbtiType} 完整报告` : (result ? `${result.mbtiType} 测试结果（预览）` : 'MBTI 报告'))
      wx.setNavigationBarTitle({ title })
    }
  },

  restartTest () {
    const app = getApp()
    app.globalData.testResults = null
    app.globalData.hasPaid = false
    wx.redirectTo({ url: '/pages/index/index' })
  },

  shareResult () {
    const { result, report, sbtiArchetype, isSBTI } = this.data
    if (!result) return
    let text
    if (isSBTI && sbtiArchetype) {
      text = `我的 SBTI 抽象人格是「${sbtiArchetype.name}（${sbtiArchetype.code}）」—— ${sbtiArchetype.slogan}`
    } else if (report) {
      text = `我的 MBTI 是 ${result.mbtiType}（${report.typeName}），${report.slogan}`
    } else {
      text = '快来测测你的 MBTI/SBTI 性格吧'
    }
    wx.setClipboardData({
      data: text,
      success () {
        wx.showToast({ title: '已复制分享文字', icon: 'success' })
      }
    })
  },

  onShareAppMessage () {
    const { result, report, sbtiArchetype, isSBTI } = this.data
    let title = '快来测测你的性格吧'
    if (isSBTI && sbtiArchetype) {
      title = `我是 SBTI「${sbtiArchetype.name}」，你呢？`
    } else if (result && report) {
      title = `我是 ${result.mbtiType} · ${report.typeName}，你呢？`
    }
    return { title, path: '/pages/index/index' }
  }
})
