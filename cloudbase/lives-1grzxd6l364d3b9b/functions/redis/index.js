// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: "lives-1grzxd6l364d3b9b" });
const db = cloud.database();
const collection = db.collection("redis");


const find = function (param) {
    console.log(param)
    try {
        var option = {
            ...param
        }
        return new Promise((resolve, reject) => {
            collection.where(option)
            .field({
                key: true,
                value: true,
            }).get().then(res => {
                resolve(res)
            }).catch(err => {
                reject(err)
            })
        })
    } catch (error) {
        return Promise.reject(error)
    }
    

}

// 云函数入口函数
exports.main = async (event, context) => {
    try {
        const db = await find(event);
        return {
            code: 200,
            data: db.data,
            msg: db.errMsg
        }
    } catch (error) {
        return {
            code: 400,
            data: null,
            msg:error,
        }
    }
    
}