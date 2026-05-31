/**
 * 计算逻辑单元测试 —— 纯 Node.js 运行：
 *   node test/calculator.test.js
 *
 * 不依赖第三方测试框架，只用断言。
 */

const assert = require('assert')
const path = require('path')

const {
  calculate,
  calculateScores,
  determineMBTI,
  calculateSBTILevel,
  getSBTIType
} = require(path.join('..', 'utils', 'calculator.js'))

const { buildReport, getSBTIByLevel } = require(path.join('..', 'utils', 'personalityData.js'))

let passed = 0
let failed = 0

function test (name, fn) {
  try {
    fn()
    passed++
    console.log('  \u2713', name)
  } catch (err) {
    failed++
    console.error('  \u2717', name)
    console.error('    ', err.message)
  }
}

function describe (label, fn) {
  console.log('\n' + label)
  fn()
}

// 构造一组应答的辅助函数：
// 给定每个维度选 A/B 的标记，返回类似 test.js 中存储的 answers 对象
function buildAnswers (pickEI, pickSN, pickTF, pickJP) {
  // 与 pages/test/test.js 中的题目结构保持一致
  const config = {
    EI: [{ id: 1, A: 5 }, { id: 2, A: 4 }, { id: 3, A: 5 }, { id: 4, A: 4 }, { id: 5, A: 3 }, { id: 6, A: 5 }, { id: 7, A: 4 }],
    SN: [{ id: 8, A: 5 }, { id: 9, A: 4 }, { id: 10, A: 5 }, { id: 11, A: 4 }, { id: 12, A: 5 }, { id: 13, A: 4 }, { id: 14, A: 3 }],
    TF: [{ id: 15, A: 5 }, { id: 16, A: 4 }, { id: 17, A: 5 }, { id: 18, A: 4 }, { id: 19, A: 3 }, { id: 20, A: 4 }, { id: 21, A: 5 }],
    JP: [{ id: 22, A: 5 }, { id: 23, A: 4 }, { id: 24, A: 5 }, { id: 25, A: 4 }, { id: 26, A: 3 }, { id: 27, A: 5 }, { id: 28, A: 4 }]
  }

  const answers = {}
  Object.keys(config).forEach(dim => {
    let picks
    if (dim === 'EI') picks = pickEI
    else if (dim === 'SN') picks = pickSN
    else if (dim === 'TF') picks = pickTF
    else picks = pickJP
    config[dim].forEach((q, idx) => {
      const choose = picks[idx] // 'A' 或 'B'
      const score = choose === 'A' ? q.A : -q.A
      answers[q.id] = {
        optionId: choose,
        score,
        dimension: dim
      }
    })
  })
  return answers
}

const allA = ['A', 'A', 'A', 'A', 'A', 'A', 'A']
const allB = ['B', 'B', 'B', 'B', 'B', 'B', 'B']

describe('calculateScores / determineMBTI 基础算法', () => {
  test('全选 A 应得到 ESTJ', () => {
    const answers = buildAnswers(allA, allA, allA, allA)
    const result = calculate(answers)
    assert.strictEqual(result.mbtiType, 'ESTJ')
    // E 维度满分 = 5+4+5+4+3+5+4 = 30
    assert.strictEqual(result.mbtiScores.E, 30)
    assert.strictEqual(result.mbtiScores.I, 0)
  })

  test('全选 B 应得到 INFP', () => {
    const answers = buildAnswers(allB, allB, allB, allB)
    const result = calculate(answers)
    assert.strictEqual(result.mbtiType, 'INFP')
    assert.strictEqual(result.mbtiScores.E, 0)
    assert.strictEqual(result.mbtiScores.I, 30)
  })

  test('混合选择 - INTJ', () => {
    // I（全 B）+ N（全 B）+ T（全 A）+ J（全 A）→ INTJ
    const answers = buildAnswers(allB, allB, allA, allA)
    const result = calculate(answers)
    assert.strictEqual(result.mbtiType, 'INTJ')
  })

  test('混合选择 - ENFP', () => {
    const answers = buildAnswers(allA, allB, allB, allB)
    const result = calculate(answers)
    assert.strictEqual(result.mbtiType, 'ENFP')
  })

  test('部分题数答题，缺失题不计分', () => {
    const answers = {
      1: { optionId: 'A', score: 5, dimension: 'EI' },
      8: { optionId: 'B', score: -4, dimension: 'SN' }
    }
    const scores = calculateScores(answers)
    assert.strictEqual(scores.E, 5)
    assert.strictEqual(scores.N, 4)
    assert.strictEqual(scores.S, 0)
  })

  test('未知维度被忽略', () => {
    const answers = {
      1: { optionId: 'A', score: 5, dimension: 'XX' }
    }
    const scores = calculateScores(answers)
    Object.keys(scores).forEach(k => assert.strictEqual(scores[k], 0))
  })

  test('determineMBTI 在维度持平时优先选第一个字母', () => {
    const tied = { E: 5, I: 5, S: 5, N: 5, T: 5, F: 5, J: 5, P: 5 }
    assert.strictEqual(determineMBTI(tied), 'ESTJ')
  })
})

describe('calculateSBTILevel / getSBTIType', () => {
  test('全外向得到正向高分 (Energizer)', () => {
    const answers = buildAnswers(allA, allA, allA, allA)
    const { sbtiLevel, sbtiType } = calculate(answers)
    assert.ok(sbtiLevel > 40, 'sbtiLevel 应 > 40，实际 ' + sbtiLevel)
    assert.strictEqual(sbtiType, '充电型外向者 (Energizer)')
  })

  test('全内向得到负向极值 (Recharger)', () => {
    const answers = buildAnswers(allB, allB, allB, allB)
    const { sbtiLevel, sbtiType } = calculate(answers)
    assert.ok(sbtiLevel <= -30, 'sbtiLevel 应 <= -30，实际 ' + sbtiLevel)
    assert.strictEqual(sbtiType, '深度充电型 (Recharger)')
  })

  test('SBTI 等级被钳制在 [-100, 100]', () => {
    const huge = { E: 1000, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
    assert.strictEqual(calculateSBTILevel(huge), 100)

    const tiny = { E: 0, I: 1000, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }
    assert.strictEqual(calculateSBTILevel(tiny), -100)
  })

  test('getSBTIType 边界值', () => {
    assert.strictEqual(getSBTIType(100), '充电型外向者 (Energizer)')
    assert.strictEqual(getSBTIType(41), '充电型外向者 (Energizer)')
    assert.strictEqual(getSBTIType(40), '平衡型社交者 (Balancer)')
    assert.strictEqual(getSBTIType(11), '平衡型社交者 (Balancer)')
    assert.strictEqual(getSBTIType(10), '选择性内向者 (Selector)')
    assert.strictEqual(getSBTIType(-29), '选择性内向者 (Selector)')
    assert.strictEqual(getSBTIType(-30), '深度充电型 (Recharger)')
    assert.strictEqual(getSBTIType(-100), '深度充电型 (Recharger)')
  })
})

describe('personalityData.buildReport 输出完整性', () => {
  const allTypes = [
    'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
    'ISTP', 'ISFP', 'INFP', 'INTP',
    'ESTP', 'ESFP', 'ENFP', 'ENTP',
    'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
  ]

  allTypes.forEach(type => {
    test(`${type} 报告完整生成`, () => {
      const r = buildReport(type, 0)
      assert.strictEqual(r.mbtiType, type)
      assert.ok(r.typeName && r.typeName.length > 0, 'typeName 缺失')
      assert.ok(r.slogan && r.slogan.length > 0, 'slogan 缺失')
      assert.ok(r.description && r.description.length >= 50, 'description 太短')
      assert.ok(Array.isArray(r.strengths) && r.strengths.length >= 3, 'strengths 数量不足')
      assert.ok(Array.isArray(r.weaknesses) && r.weaknesses.length >= 3, 'weaknesses 数量不足')
      assert.ok(Array.isArray(r.careers) && r.careers.length >= 3, 'careers 数量不足')
      assert.ok(Array.isArray(r.growth) && r.growth.length >= 3, 'growth 数量不足')
      assert.ok(Array.isArray(r.famous) && r.famous.length >= 1, 'famous 数量不足')
      assert.ok(r.relationship && r.relationship.length > 0, 'relationship 缺失')
      assert.ok(r.cognitive && r.cognitive.length > 0, 'cognitive 缺失')
      assert.ok(r.sbti && r.sbti.summary, 'sbti 报告缺失')
    })
  })

  test('getSBTIByLevel 返回区间正确', () => {
    assert.strictEqual(getSBTIByLevel(80).name, '充电型外向者 (Energizer)')
    assert.strictEqual(getSBTIByLevel(20).name, '平衡型社交者 (Balancer)')
    assert.strictEqual(getSBTIByLevel(0).name, '选择性内向者 (Selector)')
    assert.strictEqual(getSBTIByLevel(-50).name, '深度充电型 (Recharger)')
  })
})

describe('SBTI 五模型算法', () => {
  const { calculateSBTI, determineSBTICode } = require(path.join('..', 'utils', 'sbtiCalculator.js'))
  const { getSBTIType: getSBTIArchetype } = require(path.join('..', 'utils', 'sbtiTypes.js'))

  test('全选 A → SEACO（全能拿捏者 CTRL）', () => {
    const answers = {}
    // 31题全选 A，dimension 按题号分配 SLF/EMO/ATT/ACT/SOC
    const dims = [
      ...Array(6).fill('SLF'),
      ...Array(6).fill('EMO'),
      ...Array(6).fill('ATT'),
      ...Array(6).fill('ACT'),
      ...Array(7).fill('SOC')
    ]
    dims.forEach((d, i) => {
      answers[201 + i] = { optionId: 'A', score: 5, dimension: d }
    })
    const result = calculateSBTI(answers)
    assert.strictEqual(result.sbtiCode, 'SEACO')
    const arche = getSBTIArchetype(result.sbtiCode)
    assert.strictEqual(arche.code, 'CTRL')
  })

  test('全选 B → seaco（废物 IMFW）', () => {
    const answers = {}
    const dims = [
      ...Array(6).fill('SLF'),
      ...Array(6).fill('EMO'),
      ...Array(6).fill('ATT'),
      ...Array(6).fill('ACT'),
      ...Array(7).fill('SOC')
    ]
    dims.forEach((d, i) => {
      answers[201 + i] = { optionId: 'B', score: -5, dimension: d }
    })
    const result = calculateSBTI(answers)
    assert.strictEqual(result.sbtiCode, 'seaco')
    const arche = getSBTIArchetype(result.sbtiCode)
    assert.strictEqual(arche.code, 'IMFW')
  })

  test('determineSBTICode 在零分时优先选正字母', () => {
    const code = determineSBTICode({ SLF: 0, EMO: 0, ATT: 0, ACT: 0, SOC: 0 })
    assert.strictEqual(code, 'SEACO')
  })

  test('5 模型 levels 输出正确数量与字段', () => {
    const answers = {
      201: { optionId: 'A', score: 5, dimension: 'SLF' },
      207: { optionId: 'A', score: 5, dimension: 'EMO' }
    }
    const result = calculateSBTI(answers)
    assert.strictEqual(result.sbtiLevels.length, 5)
    result.sbtiLevels.forEach(m => {
      assert.ok(m.key && m.name && m.posTrait && m.negTrait)
      assert.ok(typeof m.level === 'number')
      assert.ok(m.level >= -100 && m.level <= 100)
    })
  })

  test('getSBTIType 兜底返回 fallback', () => {
    const fallback = getSBTIArchetype('XXXXX')
    assert.ok(fallback.name && fallback.slogan)
  })

  test('32 种组合都能取到非 fallback 原型', () => {
    const codes = []
    for (let s = 0; s < 2; s++)
      for (let e = 0; e < 2; e++)
        for (let a = 0; a < 2; a++)
          for (let c = 0; c < 2; c++)
            for (let o = 0; o < 2; o++) {
              codes.push(
                (s === 0 ? 'S' : 's') +
                (e === 0 ? 'E' : 'e') +
                (a === 0 ? 'A' : 'a') +
                (c === 0 ? 'C' : 'c') +
                (o === 0 ? 'O' : 'o')
              )
            }
    assert.strictEqual(codes.length, 32)
    codes.forEach(code => {
      const arche = getSBTIArchetype(code)
      assert.ok(arche.code !== 'X', `code ${code} 缺少原型，落入 fallback`)
    })
  })
})

describe('SBTI 题库自检', () => {
  const { sbtiQuestions } = require(path.join('..', 'utils', 'sbtiQuestions.js'))

  test('SBTI 题库共 31 题', () => {
    assert.strictEqual(sbtiQuestions.length, 31)
  })

  test('SBTI 每题维度均合法', () => {
    const valid = ['SLF', 'EMO', 'ATT', 'ACT', 'SOC']
    sbtiQuestions.forEach(q => {
      assert.ok(valid.includes(q.dimension), `题 ${q.id} 维度异常: ${q.dimension}`)
    })
  })

  test('SBTI 题库 5 模型分布合理（每模型 ≥6 题）', () => {
    const counts = { SLF: 0, EMO: 0, ATT: 0, ACT: 0, SOC: 0 }
    sbtiQuestions.forEach(q => { counts[q.dimension]++ })
    Object.values(counts).forEach(n => assert.ok(n >= 6, `模型题数不足: ${n}`))
  })
})

describe('端到端模拟：测试 → 计算 → 报告', () => {
  test('完整 INFP 用户流程', () => {
    const answers = buildAnswers(allB, allB, allB, allB)
    const calc = calculate(answers)
    const report = buildReport(calc.mbtiType, calc.sbtiLevel)
    assert.strictEqual(report.mbtiType, 'INFP')
    assert.ok(report.slogan.length > 0)
    assert.ok(report.sbti.type.includes('Recharger') || report.sbti.type.includes('深度'))
  })

  test('完整 ESTJ 用户流程', () => {
    const answers = buildAnswers(allA, allA, allA, allA)
    const calc = calculate(answers)
    const report = buildReport(calc.mbtiType, calc.sbtiLevel)
    assert.strictEqual(report.mbtiType, 'ESTJ')
    assert.ok(report.sbti.type.includes('Energizer'))
  })
})

console.log('\n----------------------------------------')
console.log(`Total: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`)
console.log('----------------------------------------\n')

if (failed > 0) {
  process.exit(1)
}
