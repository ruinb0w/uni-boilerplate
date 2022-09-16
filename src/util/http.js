const BASE_URL = "http://www.ychmg.com"; //域名

export const myRequest = (options) => {
  return new Promise((reslove, reject) => {
    uni.request({
      url: BASE_URL + options.url,
      method: options.method || "GET",
      data: options.data || {},
      header: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      dataType: "json",
      success: (res) => {
        if (res.statusCode !== 200) {
          return uni.showToast({
            title: "数据获取失败",
          });
        }
        reslove(res);
      },
      fail: (err) => {
        uni.showToast({
          title: "请求接口失败",
        });
        reject(err);
      },
    });
  });
};
