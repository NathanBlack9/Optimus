import express from 'express';
import bodyParser from 'body-parser';
// import db from './db.js';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, (req, res) => {
    console.log(req.body);

    //добавить в базу!
    res.status(200);
    res.render('register', {title: 'kaka', message: 'Регистрация прошла успешно!'});
  });

router
  .route('/')
  .get((req, res) => {
    res.render('register', {title: 'Регистрация', message: ''});
  });

// router
//   .route('/acc')
//   .get((req, res) => {
//     res.render();
//   });

export default router;
