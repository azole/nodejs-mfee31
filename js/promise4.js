let doWorkPromise = function (job, timer) {
  // 1. 物件 -> new
  return new Promise((resolve, reject) => {
    // 2. 執行非同步工作
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
    }, timer);
  });
};
let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);

// 刷牙 3 秒鐘
// 吃早餐 5 秒鐘
// 寫功課 3 秒鐘
let count = 0;
let p1 = doWorkPromise('刷牙', 3000);
let p2 = doWorkPromise('吃早餐', 5000);
let p3 = doWorkPromise('寫功課', 3000);

// Promise.all([p1, p2, p3]).then((data) => {
//   console.log(data);
// }).catch();

(async () => {
  try {
    let data = await Promise.all([p1, p2, p3]);
    console.log('await 版本', data);
  } catch (e) {
    // error handle
  }
})();
