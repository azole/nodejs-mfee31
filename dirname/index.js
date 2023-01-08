const fs = require('fs/promises');

console.log('index.js', __dirname);

fs.readFile(__dirname + '/' + './stock.txt', 'utf-8')
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.error(e);
  });
