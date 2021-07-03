// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "lives-1grzxd6l364d3b9b" });
const db = cloud.database();
const collection = db.collection('videoShare');
const $ = db.command.aggregate
const _ = db.command

const getVideo = function (param) {
    const {_id,fileId} = param
    if (!_id && !fileId) {
        return Promise.reject("id is not defined")
    }
    return collection.where({
        _id,fileId
    }).get().then(res => {
        if (res.data.length > 0) {
            return res.data[0]
        } else {
            return false
        }
    })
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
        const data = await getVideo(event);
        if(data){
            return requestBack.success(data)
        }else{
            return requestBack.fail(null)
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