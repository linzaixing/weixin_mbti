/**
 * 全局配置
 *
 * 真实微信支付集成说明：
 * ----------------------------------------------
 * 微信小程序支付需要后端提供两个能力：
 *   1) 接收前端订单请求 → 调用微信"统一下单"接口 → 返回 prepay_id 与签名
 *   2) 验证回调（支付结果通知）
 * 前端只需把后端返回的 5 个字段传给 wx.requestPayment 即可拉起付款界面。
 *
 * 部署步骤：
 *   1) 在微信支付商户平台开通"小程序支付"，与 appid 绑定
 *   2) 部署一个支持 HTTPS 的后端（Node/Java/Go 等都可以）
 *   3) 暴露 POST /api/pay/create 接口：入参 { productId, openid }，
 *      内部调 https://api.mch.weixin.qq.com/v3/pay/transactions/jsapi
 *      返回前端 { timeStamp, nonceStr, package, signType, paySign, orderNo }
 *   4) 把下面的 BACKEND_BASE_URL 替换为你的真实后端域名
 *   5) 在小程序后台「开发设置 → 服务器域名 → request 合法域名」加入该域名
 */
const PAY_CONFIG = {
  // 是否启用真实微信支付（true=真实支付，false=本地演示模式）
  // 微信审核期间统一关闭，所有付费入口已在前端断开
  ENABLED: false,

  // 后端 API 基地址，例如 https://api.your-domain.com
  BACKEND_BASE_URL: 'https://api.your-domain.com',

  // 创建订单接口路径
  CREATE_ORDER_PATH: '/api/pay/create',

  // 商品列表
  PRODUCTS: {
    fullReport: {
      id: 'full_report_v1',
      name: 'MBTI/SBTI 完整性格报告',
      price: 1.99 // 元
    }
  }
}

module.exports = { PAY_CONFIG }
