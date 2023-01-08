const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const pool = require('../utils/db');

const argon2 = require('argon2');

// app.use((req, res, next) => {...})

router.use((req, res, next) => {
  console.log('這裡是 auth router 的中間件');
  next();
});

// 驗證資料 validation -> 因為後端不可以相信來自前端的資料
const registerRules = [
  // 中間件: 負責檢查 email 是否合法
  body('email').isEmail().withMessage('請輸入正確格式的 Email'),
  // 中間件: 檢查密碼的長度
  body('password').isLength({ min: 8 }).withMessage('密碼長度至少為 8'),
  // 中間件: 檢查 password 跟 confirmPassword 是否一致
  // 客製自己想要的檢查條件
  body('confirmPassword')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('驗證密碼不符合'),
];

// /api/auth
router.post('/register', registerRules, async (req, res, next) => {
  console.log('I am register', req.body);

  // TODO: async/await 應該要有 try-catch 去做錯誤處理

  // 處理驗證的結果
  const validateResult = validationResult(req);
  console.log(validateResult);
  if (!validateResult.isEmpty()) {
    // validateResult 不是空的 -> 表示有錯誤
    return res.status(400).json({ errors: validateResult.array() });
    // early return
  }

  // 檢查 email 是否已經註冊過
  let [members] = await pool.execute('SELECT * FROM members WHERE email = ?', [req.body.email]);
  if (members.length > 0) {
    // 表示這個 email 有存在資料庫中
    // 如果已經註冊過，就回覆 400
    return res.status(400).json({
      errors: [
        {
          msg: 'email 已經註冊過',
          param: 'email',
        },
      ],
    });
  }

  // 雜湊 hash 密碼
  const hashedPassword = await argon2.hash(req.body.password);

  // 存到資料庫
  let result = await pool.execute('INSERT INTO members (email, password, name) VALUES (?, ?, ?);', [req.body.email, hashedPassword, req.body.name]);
  console.log('register: insert to db', result);

  // 回覆給前端
  res.json({
    email: req.body.email,
    member_id: result[0].insertId,
  });
});

module.exports = router;
