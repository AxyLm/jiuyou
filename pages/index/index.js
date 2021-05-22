// pages/index.js
import { fetch, formaTime } from "../tool"

Page({

    /**
     * 页面的初始数据
     */
    data: {
        lives: [],
        topBanner:null,
        page:1,
        pageSize:10,
        triggered:false,
        scrollStatus:"loading",
        endText:"没有更多了"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const _this = this
        wx.showLoading({
            title:"稍等..."
        })
        setTimeout(()=>{
            wx.hideLoading()
        },3000)
        this.getLives().then(()=>{
            wx.hideLoading()
        }).catch(err=>{
            wx.hideLoading()
        })

        const topbanner = wx.getStorageSync("topbanner")
        if (topbanner) {
            this.setData({
                topBanner:topbanner
            })
        }
        fetch({
            name: "redis",
            data: { key: "topbanner" },
        }).then((res => {
            if (res.code == 200 && res.data.length > 0) {
                if (topbanner != res.data[0].value) {
                    wx.setStorageSync("topbanner", res.data[0].value)
                    this.setData({
                        topBanner:res.data[0].value
                    })
                }
            }
        }))

        wx.getUserInfo({
            desc:"用于头像显示",
            success: function (res) {
                fetch({
                    name: "login",
                    data: {data:res.userInfo},
                })
            }
        })
    },




    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
        this.setData({
            page:1
        })
        this.getLives().then(()=>{
            wx.stopPullDownRefresh()
        }).catch(()=>{
            wx.stopPullDownRefresh()
        })
    },

    pageRefresh:function(e){
        this.setData({
            page:1,
            scrollStatus:"loading"
        })

        this.getLives().then(()=>{
            this.setData({
                triggered:false
            })
        })
    },
    scrolltolower:function(){
        if(this.data.scrollStatus != "end"){

            let page = this.data.page+1
            this.setData({
                page:page
            })
            console.log(page)
            this.getLives()
        }
    },
    scrollTop:function(e){
        console.log(e)
    },
    imageShow:function(e) {
        var {list ,index} = e.target.dataset
        wx.previewMedia({
            sources: list.map(e => {
                return {
                    url: e.url,
                    type: e.showType
                }
            }),
            current: index
        })
    },
    getLives(){
        return new Promise((then,reject)=>{
            wx.showNavigationBarLoading()
            const {page,pageSize} = this.data
            fetch({
                name: "lives",
                data: {
                    page:page,
                    pageSize:pageSize
                },
            }).then(resolve => {
                wx.hideLoading()
                wx.hideNavigationBarLoading()
                if(resolve.code == 200){
                    let list = []
                    resolve.data.forEach(element => {
                        return element.createTimes = formaTime( new Date(element.createTime).getTime())
                    })
                    if(this.data.page != 1){
                        list = this.data.lives
                        if(resolve.data.length != this.data.pageSize){
                            this.setData({
                                scrollStatus:"end"
                            })
                        }
                    }
                    list = list.concat(resolve.data)
                    this.setData({
                        lives: list
                    })
                    then(resolve)
                }
            }).catch((err)=>{
                wx.hideLoading()
                wx.hideNavigationBarLoading()
                console.log(err)
                reject(err)
            })
        })
    },
})