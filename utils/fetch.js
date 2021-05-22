
function fetch(params) {
  return new Promise((resolve, reject) => {
    const { name, data } = params;
    wx.cloud.callFunction({
      name, data,
      success: (res) => {
        resolve(res.result);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
module.exports={
  fetch,
}