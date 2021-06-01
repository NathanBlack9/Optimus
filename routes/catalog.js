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
  .get(async (req, res) => {
    const Products = await db.promise().query(`select img, product_name, brand, model, country, price from Products where аvailability = 1;`);
    let count = await db.promise().query(`SELECT count(*) as count FROM Products`);

    count = count[0][0].count;
    let img = new Array(),
        productName = new Array(), 
        productBrand = new Array(),
        productModel = new Array(), 
        productCountry = new Array(),
        vendorCode = new Array(),
        productPrice = new Array();

    for (let i = 1; i < count + 1; i++) {
      let cache;
      cache = await db.promise().query(`select vendor_code from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      vendorCode[i-1] = cache[0][0].vendor_code;

      cache = await db.promise().query(`select img from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      img[i-1] = cache[0][0].img;

      cache = await db.promise().query(`select product_name from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      productName[i-1] = cache[0][0].product_name;
      
      cache = await db.promise().query(`select brand from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      productBrand[i-1] = cache[0][0].brand;

      cache = await db.promise().query(`select model from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      productModel[i-1] = cache[0][0].model;

      cache = await db.promise().query(`select country from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      productCountry[i-1] = cache[0][0].country;

      cache = await db.promise().query(`select price from Products where vendor_code = ${99 + i} and аvailability = 1;`);
      productPrice[i-1] = cache[0][0].price;
    }           
    

    if (req.session.user) {
        res.render('catalog', {title: 'Каталог', Name: req.session.user.name, 
        products: {
          code: vendorCode,
          img: img, 
          name: productName, 
          brand: productBrand,
          model: productModel,
          country: productCountry,
          price: productPrice,
          count: count
        } 
      });
    }
    else {
      res.render('catalog', {title: 'Каталог', Name: '', 
        products: {
          code: vendorCode,
          img: img, 
          name: productName, 
          brand: productBrand,
          model: productModel,
          country: productCountry,
          price: productPrice,
          count: count
        } 
      });
    }

    
  });

// router
//   .route('/logined')
//   .get((req, res) => {
//     res.render('catalog_logined', {title: 'Каталог'})
//   });

export default router;