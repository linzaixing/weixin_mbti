const { buildReport } = require('../../utils/personalityData.js')
const { getSBTIType } = require('../../utils/sbtiTypes.js')

Page({
  data: {
    result: null,
    report: null,
    sbtiBarWidth: 0,
    sbtiArchetype: null,
    sbtiLevels: [],
    // 微信审核期间关闭付费门槛，默认完整展示
    isPaid: true,
    isSBTI: false
  },

  onLoad () {
    const app = getApp()
    const result = app.globalData.testResults

    if (!result) {
      wx.redirectTo({ url: '/pages/index/index' })
      return
    }

    const isSBTI = result.testMode === 'sbti'
    const setData = {
      result,
      isPaid: true,
      isSBTI
    }

    if (isSBTI) {
      const archetype = getSBTIType(result.sbtiCode)
      const levels = (result.sbtiLevels || []).map(m => Object.assign({}, m, {
        barPosition: Math.round((m.level + 100) / 2)
      }))
      setData.sbtiArchetype = archetype
      setData.sbtiLevels = levels
      wx.setNavigationBarTitle({
        title: `SBTI · ${archetype.name}`
      })
    } else {
      const report = buildReport(result.mbtiType, result.sbtiLevel || 0)
      const sbtiBarWidth = Math.round(((result.sbtiLevel || 0) + 100) / 2)
      setData.report = report
      setData.sbtiBarWidth = sbtiBarWidth
      wx.setNavigationBarTitle({
        title: `${result.mbtiType} 完整报告`
      })
    }

    this.setData(setData)
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
