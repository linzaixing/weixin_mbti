const versionInfo = require('./utils/version.js')

App({
  onLaunch: function () {
    console.log('小程序启动 v' + versionInfo.version)
  },
  globalData: {
    userInfo: null,
    testResults: null,
    version: versionInfo.version,
    changelog: versionInfo.changelog
  }
})
