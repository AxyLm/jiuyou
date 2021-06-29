// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "lives-1grzxd6l364d3b9b" });
const db = cloud.database();
const collection = db.collection('videoShare');
const $ = db.command.aggregate
const _ = db.command

const getVideo = function (param) {
    if (!param.id) {
        return Promise.reject("docId is undefined")
    }
    return collection.doc(param.id).get()
}

// 云函数入口函数
exports.main = async (event, context) => {
    const res = await getVideo(event);
    if(res.data && res.data._id){
        return {
            code: 200,
            data: res.data,
        }
    }else{
        return {
            code: 400,
            data: null,
        }
    }
}