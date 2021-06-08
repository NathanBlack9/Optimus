import express from 'express';
import db from './db.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    //-------------
    let count = await db.promise().query(`SELECT count(*) as count FROM Feedback`);
    count = count[0][0].count;
    let firstName = new Array(),
        lastName = new Array(), 
        rating = new Array(), 
        comment = new Array(), 
        citys = new Array(), 
        names, lasts, rats, comms, cit;

      for (let i = 1; i < count + 1; i++) {
        names = await db.promise().query(`select first_name from Users where id in (select user_id from Feedback where id = ${i});`);
        firstName[i-1] = names[0][0].first_name;

        lasts = await db.promise().query(`select last_name from Users where id in (select user_id from Feedback where id = ${i});`);
        lastName[i-1] = lasts[0][0].last_name;

        rats = await db.promise().query(`select rating from Feedback where id = ${i};`);
        rating[i-1] = rats[0][0].rating;

        cit = await db.promise().query(`select city from Feedback where id = ${i};`);
        citys[i-1] = cit[0][0].city;

        comms = await db.promise().query(`select comment from Feedback where id = ${i};`);
        comment[i-1] = comms[0][0].comment;
      }
      // console.log(count, firstName, lastName, rating, comment);
    //-------------
    res.render('index', {title: 'ОптПоставка', Name: '', 
    feedback: {
        first_name: firstName, 
        last_name: lastName, 
        rating: rating, 
        comment: comment, 
        city: citys,
        count: count
      }
    })
  });

export default router;