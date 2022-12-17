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

// http://54.71.133.152:3000/stocks?stockNo=2618&date=202211
// 2618, 2330, 2412

(async () => {
  try {
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

    console.log('await', response.data);
  } catch (e) {
    console.error(e);
  }
})();
