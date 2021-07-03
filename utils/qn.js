import { randomStr } from "./util"
import moment from "moment"
var token = wx.getStorageSync('qnToken');
var baseUrl = "https://lives.soulfree.cn"
async function getQnToken() {
    if (!token) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: baseUrl + "/qiniu/getToken",
                method: "GET",
                success(res) {
                    token = res.data.data
                    wx.setStorageSync('qnToken', token)
                    resolve(token)
                },
                fail(err) {
                    wx.removeStorageSync('qnToken')
                    token = null;
                    reject(err)
                }
            })
        })
    } else {
        return token
    }
}

async function wxUpload(fileUrl, prefix) {
    if (!prefix) { prefix = "" }
    let suffix = ""
    try {
        if (fileUrl.indexOf(".") > -1) {
            suffix = fileUrl.split(".")
            suffix = "." + suffix[suffix.length - 1]
        }
    } catch (error) {
        suffix = ""
    }
    var tokens = await getQnToken()
    var fileName = randomStr({
        upper: true
    })
    let uploadTime = new Date()
    fileName += "_" + moment(uploadTime).format("YYMMDD_HHmm")
    let fKey = "wxs_cloud/" + prefix + fileName + suffix
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: 'https://upload-z1.qiniup.com/', // 仅为示例，非真实的接口地址
            filePath: fileUrl,
            name: 'file',
            formData: {
                token: tokens,
                key: fKey,
                fname: fKey
            },
            success(res) {
                const data = JSON.parse(res.data)
                console.log(res);
                if (data.key) {
                    resolve({
                        ...data,
                        fileId: fileName,
                        fileUrl: "https://qn.soulfree.cn/" + fKey,
                        uploadTime: moment(uploadTime).format("YYYY-MM-DD HH:mm:ss")
                    })
                } else {
                    token = null
                    reject(data)
                }
            },
            fail(err) {
                token = null
                reject(err)
            }
        });
    })
}

module.exports = {
    getQnToken,
    wxUpload
}