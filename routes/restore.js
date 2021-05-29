import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import mailer from './mailer.js';
import cryptoRandomString from 'crypto-random-string';

const app = express();
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router
  .route('/first')
  .post(urlencodedParser, async (req, res, next) => {
    // console.log(req.body);//само сообщение

    const results = await db.promise().query(`select e_mail from Auth;`);
    const code = cryptoRandomString({length: 8, type: 'numeric'});
    console.log(code);
    
    for (let i = 0; i < results[0].length; i++) {
      if (req.body.email === results[0][i].e_mail) {
        // const message = {
        //   to: `${req.body.email}`,
        //   subject: 'Восстановление пароля',
        //   text: `Ваш код для восстановление пароля: ${code}
              
        //   Если вы не знаете почему вам пришло это письмо, 
        //   то никому не сообщайте код и просто проигнорируйте это сообщение.`
        // }
        // mailer(message);
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
    console.log(req.body);//само сообщение
    res.status(201).render('restore', {title: 'Восстановление пароля', message2: 'Введите новый пароль',  message1: '', message3: ''})
  });
  
router
  .route('/')
  .get((req, res) => {
    res.render('restore', {title: 'Восстановление пароля', message1: '', message2: '', message3: ''});
  });

export default router;