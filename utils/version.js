/**
 * 全局版本号 & 更新日志 —— 项目唯一硬编码处
 *
 * 升级版本时只做两件事：
 *   1. 修改下方 version 字段为新版本号
 *   2. 在 changelog 数组最前面追加一条新版本记录（最新版置顶）
 *
 * 首页顶部的「v1.x.x」徽章点击后，会弹出本文件中的 changelog。
 *
 * 数据结构：
 *   {
 *     version: string,            // 当前版本号
 *     changelog: Array<{
 *       version: string,          // 版本号
 *       date:    string,          // 发布日期 YYYY-MM-DD
 *       title?:  string,          // 可选：版本主题，如 "审核合规版"
 *       changes: string[]         // 本次更新明细
 *     }>
 *   }
 *
 * 备注：
 *   - 微信开发者工具上传时填写的「版本号」由微信后台维护，
 *     与本文件相互独立，建议保持一致以便追踪。
 *   - package.json 的 version 是 npm 元数据，与小程序运行无关。
 */
const VERSION_INFO = {
  version: '1.7.1',
  changelog: [
    {
      version: '1.7.1',
      date: '2026-06-03',
      title: '审核合规版',
      changes: [
        "优化性格小人形象",
        "新增默认emoji头像和昵称",
        '修复报告页无法保存截图的问题',
        '修复点击重新测试后无反应的问题',
      ]
    }
  ]
}

module.exports = VERSION_INFO
