import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import db from './db.js';
import mailer from './mailer.js';
import cryptoRandomString from 'crypto-random-string';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
var code, email;

router
  .route('/first')
  .post(urlencodedParser, async (req, res, next) => {
    // console.log(req.body);//само сообщение

    const results = await db.promise().query(`select e_mail from Auth;`);
    code = cryptoRandomString({length: 8, type: 'numeric'});
    console.log(code);
    email = req.body.email;

    for (let i = 0; i < results[0].length; i++) {
      if (email === results[0][i].e_mail) {
        const message = {
          to: `${email}`,
          subject: 'Восстановление пароля',
          text: `Ваш код для восстановление пароля: ${code}
              
          Если вы не знаете почему вам пришло это письмо, 
          то никому не сообщайте код и просто проигнорируйте это сообщение.`
        }
        mailer(message);
        // res.status(201).send('Сообщение было отправлено');
        res.status(201).render('restore', {title: 'Восстановление пароля', message1: 'Код был отправлен на вашу почту!', message2: '', message3: ''})
        break;
      }
    }
    res.status(500).render('restore', {title: 'Восстановление пароля', message1: 'Такого пользователя не существует', message2: '', message3: ''});
  });

router
  .route('/second')
  .post(urlencodedParser, async (req, res) => {
    // console.log(req.body);//само сообщение
    if (req.body.code === code) 
      res.status(201).render('restore', {title: 'Восстановление пароля', message2: 'Введите новый пароль',  message1: '', message3: ''})
    else 
      res.status(403).render('restore', {title: 'Восстановление пароля', message1: 'Код неверный', message2: '', message3: ''});
  });

router
  .route('/third')
  .post(urlencodedParser, async (req, res) => {
    console.log(req.body);//само сообщение
    console.log(email);
    try {
      if (req.body.password1 === req.body.password2) {
        const hashedPassword = await bcrypt.hash(req.body.password1, 10);
        await db.promise().query(`update Auth set password = '${hashedPassword}' where e_mail = '${email}';`);
        res.status(201).render('restore', {title: 'Восстановление пароля', message2: '',  message1: '', message3: 'Пароль успешно изменён!'});
      } 
    } catch (error) {
      res.status(403).render('restore', {title: 'Восстановление пароля', message1: '', message2: '', message3: 'Ошибка'});
      console.log(error);
    }
     
  });
  
router
  .route('/')
  .get((req, res) => {
    res.render('restore', {title: 'Восстановление пароля', message1: '', message2: '', message3: ''});
  });

export default router;