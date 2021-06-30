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

async function wxUpload(fileUrl) {
    var tokens = await getQnToken()
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: 'https://upload-z1.qiniup.com/', // 仅为示例，非真实的接口地址
            filePath: fileUrl,
            name: 'file',
            formData: { token: tokens },
            success(res) {
                const data = JSON.parse(res.data)
                console.log(res);
                if (data.key) {
                    resolve(data)
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