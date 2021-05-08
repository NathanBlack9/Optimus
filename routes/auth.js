import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, async (req, res, next) => {
    // console.log(req.body);//само сообщение
    const email = req.body.email,
          password = req.body.password,
          results = await db.promise().query(`select * from Auth`);
      let i = 0;
      let login = results[0][i].e_mail; //from DB
      let pass = results[0][i].password;//from DB
    // console.log("Почта:", email,"Пароль:", password);
    
      while (i < results[0].length){
        if (email === login && password === pass){
          res.status(200).end();
          break;
        }
        i++;
      };
      next();
  });

router
  .route('/')
  .get((req, res) => {
    res.render('index-login', {title: 'ОптПоставка'})
  });

export default router;