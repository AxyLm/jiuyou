import { fetch, wxUpload } from "../../tool"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        content: "",
        title: null,
        fileList: [],
        chooseInfo: {},
        videoInfo: {},
        showVideoHeight: 300,
        uploadInfo: {}
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
        fetch({
            name: "videoShare",
            data: { action:"insert",id: "28ee4e3e60db0fc826410e0461b263ca" },
        })
        const { tempFilePath } = this.data.chooseInfo
        wxUpload( tempFilePath ).then(data => {
            this.setData({ uploadInfo: data })
        })
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
                    success(e) {
                        var { width, height } = e
                        // if (e.orientation.indexOf("left") > -1 || e.orientation.indexOf("right") > -1) {
                        //     width = e.height
                        //     height = e.width
                        // }
                        that.setData({
                            videoInfo: e,
                            showVideoHeight: parseFloat((height / (width / 750)).toFixed(2))
                        })
                        console.log(e);
                    }
                })
            }
        })
    },
    afterRead(event) {
        wxUpload(event.detail.file.url).then(data => {
            console.log(data);
            // 上传完成需要更新 fileList
            let fileList = []
            fileList.push({ ...event.detail.file, qnUrl: "https://qn.soulfree.cn/"+data.key });
            this.setData({ fileList });
            console.log(this.data.fileList);
        }).catch(err => {
            console.log(err);
            this.afterRead(event)
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