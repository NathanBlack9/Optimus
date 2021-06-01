import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10),
            email = req.body.email,
            tel = req.body.tel,
            name = req.body.name,
            last_name = req.body.last_name;
      await db.promise().query(`insert into Auth set e_mail = '${email}', password = '${hashedPassword}'`);
      await db.promise().query(`insert into Users set first_name = '${name}', last_name = '${last_name}', phone = '${tel}'`);
      res.status(200).render('index', {title: 'ОптПоставка', Name: [name], feedback: {}});
      
      // res.render('register', {title: 'Регистрация', message: 'Вы успешно зарегистрировались!'});
      
    } catch (error) {
      console.log(error);
      res.status(500);
      res.render('register', {title: 'Регистрация', message: 'Такой пользователь уже есть в базе'});
    }
  });

router
  .route('/')
  .get((req, res) => {
    res.render('register', {title: 'Регистрация', message: ''});
  });

export default router;
