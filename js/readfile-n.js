const fs = require('fs/promises');

// fs.readFile('test.txt', 'utf-8')
//   .then((data) => {
//     console.log('這是 fs 內建 promise 版本', data);
//   })
//   .catch((e) => {
//     console.error('catch 到的錯誤', e);
//   });

(async () => {
  try {
    let data = await fs.readFile('test.txt', 'utf-8');
    console.log('await 來的', data);
  } catch (e) {
    console.error(e);
  }
})();
