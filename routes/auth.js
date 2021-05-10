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
      let login = results[0][i].e_mail; //from DB
      let pass = results[0][i].password;//from DB

      while (i < results[0].length){
        try {
          if (await bcrypt.compare(req.body.password, pass) && login === req.body.email){
            UserName = await db.promise().query(`select first_name from Users where id = ${results[0][i].id}`);
            UserName = UserName[0][0].first_name;
            res.status(200).end();
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
  .get((req, res) => {
    res.render('index-login', {title: 'ОптПоставка', Name: UserName})
  });
  
export default router;