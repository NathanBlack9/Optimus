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
  .post(urlencodedParser, async (req, res) => {
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
         let UserName;
      if (req.session.user) {
        UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
        UserName = UserName[0][0].first_name;
      } else
        UserName = ''
        
        res.status(201).render('restore', {title: 'Восстановление пароля', message1: 'Код был отправлен на вашу почту!', message2: '', message3: '', Name: UserName})
        break;
      }
    }
      let UserName;
      if (req.session.user) {
        UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
        UserName = UserName[0][0].first_name;
      } else
        UserName = ''
    res.status(500).render('restore', {title: 'Восстановление пароля', message1: 'Такого пользователя не существует', message2: '', message3: '', Name: UserName});
  });

router
  .route('/second')
  .post(urlencodedParser, async (req, res) => {
    // console.log(req.body);//само сообщение
    if (req.body.code === code) {
      let UserName;
      if (req.session.user) {
        UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
        UserName = UserName[0][0].first_name;
      } else
        UserName = ''
      res.status(201).render('restore', {title: 'Восстановление пароля', message2: 'Введите новый пароль',  message1: 'Код был отправлен на вашу почту!', message3: '', Name: UserName})
    }
    else {
      let UserName;
      if (req.session.user) {
        UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
        UserName = UserName[0][0].first_name;
      } else
        UserName = ''
      res.status(403).render('restore', {title: 'Восстановление пароля', message1: 'Такого пользователя не существует', message2: 'Код неверный', message3: '', Name: UserName});
    }
  });

router
  .route('/third')
  .post(urlencodedParser, async (req, res) => {
    // console.log(req.body);//само сообщение
    try {
      if (req.body.password1 === req.body.password2) {
        const hashedPassword = await bcrypt.hash(req.body.password1, 10);
        await db.promise().query(`update Auth set password = '${hashedPassword}' where e_mail = '${email}';`);

        let UserName;
        if (req.session.user) {
          UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
          UserName = UserName[0][0].first_name;
        } else
          UserName = ''
        res.status(201).render('restore', {title: 'Восстановление пароля', message2: 'Введите новый пароль',  message1: 'Код был отправлен на вашу почту!', message3: 'Пароль успешно изменён!', Name: UserName});
      } 
    } catch (error) {
      let UserName;
      if (req.session.user) {
        UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
        UserName = UserName[0][0].first_name;
      } else
        UserName = ''

      res.status(403).render('restore', {title: 'Восстановление пароля', message1: '', message2: '', message3: 'Ошибка', Name: UserName});
      console.log(error);
    }
     
  });
  
router
  .route('/')
  .get(async (req, res) => {
    let UserName;
    if (req.session.user) {
      UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
    } else
      UserName = ''

    res.render('restore', {title: 'Восстановление пароля', message1: '', message2: '', message3: '', Name: UserName});
  });

export default router;