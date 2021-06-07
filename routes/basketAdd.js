import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, async (req, res) => {
    // console.log(req.body.vendor); //код добавленного товара
    const sessionUserId = req.session.user.name;
    let userId, receiptId;
    try {
      await db.promise().query(`insert into receipt values (${sessionUserId}, ${sessionUserId})`); 
      receiptId = await db.promise().query(`select receipt_id from Receipt where user_id = ${sessionUserId}`); 
      receiptId = receiptId[0][0].receipt_id;
      // console.log(receiptId);
      await db.promise().query(`insert into basket(receipt_id, vendor_code) values (${receiptId}, ${req.body.vendor})`); 
    } catch (error) {
      receiptId = await db.promise().query(`select receipt_id from Receipt where user_id = ${sessionUserId}`); 
      receiptId = receiptId[0][0].receipt_id;
      console.log(receiptId);
      await db.promise().query(`insert into basket(receipt_id, vendor_code) values (${receiptId}, ${req.body.vendor})`); 
    }
    res.end('успешно')
  })



export default router;