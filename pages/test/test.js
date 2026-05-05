const questions = [
  // EI 维度 (外向/内向) - 7题
  {
    id: 1,
    text: "在派对或聚会中，你通常会：",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 积极参与，与很多人交流，感到充满能量", score: 5 }, // E
      { id: "B", text: "B. 更喜欢与少数熟悉的人小范围聊天，容易感到疲惫", score: -5 } // I
    ]
  },
  {
    id: 2,
    text: "当你遇到问题时，你更倾向于：",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 立刻找朋友讨论，集思广益", score: 4 }, // E
      { id: "B", text: "B. 自己先思考一段时间，理清思路", score: -4 } // I
    ]
  },
  {
    id: 3,
    text: "你更喜欢的工作环境是：",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 热闹、充满互动的开放式办公室", score: 5 }, // E
      { id: "B", text: "B. 安静、能专注思考的独立空间", score: -5 } // I
    ]
  },
  {
    id: 4,
    text: "周末你通常会：",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 外出社交、参加活动、见朋友", score: 4 }, // E
      { id: "B", text: "B. 在家休息、阅读、独处充电", score: -4 } // I
    ]
  },
  {
    id: 5,
    text: "表达自己的想法时，你：",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 喜欢大声说出来，与他人分享", score: 3 }, // E
      { id: "B", text: "B. 更喜欢写下来或在小圈子里讨论", score: -3 } // I
    ]
  },
  {
    id: 6,
    text: "在团队中，你通常扮演什么角色？",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 活跃的组织者和发言者", score: 5 }, // E
      { id: "B", text: "B. 认真倾听和思考的贡献者", score: -5 } // I
    ]
  },
  {
    id: 7,
    text: "社交结束后，你的感觉通常是：",
    dimension: "EI",
    options: [
      { id: "A", text: "A. 兴奋且充满活力", score: 4 }, // E
      { id: "B", text: "B. 需要时间独处来恢复能量", score: -4 } // I
    ]
  },
  
  // SN 维度 (实感/直觉) - 7题
  {
    id: 8,
    text: "你更注重：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 实际的细节和具体事实", score: 5 }, // S
      { id: "B", text: "B. 整体概念、可能性和未来趋势", score: -5 } // N
    ]
  },
  {
    id: 9,
    text: "阅读时，你更喜欢：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 实用指南和真实故事", score: 4 }, // S
      { id: "B", text: "B. 科幻、哲学或充满想象力的作品", score: -4 } // N
    ]
  },
  {
    id: 10,
    text: "解决问题时，你倾向于：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 使用经过验证的方法和步骤", score: 5 }, // S
      { id: "B", text: "B. 寻找创新的、新颖的解决方案", score: -5 } // N
    ]
  },
  {
    id: 11,
    text: "你对未来的规划：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 基于当前实际情况制定具体计划", score: 4 }, // S
      { id: "B", text: "B. 充满各种可能性和长远愿景", score: -4 } // N
    ]
  },
  {
    id: 12,
    text: "你更相信：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 自己的五感所感知到的信息", score: 5 }, // S
      { id: "B", text: "B. 内心的直觉和灵感", score: -5 } // N
    ]
  },
  {
    id: 13,
    text: "谈话中，你更关注：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 具体的事实和细节", score: 4 }, // S
      { id: "B", text: "B. 隐含的意义和背后的故事", score: -4 } // N
    ]
  },
  {
    id: 14,
    text: "你对新事物的态度是：",
    dimension: "SN",
    options: [
      { id: "A", text: "A. 谨慎观察，确认实用性后再尝试", score: 3 }, // S
      { id: "B", text: "B. 充满好奇，快速探索可能性", score: -3 } // N
    ]
  },
  
  // TF 维度 (思考/情感) - 7题
  {
    id: 15,
    text: "做决定时，你更看重：",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 逻辑分析和客观事实", score: 5 }, // T
      { id: "B", text: "B. 他人感受和人际和谐", score: -5 } // F
    ]
  },
  {
    id: 16,
    text: "批评别人时，你：",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 直接指出问题，注重事实", score: 4 }, // T
      { id: "B", text: "B. 会考虑对方的感受，委婉表达", score: -4 } // F
    ]
  },
  {
    id: 17,
    text: "你更喜欢的工作风格：",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 高效、注重结果和公平", score: 5 }, // T
      { id: "B", text: "B. 注重团队氛围和人际关系", score: -5 } // F
    ]
  },
  {
    id: 18,
    text: "面对冲突，你通常：",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 分析原因，寻找最合理的解决方案", score: 4 }, // T
      { id: "B", text: "B. 优先维护关系，寻求双方都能接受的结果", score: -4 } // F
    ]
  },
  {
    id: 19,
    text: "你认为成功更重要的是：",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 实现目标和个人成就", score: 3 }, // T
      { id: "B", text: "B. 获得认可和人际关系的和谐", score: -3 } // F
    ]
  },
  {
    id: 20,
    text: "在帮助别人时，你：",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 提供实用建议和解决方案", score: 4 }, // T
      { id: "B", text: "B. 给予情感支持和共情", score: -4 } // F
    ]
  },
  {
    id: 21,
    text: "你更容易被什么打动？",
    dimension: "TF",
    options: [
      { id: "A", text: "A. 严谨的逻辑和强大的论证", score: 5 }, // T
      { id: "B", text: "B. 温暖的故事和人文关怀", score: -5 } // F
    ]
  },
  
  // JP 维度 (判断/感知) - 7题
  {
    id: 22,
    text: "对于日程安排，你更喜欢：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 有明确计划和时间表", score: 5 }, // J
      { id: "B", text: "B. 保持灵活，根据情况调整", score: -5 } // P
    ]
  },
  {
    id: 23,
    text: "完成任务时，你通常：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 提前规划，按部就班完成", score: 4 }, // J
      { id: "B", text: "B. 在截止日期前集中爆发完成", score: -4 } // P
    ]
  },
  {
    id: 24,
    text: "你的生活方式更接近：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 井井有条、结构化", score: 5 }, // J
      { id: "B", text: "B. 灵活自由、随性而为", score: -5 } // P
    ]
  },
  {
    id: 25,
    text: "旅行时，你更喜欢：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 提前做好详细的行程规划", score: 4 }, // J
      { id: "B", text: "B. 随遇而安，临时决定去哪里", score: -4 } // P
    ]
  },
  {
    id: 26,
    text: "你对规则的态度是：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 遵守规则，喜欢明确的框架", score: 3 }, // J
      { id: "B", text: "B. 根据实际情况灵活应对", score: -3 } // P
    ]
  },
  {
    id: 27,
    text: "做决定时，你：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 喜欢尽快做出决定并坚持", score: 5 }, // J
      { id: "B", text: "B. 喜欢收集更多信息，保持开放", score: -5 } // P
    ]
  },
  {
    id: 28,
    text: "你的工作空间通常是：",
    dimension: "JP",
    options: [
      { id: "A", text: "A. 整洁有序，一切都有固定位置", score: 4 }, // J
      { id: "B", text: "B. 创意满满，东西随手可得", score: -4 } // P
    ]
  }
]

Page({
  data: {
    questions: questions,
    current: 0,
    answers: {}, // 存储每个问题的答案 {questionId: {optionId, score, dimension}}
    selectedOption: null,
    progress: 0
  },

  onLoad() {
    this.updateProgress()
  },

  selectOption(e) {
    const optionId = e.currentTarget.dataset.id
    const currentQuestion = this.data.questions[this.data.current]
    
    this.setData({
      selectedOption: optionId
    })
    
    // 记录答案
    const answer = {
      optionId: optionId,
      score: currentQuestion.options.find(opt => opt.id === optionId).score,
      dimension: currentQuestion.dimension
    }
    
    this.data.answers[currentQuestion.id] = answer
  },

  nextQuestion() {
    const { current, questions, selectedOption, answers } = this.data
    const currentQ = questions[current]
    
    // 检查是否已选择
    if (!selectedOption && !answers[currentQ.id]) {
      wx.showToast({
        title: '请选择一个选项',
        icon: 'none'
      })
      return
    }
    
    if (current < questions.length - 1) {
      this.setData({
        current: current + 1,
        selectedOption: answers[questions[current + 1].id] ? 
                        answers[questions[current + 1].id].optionId : null
      })
      this.updateProgress()
    } else {
      // 完成测试，计算结果
      this.calculateResults()
    }
  },

  prevQuestion() {
    const { current } = this.data
    if (current > 0) {
      const prevQ = this.data.questions[current - 1]
      this.setData({
        current: current - 1,
        selectedOption: this.data.answers[prevQ.id] ? 
                        this.data.answers[prevQ.id].optionId : null
      })
      this.updateProgress()
    }
  },

  updateProgress() {
    const progress = Math.round(((this.data.current + 1) / this.data.questions.length) * 100)
    this.setData({ progress })
  },

  calculateResults() {
    const answers = this.data.answers
    let scores = {
      E: 0, I: 0,
      S: 0, N: 0,
      T: 0, F: 0,
      J: 0, P: 0
    }
    
    // 计算每个维度的得分
    Object.keys(answers).forEach(qid => {
      const ans = answers[qid]
      const dim = ans.dimension
      
      if (dim === 'EI') {
        if (ans.score > 0) scores.E += ans.score
        else scores.I += Math.abs(ans.score)
      } else if (dim === 'SN') {
        if (ans.score > 0) scores.S += ans.score
        else scores.N += Math.abs(ans.score)
      } else if (dim === 'TF') {
        if (ans.score > 0) scores.T += ans.score
        else scores.F += Math.abs(ans.score)
      } else if (dim === 'JP') {
        if (ans.score > 0) scores.J += ans.score
        else scores.P += Math.abs(ans.score)
      }
    })
    
    // 确定主导类型
    const mbtiType = 
      (scores.E > scores.I ? 'E' : 'I') +
      (scores.S > scores.N ? 'S' : 'N') +
      (scores.T > scores.F ? 'T' : 'F') +
      (scores.J > scores.P ? 'J' : 'P')
    
    // 计算SBTI分数 (社交电池类型指标) - 基于EI和一些其他因素
    const eiScore = scores.E - scores.I
    const sbtiLevel = Math.max(-100, Math.min(100, eiScore * 1.5)) // -100 ~ 100
    let sbtiType = ''
    if (sbtiLevel > 40) sbtiType = '充电型外向者 (Energizer)'
    else if (sbtiLevel > 10) sbtiType = '平衡型社交者 (Balancer)'
    else if (sbtiLevel > -30) sbtiType = '选择性内向者 (Selector)'
    else sbtiType = '深度充电型 (Recharger)'
    
    const result = {
      mbtiType: mbtiType,
      mbtiScores: scores,
      sbtiType: sbtiType,
      sbtiLevel: Math.round(sbtiLevel),
      answers: answers,
      timestamp: new Date().toISOString()
    }
    
    // 保存到全局并跳转到支付页面
    getApp().globalData.testResults = result
    getApp().globalData.hasPaid = false
    
    wx.redirectTo({
      url: '/pages/pay/pay'
    })
  }
})