// pages/videoPlay/index.js
import { fetch, formaTime } from "../../tool"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mediaUrl: null,
        videoInfo: null,
        loadStatus: "loading",
        showShare: false,
        loadType: null,
        baseUrl: "https://qn.soulfree.cn",
        options: [
        [
            { name: '微信', icon: 'wechat' },
            { name: '微博', icon: 'weibo' },
            { name: 'QQ', icon: 'qq' },
        ],
        [
            { name: '复制链接', icon: 'link' },
            { name: '分享海报', icon: 'poster' },
            { name: '二维码', icon: 'qrcode' },
        ],
        ],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (option) {
        console.log(option);
        if (option.id) {
            fetch({
                name: "videoShare",
                data: { action:"getVideo", id: option.id },
            }).then(res => {
                console.log(res);
                if (res.code == 200 ) {
                    this.setData({
                        videoInfo: res.data,
                    })
                    this.update("success")
                    // this.videoContext = wx.createVideoContext('myVideo')
                    // setTimeout(() => {
                    //     this.videoContext.requestFullScreen()
                    // }, 300);
                } else {
                    this.update("empty")
                }
            }).catch(err => {
                this.update("empty")
                console.log(err);
            })
        }
        // else if (option.footagePath) {
        //     this.setData({
        //         mediaUrl: "https://qn.soulfree.cn" + decodeURI(option.footagePath),
        //     })
        //     this.setData({
        //         loadType: "video"
        //     })
        //     this.videoContext = wx.createVideoContext('myVideo')
        //     this.videoContext.requestFullScreen()
        //     this.update("success")
        // } else {
        //     this.update("empty")
        // }
    },
    videoErr: function (e) {
        this.setData({
            loadType: "image"
        })
        console.log(e);
    },
    update: function (status) {
        if (status == "success") {
            setTimeout(() => {
                this.setData({
                    loadStatus: "success"
                })
            }, 200);
            return false
        } else {
            this.setData({
                loadStatus: status || "empty"
            })
        }
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.setBackgroundColor({
            backgroundColor: '#010001',
        })
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
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
    onShareAppMessage: function (option) {
        console.log(option);
        const { showType,url } = this.data.mediaInfo
        return {
            title: "img",
            path: "/pages/videoPlay/index",
            imageUrl: showType === "image"?url:""
        };
    }
})