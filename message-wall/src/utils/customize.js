//时间格式化
export const formattime = (time) => {
    let date = new Date(time)
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDay()
    if (month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + day
    }
    return `${year}.${month}.${day}`
}

//将返回的流数据转换为url
export const getObjectURL = (file) => {
    let url = null;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(file);
    } else if (window.webkitURL != undefined) {
        try {
            url = window.webkitURL.createObjectURL(file);
        } catch (error) {
            console.log(error);
        }
    } else if (window.URL != undefined) {
        try {
            url = window.URL.createObjectURL(file);
        } catch (error) {
            console.log(error);
        }
    }
    return url;
}

//动态获取assets中的图片地址
export const getAssetURL = (image) => {
    return new URL(`../assets/images/${image}`, import.meta.url).href
}

//将ip加密成十位数字
export const ipTo10DigitNumber = (ip) => {
    // 将 IP 转换为 32 位整数
    const ipParts = ip.split('.').map(Number);
    const ipNumber = (ipParts[0] << 24) | (ipParts[1] << 16) | (ipParts[2] << 8) | ipParts[3];

    // 使用简单哈希函数（可替换为更复杂的）
    let hash = 5381;
    for (let i = 0; i < ip.length; i++) {
        hash = ((hash << 5) + hash) + ip.charCodeAt(i);
    }

    // 结合 IP 数值和哈希值
    const combined = Math.abs((ipNumber ^ hash) % 10000000000);

    // 确保结果是 10 位数（前导补零）
    return combined.toString().padStart(10, '0');
}