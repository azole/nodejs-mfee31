const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

// middleware => pipeline pattern

// 中間件
app.use((req, res, next) => {
  console.log('這裡是的一個中間件 A');
  req.mfee31 = '水母班';
  next();
  // res.send('這裡是 A 中間件');
});

app.use((req, res, next) => {
  console.log('這裡是的一個中間件 B');
  req.dt = new Date().toISOString();
  next();
});

// app.[Method]
// get, post, put, patch, delete, option, head
// 路由中間件
app.get('/', (req, res, next) => {
  console.log('這裡是首頁 2', req.mfee31, req.dt);
  res.send('Hello Express 9');
});

app.use((req, res, next) => {
  console.log('這裡是的一個中間件 C');
  next();
});

app.get('/test', (req, res, next) => {
  console.log('這裡是 test 頁面', req.dt);
  res.send('Hello Test 1');
});

// 放在所有的路由中間件的後面
// 前面所有的路由都比不到對的網址時，就會掉到這裡來
// --> 這就是一個 404 的情況
// 利用了中間件會依照程式碼順序來執行的特性
app.use((req, res, next) => {
  console.log('這裡是 404');
  res.send('沒有這個網頁啦');
});

app.listen(3001, () => {
  console.log('Server running at port 3001');
});
