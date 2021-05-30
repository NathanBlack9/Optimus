import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import db from './db.js';
import mailer from './mailer.js';
import cryptoRandomString from 'crypto-random-string';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

router
  .route('/')
  .get((req, res) => {
    res.render('catalog', {title: 'Каталог'})
  });

router
  .route('/logined')
  .get((req, res) => {
    res.render('catalog_logined', {title: 'Каталог'})
  });
export default router;