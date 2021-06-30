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
    insert: function () {
        return requestBack.success(null)
    }
}



exports.main = async (event, context) => {
    console.log(mainFun);
    console.log(mainFun[event.action]);
    if (event.action && typeof mainFun[event.action] === "function") {
        console.log(event);
        var param = event
        delete param.action
        return mainFun[event.action](param)
    } else {
        return Promise.reject("param.action is not defined!")
    }
}