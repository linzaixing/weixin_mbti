const { calculate: calculateMBTI } = require('../../utils/calculator.js')
const { calculateSBTI } = require('../../utils/sbtiCalculator.js')
const { calculateNMTI } = require('../../utils/nmtiCalculator.js')
const { mbtiQuestions } = require('../../utils/mbtiQuestions.js')
const { sbtiQuestions } = require('../../utils/sbtiQuestions.js')
const { nmtiQuestions } = require('../../utils/nmtiQuestions.js')

function getQuestionsByMode(mode) {
  if (mode === 'sbti') return sbtiQuestions
  if (mode === 'nmti') return nmtiQuestions
  return mbtiQuestions
}

Page({
  data: {
    questions: [],
    current: 0,
    answers: {},
    selectedOption: null,
    progress: 0,
    testMode: 'mbti'
  },

  onLoad(options) {
    const mode = options.mode || 'mbti'
    const qs = getQuestionsByMode(mode)
    this.setData({
      questions: qs,
      testMode: mode
    })
    this.updateProgress()
    const titles = { mbti: 'MBTI 性格测试', sbti: 'SBTI 抽象人格测试', nmti: 'NMTI 职场牛马测试' }
    wx.setNavigationBarTitle({ title: titles[mode] || titles.mbti })
  },

  selectOption(e) {
    const optionId = e.currentTarget.dataset.id
    const currentQuestion = this.data.questions[this.data.current]
    this.setData({ selectedOption: optionId })
    const opt = currentQuestion.options.find(o => o.id === optionId)
    this.data.answers[currentQuestion.id] = {
      optionId,
      score: opt.score,
      dimension: currentQuestion.dimension
    }
  },

  nextQuestion() {
    const { current, questions, selectedOption, answers } = this.data
    const currentQ = questions[current]

    if (!selectedOption && !answers[currentQ.id]) {
      wx.showToast({ title: '请选择一个选项', icon: 'none' })
      return
    }

    if (current < questions.length - 1) {
      const nextQ = questions[current + 1]
      this.setData({
        current: current + 1,
        selectedOption: answers[nextQ.id] ? answers[nextQ.id].optionId : null
      })
      this.updateProgress()
    } else {
      this.calculateResults()
    }
  },

  prevQuestion() {
    const { current } = this.data
    if (current > 0) {
      const prevQ = this.data.questions[current - 1]
      this.setData({
        current: current - 1,
        selectedOption: this.data.answers[prevQ.id]
          ? this.data.answers[prevQ.id].optionId
          : null
      })
      this.updateProgress()
    }
  },

  updateProgress() {
    const progress = Math.round(((this.data.current + 1) / this.data.questions.length) * 100)
    this.setData({ progress })
  },

  calculateResults() {
    const { answers, testMode } = this.data
    let calc
    if (testMode === 'sbti') {
      calc = calculateSBTI(answers)
    } else if (testMode === 'nmti') {
      calc = calculateNMTI(answers)
    } else {
      calc = calculateMBTI(answers)
    }

    const result = {
      ...calc,
      answers,
      testMode,
      timestamp: new Date().toISOString()
    }

    const app = getApp()
    app.globalData.testResults = result
    // 微信审核期间关闭付费门槛，所有用户直接查看完整报告
    app.globalData.hasPaid = true

    wx.redirectTo({ url: '/pages/result/result' })
  },

  onShareAppMessage() {
    return {
      title: 'MBTI + SBTI + NMTI 性格测试，测测你是什么类型？',
      path: '/pages/index/index'
    }
  }
})
