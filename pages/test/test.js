const { calculate: calculateMBTI } = require('../../utils/calculator.js')
const { calculateSBTI } = require('../../utils/sbtiCalculator.js')
const { mbtiQuestions } = require('../../utils/mbtiQuestions.js')
const { sbtiQuestions } = require('../../utils/sbtiQuestions.js')

// 根据模式加载对应题库（完全解耦）
function getQuestionsByMode(mode) {
  if (mode === 'sbti') {
    return sbtiQuestions
  }
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
    wx.setNavigationBarTitle({
      title: mode === 'sbti' ? 'SBTI 抽象人格测试' : 'MBTI 性格测试'
    })
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
  }
})
