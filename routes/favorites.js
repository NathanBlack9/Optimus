import express from 'express';
import db from './db.js';

const router = express.Router();

router
  .route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      let UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;

      res.render('favorites', {title: 'Избранное',  Name: UserName})
    }
    else 
      res.status(404).render('404', {title: 'Не найдено'});
  })

export default router;