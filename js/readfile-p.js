const fs = require('fs');

// Promise 是一個表示非同步運算的最終完成或失敗的物件。
let p = new Promise((resolve, reject) => {
  // error-first callback
  fs.readFile('test.txt', 'utf-8', (err, data) => {
    if (err) {
      // 如果 err 有值，表示有錯誤發生
      // 這裡應該要處理錯誤
      reject(err);
      // console.error('發生錯誤了', err);
    } else {
      // 進來這裡，表示 err 是空的 (可能是 null)
      resolve(data);
      // console.log('成功讀到資料:', data);
    }
  });
});

// 是真正用的人
p.then((data) => {
  console.log('我是 then', data);
}).catch((err) => {
  console.error('我是 catch', err);
});
