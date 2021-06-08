import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import db from './db.js';
import mailer from './mailer.js';
import cryptoRandomString from 'crypto-random-string';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router
  .route('/')
  .get(async (req, res) => {
    let UserName;
    if (req.session.user) {
      UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
      res.render('feedback', {title: 'Написать отзыв', Name: UserName});
    } else
      res.render('404', {title: 'Не найдено'});
  });

router
  .route('/')
  .post(urlencodedParser, async (req, res) => {
    try {
      console.log(req.body);
      await db.promise().query(`insert into Feedback(user_id, rating, city, comment) values (${req.session.user.name}, ${req.body.rating},'${req.body.city}' ,'${req.body.text}');`);


      res.status(200).send('Спасибо за отзыв!<br>Скоро он появится на главной странице');
    } catch (error) {
      console.log(error);
      res.render('404', {title: 'Не найдено'});
    }
  })

export default router;