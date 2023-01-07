const express = require('express');
const router = express.Router();

// /api/auth
router.post('/register', (req, res, next) => {
  console.log('I am register');
  // TODO: 驗證資料 validation -> 因為後端不可以相信來自前端的資料
  // TODO: 處理驗證的結果

  // TODO: 檢查 email 是否已經註冊過
  // TODO: 如果已經註冊過，就回覆 400

  // TODO: 雜湊 hash 密碼

  // TODO: 存到資料庫

  // TODO: 回覆給前端
  res.json({});
});

module.exports = router;
