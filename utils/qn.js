var token = null;
var baseUrl = "https://lives.soulfree.cn"
async function getQnToken() {
    if (!token) {
        return new Promise((resolve, reject) => {
            wx.request({
                url: baseUrl + "/qiniu/getToken",
                method: "GET",
                success(res) {
                    token = res.data
                    resolve(token)
                },
                fail(err) {
                    token = null;
                    reject(err)
                }
            })
        })
    } else {
        return Promise.resolve(token)
    }
}

module.exports = {
    getQnToken,
}