export function useAPI(wx) {
  const promised_api = {};

  promised_api.login = () => {
    return new Promise((resolve) => {
      wx.login({
        success(res) {
          resolve(res);
        },
        fail(err) {
          resolve(err);
        },
      });
    });
  };

  return { promised_api };
}
