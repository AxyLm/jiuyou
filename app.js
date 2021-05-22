// app.js
import { fech } from "./utils/fetch"
App({
  globalData:{
    sessionCode:"",
    openid:"",
    userInfo: {
      avatarUrl: "",
      nickName: "未登录",
      code: "",
      username:"",
      phoneNumber:""
    },
  },
  onLaunch() {
    this.networkManage(); //调用监听网络状态的方法
    this.updateManage(); //调用检测小程序版本更新的方法

    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        env: "lives-1grzxd6l364d3b9b", // 修改成云开发控制台里复制过来的自己的环境ID，
        traceUser: true,
      });
    }
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    wx.checkSession({
      success() { },
      fail() {
        wx.login() //重新登录
      }

    })
  },
  networkManage() {
    var that = this;
    //监听网络状态
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        that.msg('网络似乎不太顺畅');
      }
    })
  },
  //---------------------------------------------检测小程序版本更新
  updateManage() {
    var that = this;
    var updateManager = wx.getUpdateManager()
    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate)
      if (!res.hasUpdate) {
      }
    })
    // 监听新版本下载成功
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          } else {
            that.updateManage();
          }
        }
      })
    })
    // 监听新版本下载失败
    updateManager.onUpdateFailed(function () {
      app.showModal({
        content: '新版本更新失败，是否重试？',
        confirmText: '重试',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      });
    })
  },//--------end
  globalData: {
    userInfo: null
  }
})
