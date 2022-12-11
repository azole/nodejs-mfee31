const util = require('util');
const fs = require('fs');

// fs.readFile('test.txt', 'utf-8', (err, data) => {});
// new Promise(...)

let readFilePromise = util.promisify(fs.readFile);
readFilePromise('test.txt', 'utf-8')
  .then((data) => {
    console.log(`來自 promisify 的 readfile: ${data}`);
  })
  .catch();

/*
如果這個套件有內建了 promise 版本，就用這個內建的版本，例如: fs/promises

如果遇到舊版的套件，沒有提供 promise 的
1. 如果這個舊版的套件的 callback 剛好是 error-first 的格式，
   就可以直接用 util.promisify 去包
2. 自己包 => 自己 new Promise 
*/
