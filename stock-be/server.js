const express = require('express');
// 利用 express 這個框架建立一個 web app
const app = express();

require('dotenv').config();
const mysql2 = require('mysql2/promise');

let pool = mysql2.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  // 限制 pool 連線數的上限
  connectionLimit: 10,
});

// 如果要讓 express 認得 json 資料
// request Content-Type: application/json
// 需要加上這個中間件
app.use(express.json());

// 允許跨源存取
// 預設是全部開放
// 也可以做部分限制，參考 npm cors 的文件
const cors = require('cors');
app.use(cors());

// middleware => pipeline pattern

// 設定 express 處理靜態檔案
// -> express 內建 -> 不需要安裝任何東西
// localhost:3001/
// app.use(express.static('./static'));
// localhost:3001/2048/
app.use('/2048', express.static('./static'));

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

app.get('/api/stocks', async (req, res, next) => {
  // let results = await connection.query('SELECT * FROM stocks');
  // let data = results[0];
  console.log('這裡是 /api/stocks');
  let [data] = await pool.query('SELECT * FROM stocks');
  res.json(data);
});

// localhost:3001/api/stocks/2330
// req.params.stockId => 2330
// SELECT * FROM stock_prices WHERE stock_id=2330

// sql injection
// localhost:3001/api/stocks/1234 or 1=1;--
// req.params.stockId => 1234 or 1=1;--
// SELECT * FROM stock_prices WHERE stock_id=1234 or 1=1;--
app.get('/api/stocks/:stockId', async (req, res, next) => {
  console.log('/api/stocks/:stockId => ', req.params.stockId);

  // 分頁

  // 從前端拿到目前是要第幾頁
  // 通常會放在 query string -> req.query.page
  // /api/stocks/:stockId?page=2
  // /api/stocks/:stockId -> 如果 page 沒有寫，預設使用者是要第一頁
  // 如果沒有 page 這個 query string 就預設為 1
  const page = req.query.page || 1;

  // 總筆數？
  let [results] = await pool.execute('SELECT COUNT(*) AS total FROM stock_prices WHERE stock_id=?', [req.params.stockId]);
  // console.log('GET /stocks/details -> count:', results[0].total);
  const total = results[0].total;

  // 總共有幾頁
  const perPage = 5; // 一頁有五筆
  const totalPage = Math.ceil(total / perPage);

  // 計算 offset, limit (一頁有幾筆)
  const limit = perPage;
  const offset = perPage * (page - 1);

  // 根據 offset, limit 去取得資料
  let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=? ORDER BY date LIMIT ? OFFSET ?', [req.params.stockId, limit, offset]);
  // 把資料回覆給前端
  res.json({
    pagination: {
      total,
      perPage,
      totalPage,
      page,
    },
    data,
  });

  // 會用 prepared statement 的方式來避免發生 sql injection
  // pool.query vs pool.execute
  // let [data] = await pool.execute('SELECT * FROM stock_prices WHERE stock_id=?', [req.params.stockId]);
  // res.json(data);
});

app.post('/api/stocks', async (req, res) => {
  console.log('POST /api/stocks', req.body);
  // req.body.stockId, req.body.stockName
  // 完成 insert
  let results = await pool.query('INSERT INTO stocks (id, name) VALUES (?, ?);', [req.body.stockId, req.body.stockName]);
  // console.log('POST stocks results', results);
  res.json({ result: 'ok' });
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
