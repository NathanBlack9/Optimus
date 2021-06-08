import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      let FirstName, LastName, 
          Phone, Email;

      FirstName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      FirstName = FirstName[0][0].first_name;

      LastName = await db.promise().query(`select last_name from Users where id = ${req.session.user.name}`);
      LastName = LastName[0][0].last_name;

      Phone = await db.promise().query(`select phone from Users where id = ${req.session.user.name}`);
      Phone = Phone[0][0].phone;

      Email = await db.promise().query(`select e_mail from Auth where id = ${req.session.user.name}`);
      Email = Email[0][0].e_mail;
      
      let UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
      res.status(200).render('profile', {title: 'Личный кабинет', Name: UserName,
        personal: {
          first_name: FirstName,
          last_name: LastName,
          phone: Phone,
          email: Email
        }
      });
    }
    else 
      res.status(404).render('404', {title: 'Не найдено'});
  });

router
  .route('/')
  .post(urlencodedParser, async (req, res) => {
    try {
      await db.promise().query(`update Auth set e_mail = '${req.body.email}' where id = ${req.session.user.name};`);
      await db.promise().query(`update Users set first_name = '${req.body.name}', last_name = '${req.body.last_name}', phone = '${req.body.tel}' where id = ${req.session.user.name};`);
      res.status(200).send('Данные успешно изменены!');
    } catch (error) {
      console.log(error);
      res.status(500);
    }
  })

export default router;
