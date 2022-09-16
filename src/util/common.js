import { getCategoryAll } from "../apis/other";
//防止滚动频繁
export function debounce(func, delay) {
  let inDebounce;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

//px转rpx函数
export function rpxTopx(px) {
  let deviceWidth = wx.getSystemInfoSync().windowWidth; //获取设备屏幕宽度
  let rpx = (750 / deviceWidth) * Number(px);
  return Math.floor(rpx);
}
// 延时函数
export function promisedSetTimeout(delay = 500) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
//根据分类id切换分类名称
export function currentCategoryName(param) {
  return new Promise((resolve) => {
    getCategoryAll().then((value) => {
      param.forEach((item) => {
        value.forEach((items) => {
          if (item.category_id == items.id) {
            item.category_name = items.name;
          }
        });
      });
      resolve(param);
    });
  });
}
//更换分类子项key
export function updateCategoryKey(param) {
  var array_cate = [];
  param.forEach((item) => {
    var sun = [];
    item.subs.forEach((items) => {
      var objSun = {
        value: items.id,
        text: items.name,
        icon: items.icon,
        id: items.id,
      };
      sun.push(objSun);
    });
    var obj = {
      value: item.id,
      text: item.name,
      children: sun,
      icon: item.icon,
      id: item.id,
    };
    //删除子项为空
    if (item.subs.length > 0) {
      array_cate.push(obj);
    }
  });
  return array_cate;
}

//更换区域子项key 4级
export function updateAreaKey(param) {
  var array_cate = [];
  param.forEach((item) => {
    var sun = [];
    item.children.forEach((items) => {
      var suns = [];
      items.children.forEach((itemss) => {
        var sunss = [];
        itemss.children.forEach((itemsss) => {
          var objSunss = {
            value: itemsss.id,
            text: itemsss.name,
            id: itemsss.id,
          };
          sunss.push(objSunss);
        });
        var objSuns = {
          value: itemss.id,
          text: itemss.name,
          id: itemss.id,
          children: sunss,
        };
        suns.push(objSuns);
      });
      var objSun = {
        value: items.id,
        text: items.name,
        children: suns,
        id: items.id,
      };
      sun.push(objSun);
    });
    var obj = {
      value: item.id,
      text: item.name,
      children: sun,
      id: item.id,
    };
    //删除子项为空
    if (item.children.length > 0) {
      array_cate.push(obj);
    }
  });
  return array_cate;
}
// 获取当日时间
export function getSelfDate(type) {
  const date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (type === "start") {
    year = year - 60;
  } else if (type === "end") {
    year = year + 2;
  }
  month = month > 9 ? month : "0" + month;
  day = day > 9 ? day : "0" + day;
  return `${year}-${month}-${day}`;
}
