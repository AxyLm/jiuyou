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
const insert = function (param) {
    
}
const insertVideo = function (param) {
    return collection.add({data:param})
}
const requestBack = {
    success: function (data) {
        return {
            code: 200,
            data: data,
        }
    },
    fail: function (data) {
        return {
            code: 400,
            data: data,
        }
    },
    custom: function (code, data) {
        return {
            code: code,
            data: data,
        }
    }
}

const mainFun = {
    getVideo: async function (event) {
        const res = await getVideo(event);
        if(res.data && res.data._id){
            return requestBack.success(res.data)
        }else{
            return requestBack.fail(res.data)
        }
    },
    insert: function (event) {
        return insertVideo(event.param)
    }
}



exports.main = async (event, context) => {
    const action = event.action
    if (action && typeof mainFun[action] === "function") {
        console.log(event);
        var param = event
        delete param.action
        return mainFun[action](param)
    } else {
        return Promise.reject("param.action is not defined!")
    }
}