import express from 'express';
import bodyParser from 'body-parser';
import db from './db.js';
import bcrypt from 'bcrypt';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      let count = await db.promise().query(`select count(*) as count from basket where receipt_id = '${req.session.user.name}';`);
      count = count[0][0].count;
      
      let img = new Array(),
          productName = new Array(), 
          productBrand = new Array(),
          productModel = new Array(), 
          productCountry = new Array(),
          vendorCode = new Array(),
          productPrice = new Array(),
          productQuantity = new Array(),
          cache, quantity;
      // productsInBasket = await db.promise().query(`select * from Basket where receipt_id = ${req.session.user.name};`);
      
      cache = await db.promise().query(`select * from Products where vendor_code in (select vendor_code from basket where receipt_id = ${req.session.user.name})`)
      cache = cache[0];
      quantity = await db.promise().query(`select quantity from basket where vendor_code in (select vendor_code from basket where receipt_id = ${req.session.user.name});`);
      quantity = quantity[0];
      
      for (let i = 0; i < cache.length; i++) {
        vendorCode[i] = cache[i].vendor_code;
        img[i] = cache[i].img;
        productName[i] = cache[i].product_name;
        productBrand[i] = cache[i].brand;
        productModel[i] = cache[i].model;
        productCountry[i] = cache[i].country;
        productPrice[i] = cache[i].price;
        productQuantity[i] = quantity[i].quantity;
      }                   

      // console.log(productQuantity);

      let UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
      res.render('basket', {title: 'Корзина', Name: UserName,
        products: {
          code: vendorCode,
          img: img, 
          name: productName, 
          brand: productBrand,
          model: productModel,
          country: productCountry,
          price: productPrice,
          quantity: productQuantity,
          count: count
        } 
      });
    }
    else 
      res.status(404).render('404', {title: 'Не найдено'});
  });

export default router;