import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

const urlencodedParser = bodyParser.urlencoded({ extended: false })
var UserName;

router
  .route('/')
  .post(urlencodedParser, async (req, res, next) => {
    // console.log(req.body);//само сообщение
    const results = await db.promise().query(`select * from Auth`);
    
      let i = 0;
      while (i < results[0].length){ 
        try {
          // console.log(await bcrypt.compare(req.body.password, pass));
          // console.log(req.body);
          if (await bcrypt.compare(req.body.password, results[0][i].password) && results[0][i].e_mail === req.body.email){
            UserName = await db.promise().query(`select first_name from Users where id = ${results[0][i].id}`);
            UserName = UserName[0][0].first_name;
            res.status(200).send('Вы успешно авторизовались! <br>Добро пожаловать');
            break;
          }
        } catch (error) {
          res.status(500).send();
          break;
        }
        i++;        
      };
      next();
  });

router
  .route('/')
  .get( async (req, res) => {
    let count = await db.promise().query(`SELECT count(*) as count FROM Feedback`);
    count = count[0][0].count;
    let firstName = new Array(),
        lastName = new Array(), 
        rating = new Array(), 
        comment = new Array(), 
        names, lasts, rats, comms;

      for (let i = 1; i < count + 1; i++) {
        names = await db.promise().query(`select first_name from Users where id in (select user_id from Feedback where id = ${i});`);
        firstName[i-1] = names[0][0].first_name;

        lasts = await db.promise().query(`select last_name from Users where id in (select user_id from Feedback where id = ${i});`);
        lastName[i-1] = lasts[0][0].last_name;

        rats = await db.promise().query(`select rating from Feedback where id = ${i};`);
        rating[i-1] = rats[0][0].rating;

        comms = await db.promise().query(`select comment from Feedback where id = ${i};`);
        comment[i-1] = comms[0][0].comment;
      }
    // res.render('index', {title: 'ОптПоставка', Name: UserName})
    res.render('index', {title: 'ОптПоставка', Name: UserName, feedback: {first_name: firstName, last_name: lastName, rating: rating, comment: comment, count: count}})
  });
  
export default router;