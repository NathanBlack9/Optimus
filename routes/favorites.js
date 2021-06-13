import bodyParser from 'body-parser';
import express, { response } from 'express';
import db from './db.js';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      let UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;

      let count = await db.promise().query(`select count(*) as count from favorites where user_id = ${req.session.user.name};`);
      count = count[0][0].count;

      let favorites = await db.promise().query(`select * from products where vendor_code in (select vendor_code from favorites where user_id = ${req.session.user.name})`);
      favorites = favorites[0];

      res.render('favorites', {title: 'Избранное',  Name: UserName,
        favorites: favorites,//массив избранных
        count: count
      })
    }
    else 
      res.status(404).render('404', {title: 'Не найдено'});
  })


router
  .route('/add')
  .post(urlencodedParser, async function(req, res) {
    // console.log(req.body.vendor);
    let alreadyIn = await db.promise().query(`select vendor_code as code from favorites where user_id = ${req.session.user.name};`);
    alreadyIn = alreadyIn[0];

    for (let i = 0; i < alreadyIn.length; i++) {
      if (req.body.vendor == alreadyIn[i].code) {
        res.end();
        return false;
      }
    }

    await db.promise().query(`insert into favorites values (${req.body.vendor}, ${req.session.user.name});`);
    res.end();
  })

router
  .route('/clear')
  .post(urlencodedParser, async function(req, res) {
    let UserID = req.session.user.name;
    await db.promise().query(`delete from favorites where user_id = ${UserID};`);
    res.end();
  })

router
  .route('/remove')
  .post(urlencodedParser, async function(req, res) {
    let UserID = req.session.user.name;
    // console.log(req.body.vendor);
    await db.promise().query(`delete from favorites where user_id = ${UserID} and vendor_code = ${req.body.vendor};`);
    res.end();
  })

export default router;