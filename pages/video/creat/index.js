import { fetch, wxUpload, randomStr } from "../../tool"
import moment from "moment"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: "",
        title: null,
        chooseInfo: {},
        videoInfo: {},
        showVideoHeight: 300,
        uploadInfo: {},
        baseUrl: "https://qn.soulfree.cn"
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    uploadVideo() {
        wx.showLoading({
          title: '上传中...',
        })
        const { tempFilePath,thumbTempFilePath } = this.data.chooseInfo
        wxUpload(tempFilePath,"video/").then(res => {
            const { videoInfo, baseUrl } = this.data
            delete videoInfo.errMsg
            fetch({
                name: "videoShare",
                data: {
                    action: "insert",
                    param: {
                        ...videoInfo,
                        ...res,
                        thumbImageUrl: null
                    }
                },
            }).then(res => {
                wx.hideLoading()
                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                })
                wx.navigateTo({
                    url: '/pages/video/show/index?id='+res._id,
                })
                console.log(res);
            }).catch(err => {
                wx.showToast({
                    title: '网络异常',
                    icon: 'error',
                    duration: 2000
                })
                wx.hideLoading()
                console.log(err);
            })

        })
    },
    creatRandomStr() {
        let str = randomStr({
            randomLength: 6,
            upper: true
        })
        str += "_" + moment().format("YYMMDD_HHmm")
        return str
    },
    clearInfo() {
        this.setData({
            fileList: [],
            chooseInfo: {},
            videoInfo: {},
            uploadInfo: {},
            showVideoHeight: 300
        })
    },
    chooseVideo() {
        const that = this
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            compressed: false,
            maxDuration: 60,
            camera: 'back',
            success(res) {
                that.setData({
                    chooseInfo:res
                })
                wx.getVideoInfo({
                    src: res.tempFilePath,
                    success(info) {
                        console.log(info);
                        var { width, height } = info
                        // if (e.orientation.indexOf("left") > -1 || e.orientation.indexOf("right") > -1) {
                        //     width = e.height
                        //     height = e.width
                        // }
                        that.setData({
                            videoInfo: info,
                            showVideoHeight: parseFloat((height / (width / 750)).toFixed(2))
                        })
                    },
                    complete(end){
                        console.log(end)
                    }
                })
            }
        })
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