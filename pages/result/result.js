const { buildReport } = require('../../utils/personalityData.js')
const { getSBTIType } = require('../../utils/sbtiTypes.js')
const { getNMTIType } = require('../../utils/nmtiTypes.js')

Page({
  data: {
    result: null,
    report: null,
    sbtiBarWidth: 0,
    sbtiArchetype: null,
    sbtiLevels: [],
    nmtiArchetype: null,
    nmtiLevels: [],
    isPaid: true,
    isSBTI: false,
    isNMTI: false,
    avatarImg: '',
    avatarEmoji: '',
    avatarLoadFail: false,
    weakDims: [],
    weakDimsText: ''
  },

  onLoad (options) {
    const app = getApp()
    const result = app.globalData.testResults

    if (!result) {
      wx.switchTab({ url: '/pages/index/index' })
      return
    }

    const isSBTI = result.testMode === 'sbti'
    const isNMTI = result.testMode === 'nmti'
    const setData = {
      result,
      isPaid: true,
      isSBTI,
      isNMTI
    }

    if (isNMTI) {
      const archetype = getNMTIType(result.nmtiCode)
      const levels = (result.nmtiLevels || []).map(m => Object.assign({}, m, {
        barPosition: Math.round((m.level + 100) / 2)
      }))
      setData.nmtiArchetype = archetype
      setData.nmtiLevels = levels
      setData.avatarImg = '/images/nmti/' + result.nmtiCode.toLowerCase() + '.png'
      setData.avatarEmoji = archetype.emoji || '🐂'
      wx.setNavigationBarTitle({
        title: `NMTI · ${archetype.name}`
      })
    } else if (isSBTI) {
      const archetype = getSBTIType(result.sbtiCode)
      const levels = (result.sbtiLevels || []).map(m => Object.assign({}, m, {
        barPosition: Math.round((m.level + 100) / 2)
      }))
      setData.sbtiArchetype = archetype
      setData.sbtiLevels = levels
      const sbtiImgMap = {
        'CTRL': '/CTRL.png', 'HHHH': '/HHHH.png', 'MONK': '/MONK.png',
        'JOKE-R': '/JOKE-R.png', 'SOLO': '/SOLO.png', 'DEAD': '/DEAD.png',
        'SEXY': '/SEXY.png', 'IMFW': '/IMFW.png'
      }
      const imgPath = sbtiImgMap[archetype.code]
      setData.avatarImg = imgPath ? '/images/sbti' + imgPath : ''
      setData.avatarEmoji = '🎭'
      wx.setNavigationBarTitle({
        title: `SBTI · ${archetype.name}`
      })
    } else {
      const report = buildReport(result.mbtiType, result.sbtiLevel || 0)
      const sbtiBarWidth = Math.round(((result.sbtiLevel || 0) + 100) / 2)
      setData.report = report
      setData.sbtiBarWidth = sbtiBarWidth
      setData.avatarImg = 'https://laoguo-caiji.oss-cn-beijing.aliyuncs.com/ceping/static/81/img/16status/' + result.mbtiType + '.png'
      wx.setNavigationBarTitle({
        title: `${result.mbtiType} 完整报告`
      })
    }

    // 置信度：提取弱维度用于提示
    if (result.confidence && Array.isArray(result.confidence)) {
      const DIM_LABEL = {
        'EI': '外向/内向', 'SN': '感知/直觉', 'TF': '思考/情感', 'JP': '判断/感知',
        'SLF': '自我模型', 'EMO': '情感模型', 'ATT': '态度模型', 'ACT': '行动模型', 'SOC': '社交模型',
        'MJ': '工作强度', 'DH': '协作方式', 'RG': '冲突处理', 'WP': '职业流动'
      }
      const weakDims = result.confidence
        .filter(c => c.weak)
        .map(c => c.name || DIM_LABEL[c.dim] || c.dim)
      setData.weakDims = weakDims
      setData.weakDimsText = weakDims.join('、')
    }

    this.setData(setData)
    if (!options || options.from !== 'history') {
      this._saveHistory(result, setData)
    }
  },

  _saveHistory(result, setData) {
    const now = new Date()
    const time = now.getFullYear() + '/' + (now.getMonth() + 1) + '/' + now.getDate() + ' ' + now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0')
    let resultCode = ''
    let resultName = ''

    if (result.testMode === 'nmti' && setData.nmtiArchetype) {
      resultCode = setData.nmtiArchetype.code
      resultName = setData.nmtiArchetype.name
    } else if (result.testMode === 'sbti' && setData.sbtiArchetype) {
      resultCode = setData.sbtiArchetype.code
      resultName = setData.sbtiArchetype.name
    } else if (setData.report) {
      resultCode = result.mbtiType
      resultName = setData.report.typeName
    }

    const record = {
      testMode: result.testMode || 'mbti',
      resultCode: resultCode,
      resultName: resultName,
      time: time,
      results: result
    }

    const history = wx.getStorageSync('testHistory') || []
    history.push(record)
    if (history.length > 50) history.shift()
    wx.setStorageSync('testHistory', history)
  },

  onAvatarError () {
    this.setData({ avatarLoadFail: true })
  },

  restartTest () {
    const app = getApp()
    app.globalData.testResults = null
    app.globalData.hasPaid = false
    wx.switchTab({ url: '/pages/index/index' })
  },

  saveScreenshot () {
    const that = this
    const { result, report, sbtiArchetype, nmtiArchetype, isSBTI, isNMTI, avatarImg } = this.data
    if (!result) return

    wx.showLoading({ title: '生成中...' })

    const query = wx.createSelectorQuery()
    query.select('#shareCanvas')
      .fields({ node: true, size: true })
      .exec(function (res) {
        if (!res[0] || !res[0].node) {
          wx.hideLoading()
          wx.showToast({ title: '生成失败', icon: 'none' })
          return
        }
        const canvas = res[0].node
        const W = 750
        const H = 880
        const dpr = wx.getWindowInfo().pixelRatio || 2
        canvas.width = W * dpr
        canvas.height = H * dpr
        const ctx = canvas.getContext('2d')
        ctx.scale(dpr, dpr)

        var qrImg = canvas.createImage()
        var avatarImage = canvas.createImage()
        var loadCount = 0
        var totalLoad = 2

        function onAllLoaded () {
          loadCount++
          if (loadCount >= totalLoad) {
            that._drawCard(ctx, W, H, qrImg, avatarImage)
            doSave()
          }
        }

        qrImg.onload = onAllLoaded
        qrImg.onerror = onAllLoaded
        qrImg.src = '/images/qrcode.png'

        avatarImage.onload = onAllLoaded
        avatarImage.onerror = function () {
          avatarImage = null
          onAllLoaded()
        }
        if (avatarImg) {
          avatarImage.src = avatarImg
        } else {
          avatarImage = null
          onAllLoaded()
        }

        function doSave () {
          setTimeout(function () {
            wx.canvasToTempFilePath({
              canvas: canvas,
              width: W * dpr,
              height: H * dpr,
              destWidth: W * dpr,
              destHeight: H * dpr,
              success: function (tmpRes) {
                wx.saveImageToPhotosAlbum({
                  filePath: tmpRes.tempFilePath,
                  success: function () {
                    wx.hideLoading()
                    wx.showToast({ title: '已保存到相册', icon: 'success' })
                  },
                  fail: function (err) {
                    wx.hideLoading()
                    if (err.errMsg && (err.errMsg.indexOf('auth') !== -1 || err.errMsg.indexOf('deny') !== -1 || err.errMsg.indexOf('authorize') !== -1)) {
                      wx.showModal({
                        title: '需要相册权限',
                        content: '请在设置中允许"保存到相册"权限，才能保存截图',
                        confirmText: '去设置',
                        cancelText: '取消',
                        success: function (modalRes) {
                          if (modalRes.confirm) {
                            wx.openSetting()
                          }
                        }
                      })
                    } else {
                      wx.showToast({ title: '保存失败', icon: 'none' })
                    }
                  }
                })
              },
              fail: function () {
                wx.hideLoading()
                wx.showToast({ title: '生成图片失败', icon: 'none' })
              }
            })
          }, 200)
        }
      })
  },

  _drawCard (ctx, W, H, qrImg, avatarImage) {
    const { result, report, sbtiArchetype, nmtiArchetype, isSBTI, isNMTI } = this.data

    ctx.fillStyle = '#f8fafc'
    ctx.fillRect(0, 0, W, H)

    ctx.fillStyle = '#ffffff'
    const rx = 40, ry = 50, rw = W - 80, rh = H - 100, rr = 24
    ctx.beginPath()
    ctx.moveTo(rx + rr, ry)
    ctx.lineTo(rx + rw - rr, ry)
    ctx.arcTo(rx + rw, ry, rx + rw, ry + rr, rr)
    ctx.lineTo(rx + rw, ry + rh - rr)
    ctx.arcTo(rx + rw, ry + rh, rx + rw - rr, ry + rh, rr)
    ctx.lineTo(rx + rr, ry + rh)
    ctx.arcTo(rx, ry + rh, rx, ry + rh - rr, rr)
    ctx.lineTo(rx, ry + rr)
    ctx.arcTo(rx, ry, rx + rr, ry, rr)
    ctx.closePath()
    ctx.fill()

    let title = '', subtitle = '', code = '', slogan = '', emoji = ''
    let accentColor = '#7c3aed'

    if (isNMTI && nmtiArchetype) {
      title = 'NMTI 职场牛马测试'
      subtitle = nmtiArchetype.name
      code = nmtiArchetype.code
      slogan = nmtiArchetype.slogan
      emoji = nmtiArchetype.emoji
      accentColor = '#ea580c'
    } else if (isSBTI && sbtiArchetype) {
      title = 'SBTI 抽象人格测试'
      subtitle = sbtiArchetype.name
      code = sbtiArchetype.code
      slogan = sbtiArchetype.slogan
      emoji = '🎭'
      accentColor = '#db2777'
    } else if (report) {
      title = 'MBTI 性格测试'
      subtitle = report.typeName
      code = result.mbtiType
      slogan = report.slogan
      emoji = ''
    }

    let y = 130
    ctx.fillStyle = '#94a3b8'
    ctx.font = '24px sans-serif'
    ctx.textAlign = 'center'
    ctx.fillText(title, W / 2, y)

    y += 50
    if (avatarImage) {
      var avatarSize = 140
      var avatarX = (W - avatarSize) / 2
      ctx.save()
      ctx.beginPath()
      ctx.arc(avatarX + avatarSize / 2, y + avatarSize / 2, avatarSize / 2, 0, Math.PI * 2)
      ctx.closePath()
      ctx.clip()
      ctx.drawImage(avatarImage, avatarX, y, avatarSize, avatarSize)
      ctx.restore()
      y += avatarSize + 30
    } else if (emoji) {
      ctx.font = '80px sans-serif'
      ctx.fillText(emoji, W / 2, y + 70)
      y += 100
    } else {
      y += 30
    }

    y += 40
    ctx.fillStyle = accentColor
    ctx.font = 'bold 72px sans-serif'
    ctx.fillText(code, W / 2, y)

    y += 70
    ctx.fillStyle = '#1e2937'
    ctx.font = 'bold 48px sans-serif'
    ctx.fillText(subtitle, W / 2, y)

    y += 70
    ctx.fillStyle = '#64748b'
    ctx.font = '26px sans-serif'
    const maxSlogan = slogan.length > 30 ? slogan.substring(0, 30) + '...' : slogan
    ctx.fillText('「' + maxSlogan + '」', W / 2, y)

    // 二维码紧跟内容
    y += 40
    ctx.fillStyle = '#e2e8f0'
    ctx.fillRect(100, y, W - 200, 1)

    var qrSize = 160
    if (qrImg) {
      var qrX = (W - qrSize) / 2
      var qrY = y + 25
      ctx.drawImage(qrImg, qrX, qrY, qrSize, qrSize)

      ctx.fillStyle = '#94a3b8'
      ctx.font = '24px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('长按识别 · 测测你是什么类型', W / 2, qrY + qrSize + 35)

      ctx.fillStyle = '#cbd5e1'
      ctx.font = '20px sans-serif'
      ctx.fillText('MBTI + SBTI + NMTI 性格测试小程序', W / 2, qrY + qrSize + 65)
    } else {
      ctx.fillStyle = '#94a3b8'
      ctx.font = '24px sans-serif'
      ctx.textAlign = 'center'
      ctx.fillText('你也来测测吧！', W / 2, y + 50)

      ctx.fillStyle = '#cbd5e1'
      ctx.font = '20px sans-serif'
      ctx.fillText('MBTI + SBTI + NMTI 性格测试小程序', W / 2, y + 85)
    }
  },

  onShareAppMessage () {
    const { result, report, sbtiArchetype, nmtiArchetype, isSBTI, isNMTI } = this.data
    let title = '快来测测你的性格吧'
    if (isNMTI && nmtiArchetype) {
      title = `我是职场「${nmtiArchetype.name}」，你呢？`
    } else if (isSBTI && sbtiArchetype) {
      title = `我是 SBTI「${sbtiArchetype.name}」，你呢？`
    } else if (result && report) {
      title = `我是 ${result.mbtiType} · ${report.typeName}，你呢？`
    }
    return { title, path: '/pages/index/index' }
  },

  onShareTimeline () {
    const { result, report, sbtiArchetype, nmtiArchetype, isSBTI, isNMTI } = this.data
    let title = '快来测测你的性格吧'
    if (isNMTI && nmtiArchetype) {
      title = `我是职场「${nmtiArchetype.name}」，你呢？`
    } else if (isSBTI && sbtiArchetype) {
      title = `我是 SBTI「${sbtiArchetype.name}」，你呢？`
    } else if (result && report) {
      title = `我是 ${result.mbtiType} · ${report.typeName}，你呢？`
    }
    return { title }
  }
})
