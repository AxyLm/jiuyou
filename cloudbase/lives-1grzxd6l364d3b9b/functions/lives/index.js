// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "lives-1grzxd6l364d3b9b" });
const db = cloud.database();
const collection = db.collection("lives");
const $ = db.command.aggregate
const _ = db.command

const findLives = function (param) {
    var pageSize,page;
    if(param){
        page = param.page || 1
        pageSize = param.pageSize || 10
    }else{
        page = 1;
        pageSize = 10;
    }
    page = (page - 1) * pageSize
    return new Promise((resolve, reject) => {
        collection.aggregate().sort({
            createTime:-1
        }).skip(page).limit(pageSize).lookup({
            from: "footages",
            let:{
              footages:"$footages",
              source:"$source",
              tripEndTime:"$tripEndTime",
            },
            pipeline: $.pipeline().match(
              _.expr($.in(["$_id","$$footages"])))
            .sort({
              sort:1
            }).done(),
            as: "footageList"
          }).project({
            footages: 0
          }).sort({
            createTime:-1
          }).end().then(res => {
            resolve({data:res.list,page:param.page,pageSize:param.pageSize})
        }).catch(err => {
            reject(err)
        })
    })

}

// 云函数入口函数
exports.main = async (event, context) => {
    const lives = await findLives(event);
    return {
        code: 200,
        data: lives.data,
        page:lives.pgae || 1,
        pageSize:lives.pageSize || 10,
    }

    // {
    //     event,
    //     openid: wxContext.OPENID,
    //     appid: wxContext.APPID,
    //     unionid: wxContext.UNIONID,
    // }
}