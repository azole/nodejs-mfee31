const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

require('dotenv').config();
const pool = require('./utils/db');

// 允許跨源存取
// 預設是全部開放
// 也可以做部分限制，參考 npm cors 的文件
const cors = require('cors');
app.use(
  cors({
    // 為了讓 browser 在 CORS 的情況下還是幫我們送 cookie
    // 必須把 credentails 設定成 true
    // 但是，當你把 credentials 設定成 true，就一定要設定 origin (來源)
    origin: ['http://localhost:3000'],
    credentials: true,
  })
);

// 如果要讓 express 認得 json 資料
// request Content-Type: application/json
// 需要加上這個中間件
app.use(express.json());

const expressSession = require('express-session');
const FileStore = require('session-file-store')(expressSession);
const path = require('path');
app.use(
  expressSession({
    // 告訴 express-session session 要存哪裡
    store: new FileStore({
      path: path.join(__dirname, '..', 'sessions'),
    }),
    secret: process.env.SESSION_SECRET,
    // true: 即使 session 沒有改變也重新儲存一次
    // 取決於你用的 storage 是有時效性的，可能需要不停地刷新這個時效
    resave: false,
    // true: 還沒有正式初始化的 session 也真的存起來
    saveUninitialized: false,
  })
);

// middleware => pipeline pattern

// 設定 express 處理靜態檔案
// -> express 內建 -> 不需要安裝任何東西
// localhost:3001/
// app.use(express.static('./static'));
// localhost:3001/2048/
app.use('/2048', express.static('./static'));

// 處理使用者註冊時上傳的圖片網址
// http://localhost:3001/public/uploads/1673160926241.jpg
app.use('/public', express.static('./public'));

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

app.get('/api', (req, res, next) => {
  res.json({
    name: 'John',
    age: 18,
  });
});

const stockRouter = require('./routers/stockRouter');
app.use('/api/stocks', stockRouter);

const authRouter = require('./routers/authRouter');
app.use('/api/auth', authRouter);

const memberRouter = require('./routers/memberRouter');
app.use('/api/members', memberRouter);

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
  res.status(404).send('沒有這個網頁啦');
});

app.listen(3001, () => {
  console.log('Server running at port 3001');
});
