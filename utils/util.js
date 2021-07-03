function formaTime(timestemp) {
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const month = day * 30;
    const year = month * 12;
    const diffValue = new Date().getTime() - timestemp; // 当前时间戳-原时间戳=相差时间

    // 如果本地时间小于变量时间
    if (diffValue <= 0) {
        return '刚刚'
    }

    // 计算差异时间的量级
    const yearC = diffValue / year;
    const monthC = diffValue / month;
    const weekC = diffValue / (7 * day);
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;

    // 从大到小排序 满足1以上即成立
    const map = {
        [yearC]: '年',
        [monthC]: "月",
        [weekC]: "周",
        [dayC]: "天",
        [hourC]: "小时",
        [minC]: "分钟",
    }
    for (let i in map) {
        if (i >= 1) {
            return `${parseInt(i)}${map[i]}前`
        }
    }
    return "刚刚"
}

function randomStr(option) {
    let {randomLength, number, lower, upper} = option
    if (!randomLength) {
        randomLength = 8
    }
    if (!number && !lower && !upper) {
        number = true
    }
    var upperCaseChars = function () {
        //生成大写字母  A的Unicode值为65
        let str = [];
        for (let i = 65; i < 91; i++) {
            str.push(String.fromCharCode(i));
        }
        return str;
    }
    var lowerCaseChars = function () {
        //生成小写字母  a的Unicode值为97
        let str = [];
        for (let i = 97; i < 123; i++) {
            str.push(String.fromCharCode(i));
        }
        return str;
    }
    var numberChars = function () {
        let str = [];
        for (let i = 0; i < 9; i++) {
            str.push(i);
        }
        return str;
    }


    var chart_list = [
        numberChars(), lowerCaseChars(), upperCaseChars()
    ]
    var check_list = [number,lower,upper]
    var pass_list = []

    for (let i = 0; i < check_list.length; i++) {
        const item = check_list[i];
        if (item) {
            pass_list = pass_list.concat(chart_list[i])
        }
    }
    var password = ""
    pass_list.sort(function () { return 0.5 - Math.random() })
    if (pass_list.length > 0) {
        for (let i = 0; i < randomLength; i++) {
            password += pass_list[Math.floor(Math.random() * pass_list.length)]
        }
    }
    return password
}

module.exports = {
    formaTime,
    randomStr
}