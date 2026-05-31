/**
 * MBTI / SBTI 计算逻辑
 *
 * 输入：answers，结构形如：
 *   {
 *     [questionId]: { optionId, score, dimension }
 *   }
 *   - score > 0 计入维度的"前一个字母"（E / S / T / J）
 *   - score < 0 计入维度的"后一个字母"（I / N / F / P）
 * 输出：{
 *   mbtiType: 'INTJ',
 *   mbtiScores: { E, I, S, N, T, F, J, P },
 *   sbtiLevel: -100..100,
 *   sbtiType: '...',
 * }
 */

const DIM_PAIRS = {
  EI: ['E', 'I'],
  SN: ['S', 'N'],
  TF: ['T', 'F'],
  JP: ['J', 'P']
}

function emptyScores () {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
}

function calculateScores (answers) {
  const scores = emptyScores()
  Object.keys(answers || {}).forEach(qid => {
    const ans = answers[qid]
    if (!ans || !ans.dimension || !DIM_PAIRS[ans.dimension]) return
    const [pos, neg] = DIM_PAIRS[ans.dimension]
    if (ans.score > 0) scores[pos] += ans.score
    else if (ans.score < 0) scores[neg] += Math.abs(ans.score)
  })
  return scores
}

function determineMBTI (scores) {
  return (
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P')
  )
}

function clamp (val, min, max) {
  return Math.max(min, Math.min(max, val))
}

function calculateSBTILevel (scores, answers) {
  // 优先使用独立的 SB 维度得分（SBTI 专用题库）
  let sbScore = 0
  let sbCount = 0
  if (answers) {
    Object.keys(answers).forEach(qid => {
      const ans = answers[qid]
      if (ans && ans.dimension === 'SB') {
        sbScore += ans.score
        sbCount++
      }
    })
  }
  if (sbCount > 0) {
    // SB 维度：正分 = 充电型外向，负分 = 深度内向
    // 7题满分 5+4+5+4+5+4+3 = 30，映射到 -100~100
    return Math.round(clamp(sbScore * (100 / 30), -100, 100))
  }
  // 兼容旧版：用 EI 差值
  const eiScore = scores.E - scores.I
  return Math.round(clamp(eiScore * 1.5, -100, 100))
}

function getSBTIType (level) {
  if (level > 40) return '充电型外向者 (Energizer)'
  if (level > 10) return '平衡型社交者 (Balancer)'
  if (level > -30) return '选择性内向者 (Selector)'
  return '深度充电型 (Recharger)'
}

/**
 * 计算每个维度的置信度（0~100）
 * 置信度 = |正分 - 负分| / (正分 + 负分) * 100
 * 低于阈值说明该维度倾向不明显
 */
function calculateMBTIConfidence (scores) {
  const WEAK_THRESHOLD = 25
  const dims = ['EI', 'SN', 'TF', 'JP']
  const result = dims.map(dim => {
    const [pos, neg] = DIM_PAIRS[dim]
    const total = scores[pos] + scores[neg]
    if (total === 0) return { dim, confidence: 0, weak: true }
    const confidence = Math.round(Math.abs(scores[pos] - scores[neg]) / total * 100)
    return { dim, confidence, weak: confidence < WEAK_THRESHOLD }
  })
  return result
}

function calculate (answers) {
  const scores = calculateScores(answers)
  const mbtiType = determineMBTI(scores)
  const sbtiLevel = calculateSBTILevel(scores, answers)
  const sbtiType = getSBTIType(sbtiLevel)
  const confidence = calculateMBTIConfidence(scores)
  return {
    mbtiType,
    mbtiScores: scores,
    sbtiType,
    sbtiLevel,
    confidence
  }
}

module.exports = {
  calculate,
  calculateScores,
  determineMBTI,
  calculateSBTILevel,
  getSBTIType,
  calculateMBTIConfidence
}
