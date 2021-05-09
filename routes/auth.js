import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
// import cookieParser from 'cookie-parser';
// import session from 'express-session';
// import morgan from 'morgan';

const app = express();
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })
var UserName;
router
  .route('/')
  .post(urlencodedParser, async (req, res, next) => {
    // console.log(req.body);//само сообщение
    const email = req.body.email,
          password = req.body.password,
          results = await db.promise().query(`select * from Auth`);

      let i = 0;
      let login = results[0][i].e_mail; //from DB
      let pass = results[0][i].password;//from DB

      while (i < results[0].length){
        if (email === login && password === pass){
          UserName = await db.promise().query(`select first_name from Users where id = ${results[0][i].id}`);
          UserName = UserName[0][0].first_name;
          res.status(200).end();
          break;
        }
        i++;
      };
      next();
  });

router
  .route('/')
  .get((req, res) => {
    res.render('index-login', {title: 'ОптПоставка', Name: UserName})
  });
  
export default router;