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