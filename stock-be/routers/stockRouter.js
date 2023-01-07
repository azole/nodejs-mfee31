// stockRouter

const express = require('express');
// 利用 express 這個框架建立一個 router
const router = express.Router();

const pool = require('../utils/db');

// app.use => router.use
// app.get => router.get
// app.post => router.post

router.get('/', async (req, res, next) => {
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
router.get('/:stockId', async (req, res, next) => {
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

router.post('/', async (req, res) => {
  console.log('POST /api/stocks', req.body);
  // req.body.stockId, req.body.stockName
  // 完成 insert
  let results = await pool.query('INSERT INTO stocks (id, name) VALUES (?, ?);', [req.body.stockId, req.body.stockName]);
  // console.log('POST stocks results', results);
  res.json({ result: 'ok' });
});

module.exports = router;
