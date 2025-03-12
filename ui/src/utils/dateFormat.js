const dateFormat = Vue.filter('dateFormat', (date) => {
    // 获取当前时间的毫秒值
    const now = new Date().getTime();
    // 获取过滤时间的毫秒值
    const datetime = date.getTime();
    // 计算出两个时间之间相差的秒值
    const interval = (now - datetime) / 1000;
  
    if (interval < 60) {
      return '刚刚';
    } else if (interval < 60 * 60) {
      return `${parseInt(interval / 60)}分钟前`;
    } else if (interval < 60 * 60 * 24) {
      return `${parseInt(interval / 60 / 60)}小时前`;
    } else if (interval < 60 * 60 * 24 * 2) {
      return '昨天';
    } else if (interval < 60 * 60 * 24 * 8) {
      return `${parseInt(interval / 60 / 60 / 24)}天前`;
    } else {
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      month = month < 10 ? `0${month}` : month;
      let day = date.getDate();
      day = day < 10 ? `0${day}` : day;
      let h = date.getHours();
      h = h < 10 ? `0${h}` : h;
      let m = date.getMinutes();
      m = m < 10 ? `0${m}` : m;
      let s = date.getSeconds();
      s = s < 10 ? `0${s}` : s;
      return `${year}-${month}-${day} ${h}:${m}:${s}`;
    }
  });
  
  export default dateFormat;