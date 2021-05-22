

const cloud = require("wx-server-sdk");
cloud.init({ env: "lives-1grzxd6l364d3b9b" });
const db = cloud.database();
const collection = db.collection("users");

const addUser = (OPENID, userInfo) => {
  return new Promise((resolve, reject) => {
    findOne(OPENID).then(users => {
      var now = (new Date()).getTime()
      if (!users || !users.createTime) {
        userInfo.createTime = now
      } else {
        userInfo.createTime = users.createTime
      }
      userInfo.loginTime = now
      

      collection
        .doc(OPENID)
        .set({ data: userInfo })
        .then(res => {
          console.log(res)
          resolve(userInfo)
        })
        .catch((err) => {
          reject(err);
        });
    })
  });
};

const findOne = (OPENID) => {
  return new Promise((resolve, reject) => {
    collection.doc(OPENID).get().then(res => {
      if (res) {
        resolve(res.data)
      } else {
        resolve(null)
      }
    }).catch(err => {
      resolve(null)
    })
  })

}
exports.main = async (event, context) => {
  console.log(event)
      
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();
  // console.log(OPENID, APPID, UNIONID, event,context)

  try {
    await addUser(OPENID, event.data);
    return {
      code: 200,
      msg: "登陆成功",
      data: { openId: OPENID, userInfo: event.data },
    };
  } catch (err) {
    console.info(err)
    return { code: 500, msg: "服务器错误！", err };
  }
};