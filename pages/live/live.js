// pages/live/live.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: "",
    autoSizeConfig: {
      maxHeight: 300,
      minHeight: 100
    },
    fileList: [],
  },
  afterRead(event) {
    console.log(event);
    const { file } = event.detail;
    const _this = this
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    wx.uploadFile({
      url: 'https://upload-z1.qiniup.com/', // 仅为示例，非真实的接口地址
      filePath: file[0].url,
      name: 'file',
      formData: { token: 'tZnU5NJbQsOrBVzODD2kzmTRl-e2nwKKCC2Z415o:-kU-fJoiKPDhQm4xX3M4qyWGmFU=:eyJzY29wZSI6Im15bGl2aW5nIiwiZGVhZGxpbmUiOjE2MjM5NDI1MDR9' },
      success(res) {
        const data = JSON.parse(res.data)
        // 上传完成需要更新 fileList
        console.log(this.data)
        let fileList = []
        fileList.push({ ...file, url: "https://qn.soulfree.cn/"+data.key });
        _this.setData({ fileList });
      },
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const footagePath = encodeURI("//video/0628.mp4")
    wx.navigateTo({
      url: '/pages/video/show/index?id=b00064a760dc6fd523e9d18546f2a530',
      // url: '/pages/video/show/index?footagePath='+footagePath,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})