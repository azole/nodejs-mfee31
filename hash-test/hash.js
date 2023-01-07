// const md5 = require('md5');
// console.log(md5('test12345'));
// console.log(md5('test12345'));

const bcrypt = require('bcrypt');
(async () => {
  let result1 = await bcrypt.hash('test12345999', 10);
  console.log('bcrypt 1 --> ', result1, result1.length);
  let result2 = await bcrypt.hash('test12345999', 10);
  console.log('bcrypt 2 --> ', result2, result1.length);
})();

const argon2 = require('argon2');
(async () => {
  let result3 = await argon2.hash('test12345999', 10);
  console.log('argon2 --> ', result3, result3.length);
  let result4 = await argon2.hash('test12345999', 10);
  console.log('argon2 --> ', result4, result4.length);
})();
