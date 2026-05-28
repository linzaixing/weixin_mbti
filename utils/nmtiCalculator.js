/**
 * NMTI（职场牛马）计算器
 *
 * 4 维度：
 *   MJ: M(摸鱼) / J(内卷)  — score > 0 → M，< 0 → J
 *   DH: D(独狼) / H(合群)  — score > 0 → D，< 0 → H
 *   RG: R(忍者) / G(刚哥)  — score > 0 → R，< 0 → G
 *   WP: W(稳坐) / P(跑路)  — score > 0 → W，< 0 → P
 *
 * 输出 4 字母 code（如 MDRW），用于在 nmtiTypes.js 中查找原型。
 */

const DIM_KEYS = ['MJ', 'DH', 'RG', 'WP']

const DIM_PAIRS = {
  MJ: ['M', 'J'],
  DH: ['D', 'H'],
  RG: ['R', 'G'],
  WP: ['W', 'P']
}

const DIM_NAMES = {
  MJ: '工作强度',
  DH: '协作方式',
  RG: '冲突处理',
  WP: '职业流动'
}

const DIM_TRAIT_NAMES = {
  MJ: { pos: '摸鱼', neg: '内卷' },
  DH: { pos: '独狼', neg: '合群' },
  RG: { pos: '忍者', neg: '刚哥' },
  WP: { pos: '稳坐', neg: '跑路' }
}

function emptyScores () {
  return { MJ: 0, DH: 0, RG: 0, WP: 0 }
}

function calculateNMTIScores (answers) {
  const scores = emptyScores()
  Object.keys(answers || {}).forEach(qid => {
    const ans = answers[qid]
    if (!ans || !ans.dimension || !DIM_KEYS.includes(ans.dimension)) return
    scores[ans.dimension] += ans.score
  })
  return scores
}

function determineNMTICode (scores) {
  return DIM_KEYS.map(key => {
    const [pos, neg] = DIM_PAIRS[key]
    return scores[key] >= 0 ? pos : neg
  }).join('')
}

/**
 * 归一化到 -100 ~ 100，每维度 7 题理论极值约 ±30。
 */
function dimLevels (scores) {
  const SCALE = 30
  return DIM_KEYS.map(key => {
    const raw = scores[key] || 0
    const normalized = Math.max(-100, Math.min(100, Math.round((raw / SCALE) * 100)))
    const [posLetter, negLetter] = DIM_PAIRS[key]
    const traits = DIM_TRAIT_NAMES[key]
    return {
      key,
      name: DIM_NAMES[key],
      raw,
      level: normalized,
      letter: normalized >= 0 ? posLetter : negLetter,
      polarity: normalized >= 0 ? 'pos' : 'neg',
      posLetter,
      negLetter,
      posTrait: traits.pos,
      negTrait: traits.neg
    }
  })
}

function calculateNMTI (answers) {
  const scores = calculateNMTIScores(answers)
  const code = determineNMTICode(scores)
  const levels = dimLevels(scores)
  return {
    nmtiCode: code,
    nmtiScores: scores,
    nmtiLevels: levels
  }
}

module.exports = {
  calculateNMTI,
  calculateNMTIScores,
  determineNMTICode,
  dimLevels,
  DIM_KEYS,
  DIM_NAMES,
  DIM_PAIRS,
  DIM_TRAIT_NAMES
}
