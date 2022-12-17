// axios await 版本
// 把 query string 抽出來當變數，用 params 的方式去設定
// -> 從 stock.txt 讀入股票代碼
// -> 用 moment 取得今日的日期

// 1. 安裝 npm i axios
// 2. 引用 require
// 3. 去讀官方文件
const axios = require('axios');
// fs 是 NodeJS 內建的，所以不用特別安裝
const fs = require('fs/promises');

const moment = require('moment');

const mysql2 = require('mysql2/promise');
require('dotenv').config();
// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
// 2618, 2330, 2412

(async () => {
  let connection;
  // connection => undefined
  try {
    connection = await mysql2.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PWD,
      database: process.env.DB_NAME,
    });

    let stockNo = await fs.readFile('stock.txt', 'utf-8');
    console.log(stockNo);
    let date = moment().format('YYYYMMDD');
    console.log(date);
    let response = await axios.get(`http://54.71.133.152:3000/stocks`, {
      params: {
        stockNo,
        date,
      },
    });

    let rawData = response.data.data;
    rawData.map(async (d) => {
      // d => 本身也是一個陣列
      // ["日期", "成交股數", "成交金額", "開盤價", "最高價","最低價", "收盤價","漲跌價差","成交筆數"],
      // "43,684,491" => 移除 ,
      // console.log('before', d);
      d = d.map((value) => {
        return value.replace(/[,X]/g, '');
      });
      // '111/12/15' => 2022-12-15
      // '111/12/15' => '1111215' + 19110000 => 20221215
      let dt = parseInt(d[0].replace(/\//g, ''), 10) + 19110000;
      // console.log('dt', dt);
      d[0] = moment(dt, 'YYYYMMDD').format('YYYY-MM-DD'); // 20221215 => 2022-12-15
      d.unshift(stockNo);

      let [result] = await connection.query(
        'INSERT INTO stock_prices (stock_id, date, volume, amount, open_price, high_price, low_price, close_price, delta_price, transactions) VALUES (?,?,?,?,?,?,?,?,?,?)',
        d
      );
      console.log(result);
      return d;
      // console.log('after', d);
    });
  } catch (e) {
    console.error(e);
  } finally {
    if (connection) {
      connection.end();
    }
  }
})();
