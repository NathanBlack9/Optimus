"use strict";
import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, (req, res) => {
    console.log(req.body);//само сообщение
    var message = 'Вход успешно осуществлен!';
    res.end(message);
  });

export default router;