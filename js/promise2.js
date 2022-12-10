// Promise 是一個表示非同步運算的最終完成或失敗的物件。
// 1. Promise 是一個物件 new Promise()
//    new Promise(executor)
//    executor: function(resolve, reject) {}
// 2. 執行非同步工作
// 3. 最終完成或失敗
//    完成 -> 呼叫 resolve
//    失敗 -> 呼叫 reject

let doWorkPromise = function (job, timer) {
  // 1. 物件 -> new
  return new Promise((resolve, reject) => {
    // 2. 執行非同步工作
    setTimeout(() => {
      let now = new Date();
      resolve(`完成工作 ${job} at ${now.toISOString()}`);
      // reject('故意發生錯誤');
    }, timer);
  });
};

let now = new Date();
console.log(`工作開始 at ${now.toISOString()}`);

// 刷牙 -> 吃早餐 -> 寫功課
let brushPromise = doWorkPromise('刷牙', 1000);
// promise chain
// promise hell
// 如果刷牙的結果是沒有牙齒痛 -> 就可以吃早餐 -> 吃完早餐再寫功課
// 如果刷牙的結果是牙齒痛 -> 不能吃早餐、直接寫功課
brushPromise
  .then((data) => {
    console.log('brushPromise', data);

    let eatPromise = doWorkPromise('吃早餐', 3000);
    return eatPromise;
  })
  .then((data) => {
    console.log('eatPromise', data);
    return doWorkPromise('寫功課', 3000);
  })
  .then((data) => {
    console.log('writePromise', data);
  })
  .catch((err) => {
    console.error('發生錯誤', err);
  })
  .finally(() => {
    console.log('我是 Finally');
  });
