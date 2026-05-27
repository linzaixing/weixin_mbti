# 微信小程序 - MBTI 性格测试

一款"MBTI 16 型 + SBTI 社交电池"性格分析的微信小程序，包含完整的题库、计算逻辑、付费解锁与分析报告。

## 功能特性

- 28 道精心设计的测试题，覆盖 EI / SN / TF / JP 四个维度
- 计算 MBTI 16 型 + SBTI 社交电池等级（-100 ~ 100）
- 付费解锁完整报告（默认 ¥0.99，开发阶段使用模拟支付）
- 详尽的报告内容：
  - 类型概述、出现频率、口号
  - 核心优势 / 可能挑战
  - 认知思维模式（主导功能简介）
  - SBTI 社交电池分析（适合场景 / 警惕场景 / 建议）
  - 关系与亲密相处建议
  - 适合的职业方向
  - 自我成长建议
  - 同类型名人 / 角色

## 项目结构

```
weixin_mbti/
├── app.js / app.json / app.wxss           小程序全局配置与样式
├── sitemap.json                           站点地图
├── project.config.json                    微信开发者工具配置
├── pages/
│   ├── index/                             首页（介绍 + 入口）
│   ├── test/                              答题页
│   ├── pay/                               支付解锁页
│   └── result/                            报告页
├── utils/
│   ├── calculator.js                      MBTI / SBTI 计算逻辑
│   └── personalityData.js                 16 型详尽数据 + 报告组装
├── test/
│   └── calculator.test.js                 计算逻辑与数据完整性单元测试
├── package.json
└── README.md
```

## 算法说明

每道题的两个选项分别给出一个 `score`（正负），正分计入维度的"前一个字母"（E/S/T/J），负分计入"后一个字母"（I/N/F/P）。最终把 4 个维度上更高的字母拼接，得到 MBTI 类型。

SBTI 社交电池等级 = `clamp((E - I) * 1.5, -100, 100)`，并按下列阈值分类：

| 等级范围 | 分类 |
| --- | --- |
| `(40, 100]` | 充电型外向者 (Energizer) |
| `(10, 40]` | 平衡型社交者 (Balancer) |
| `(-30, 10]` | 选择性内向者 (Selector) |
| `[-100, -30]` | 深度充电型 (Recharger) |

## 运行测试

项目自带纯 Node.js 单元测试，无需任何依赖：

```bash
npm test
```

或直接：

```bash
node test/calculator.test.js
```

测试覆盖：

- MBTI 计算逻辑（全选 A、全选 B、混合选择、缺失题、未知维度）
- SBTI 等级钳制与四档分类边界
- 16 型报告数据完整性（typeName / slogan / 描述 / 优势 / 劣势 / 职业 / 成长 / 名人 / 关系 / 认知）
- 端到端模拟：答题 → 计算 → 报告

## 在微信开发者工具中运行

1. 打开"微信开发者工具" → 导入项目，选择本目录
2. 使用 `project.config.json` 中已配置的 `appid`，或替换为你自己的 AppID
3. 点击"编译"即可在模拟器中查看
4. 真机预览前请在 `pages/pay/pay.js` 中将 `makePayment` 替换为 `realPayment`，并填入真实的 `wx.requestPayment` 参数

## 开发要点

- **WXML 不能直接调用 Page 方法或 JS 内置函数**：所有派生数据已在 `result.js` 的 `onLoad` 中通过 `setData({ report })` 预计算，再在 WXML 中直接读取字段，避免渲染异常
- 测试结果通过 `getApp().globalData.testResults` 在页面间传递，刷新或重启会丢失，符合一次性测试场景
- 解锁状态存于 `getApp().globalData.hasPaid`，未付费访问 `result` 会自动跳回 `pay`
