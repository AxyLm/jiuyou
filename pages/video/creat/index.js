import { fetch, wxUpload } from "../../tool"

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
        const { tempFilePath,thumbTempFilePath } = this.data.chooseInfo

        wxUpload(tempFilePath).then(res => {
            console.log(res);

            const { videoInfo, baseUrl } = this.data
            fetch({
                name: "videoShare",
                data: {
                    action: "insert",
                    param: {
                        ...videoInfo,
                        hash:res.hash,
                        fileUrl: baseUrl + "/video/wxs_cloud/" +res.key,
                        thumbImageUrl: null
                    }
                },
            }).then(res => {

                wx.showToast({
                    title: '成功',
                    icon: 'success',
                    duration: 2000
                  })
                console.log(res);
            }).catch(err => {
                console.log(err);
            })

        })

        // wxUpload( tempFilePath ).then(data => {
        //     this.setData({ uploadInfo: data })

        //     const { videoInfo, baseUrl } = this.data
        //     fetch({
        //         name: "videoShare",
        //         data: {
        //             action: "insert",
        //             param: {
        //                 ...videoInfo,
        //                 fileUrl: baseUrl + data.key,
        //                 thumbImage: baseUrl + 
        //             }
        //         },
        //     }).then(res => {
        //         console.log(res);
        //     }).catch(err => {
        //         console.log(err);
        //     })
        // })
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