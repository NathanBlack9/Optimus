import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, async (req, res) => {
    const sessionUserId = req.session.user.name; //это также является номером заказа, так как записывается как внутри try

    let alreadyInBasket = await db.promise().query(`select * from Basket where receipt_id = ${sessionUserId} and vendor_code = ${req.body.vendor}`);
    alreadyInBasket =  alreadyInBasket[0][0];

    try {
      await db.promise().query(`insert into receipt values (${sessionUserId}, ${sessionUserId})`); 
      
      if (alreadyInBasket) {
        await db.promise().query(`update Basket set quantity = quantity + 1 where receipt_id = ${sessionUserId} and vendor_code = ${req.body.vendor};`); 
      }
      else
        await db.promise().query(`insert into basket(receipt_id, vendor_code) values (${sessionUserId}, ${req.body.vendor})`); 

    } catch (error) {
      if (alreadyInBasket) {
        await db.promise().query(`update Basket set quantity = quantity + 1 where receipt_id = ${sessionUserId} and vendor_code = ${req.body.vendor};`); 
      }
      else
        await db.promise().query(`insert into basket(receipt_id, vendor_code) values (${sessionUserId}, ${req.body.vendor})`); 
    }
    res.end('успешно')
  })

export default router;