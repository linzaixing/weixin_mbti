/**
 * SBTI（抽象人格）计算器
 *
 * 框架（参考风云智测 SBTI）：
 *  - 5 大模型：SLF / EMO / ATT / ACT / SOC
 *  - 每个模型计算总分，正分 → 第一字母（大写），负分 → 第二字母（小写）
 *  - 最终得到一个 5 字符 code，例如 SeAcO
 *
 * 字母映射：
 *  - SLF: S 自洽稳定 / s 摇摆怀疑
 *  - EMO: E 安全自洽 / e 焦虑黏着
 *  - ATT: A 守序谨慎 / a 冲动随性
 *  - ACT: C 进攻果断 / c 规避拖延
 *  - SOC: O 主动开放 / o 边界封闭
 *
 * code 用于在 sbtiTypes.js 中查找原型描述。
 */

const MODEL_KEYS = ['SLF', 'EMO', 'ATT', 'ACT', 'SOC']

const MODEL_LETTER = {
  SLF: ['S', 's'], // + / -
  EMO: ['E', 'e'],
  ATT: ['A', 'a'],
  ACT: ['C', 'c'],
  SOC: ['O', 'o']
}

const MODEL_NAMES = {
  SLF: '自我模型',
  EMO: '情感模型',
  ATT: '态度模型',
  ACT: '行动模型',
  SOC: '社交模型'
}

const MODEL_TRAIT_NAMES = {
  SLF: { pos: '自洽稳定', neg: '摇摆怀疑' },
  EMO: { pos: '安全自洽', neg: '焦虑黏着' },
  ATT: { pos: '守序谨慎', neg: '冲动随性' },
  ACT: { pos: '进攻果断', neg: '规避拖延' },
  SOC: { pos: '主动开放', neg: '边界封闭' }
}

function emptyScores () {
  return { SLF: 0, EMO: 0, ATT: 0, ACT: 0, SOC: 0 }
}

function calculateSBTIScores (answers) {
  const scores = emptyScores()
  Object.keys(answers || {}).forEach(qid => {
    const ans = answers[qid]
    if (!ans || !ans.dimension || !MODEL_KEYS.includes(ans.dimension)) return
    scores[ans.dimension] += ans.score
  })
  return scores
}

function determineSBTICode (scores) {
  return MODEL_KEYS.map(key => {
    const [pos, neg] = MODEL_LETTER[key]
    return scores[key] >= 0 ? pos : neg
  }).join('')
}

/**
 * 把每个模型的得分归一化到 -100 ~ 100，方便可视化进度条。
 * 每个模型最多 6-7 题，每题最高 5 分，假设单模型理论极值约 ±30，按 30 缩放并夹紧。
 */
function modelLevels (scores) {
  const SCALE = 30
  return MODEL_KEYS.map(key => {
    const raw = scores[key] || 0
    const normalized = Math.max(-100, Math.min(100, Math.round((raw / SCALE) * 100)))
    const [posLetter, negLetter] = MODEL_LETTER[key]
    const traits = MODEL_TRAIT_NAMES[key]
    return {
      key,
      name: MODEL_NAMES[key],
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

/**
 * 计算每个模型的置信度（0~100）
 */
function calculateSBTIConfidence (scores) {
  const WEAK_THRESHOLD = 25
  const SCALE = 30
  return MODEL_KEYS.map(key => {
    const raw = Math.abs(scores[key] || 0)
    const confidence = Math.min(100, Math.round((raw / SCALE) * 100))
    return { dim: key, name: MODEL_NAMES[key], confidence, weak: confidence < WEAK_THRESHOLD }
  })
}

function calculateSBTI (answers) {
  const scores = calculateSBTIScores(answers)
  const code = determineSBTICode(scores)
  const levels = modelLevels(scores)
  const confidence = calculateSBTIConfidence(scores)
  return {
    sbtiCode: code,
    sbtiScores: scores,
    sbtiLevels: levels,
    confidence
  }
}

module.exports = {
  calculateSBTI,
  calculateSBTIScores,
  determineSBTICode,
  modelLevels,
  calculateSBTIConfidence,
  MODEL_KEYS,
  MODEL_NAMES,
  MODEL_LETTER,
  MODEL_TRAIT_NAMES
}
