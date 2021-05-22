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

module.exports = {
    formaTime
}