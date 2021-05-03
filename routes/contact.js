"use strict";
import express from 'express';
const router = express.Router();
import bodyParser from 'body-parser';
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, (req, res) => {
    // console.log(req.body);//само сообщение
    var message = 'Ваша заявка успешно отправлена!<br> Продавец связжется с вами в ближайщее время';
    res.end(message);
  });

export default router;

