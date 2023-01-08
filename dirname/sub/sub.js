const fs = require('fs/promises');
// const path = require('path');

console.log('sub.js', __dirname);

// path.join(__dirname, '..', 'stock.txt');

fs.readFile(__dirname + '/' + '..' + '/' + 'stock.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.error(e);
  });
