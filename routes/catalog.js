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
    let count = await db.promise().query(`SELECT count(*) as count FROM Products`);

    count = count[0][0].count;
    let img = new Array(),
        productName = new Array(), 
        productBrand = new Array(),
        productModel = new Array(), 
        productCountry = new Array(),
        vendorCode = new Array(),
        productPrice = new Array(),
        Brands = new Array(),
        Models = new Array(),
        Countrys = new Array(),
        cache;

    for (let i = 1; i < count + 1; i++) {
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

    //Brands
    let co = await db.promise().query(`SELECT COUNT( distinct brand ) as count FROM Products;`);
    co = co[0][0].count;
    for (let i = 0; i < co; i++) {
      cache = await db.promise().query(`select distinct brand from Products;`);
      Brands[i] = cache[0][i].brand;
    }

    //Countrys
    co = await db.promise().query(`SELECT COUNT( distinct country ) as count FROM Products;`);
    co = co[0][0].count;
    for (let i = 0; i < co; i++) {
      cache = await db.promise().query(`select distinct country from Products;`);
      Countrys[i] = cache[0][i].country;
    }

    //Models
    co = await db.promise().query(`SELECT COUNT( distinct model ) as count FROM Products;`);
    co = co[0][0].count;

    for (let j = 0; j < Brands.length; j++) {
      cache = await db.promise().query(`SELECT distinct model from Products where brand like '%${Brands[j]}%'`);  
      Models[j] = cache[0];
    }
    // console.log(Models);
    let UserName
    if (req.session.user) {
      UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
    }
    else UserName = ''

    res.render('catalog', {title: 'Каталог', Name: UserName, 
        products: {
          code: vendorCode,
          img: img, 
          name: productName, 
          brand: productBrand,
          model: productModel,
          country: productCountry,
          price: productPrice,
          count: count
        }, 
        filters: {
          brands: Brands,
          models: Models,
          countrys: Countrys
        } 
      });
  });

router
  .route('/filter')
  .post(urlencodedParser, async (req, res) => {
    // if (!req.body.select__brand) 
    console.log(req.body);

    let img = new Array(),
        productName = new Array(), 
        productBrand = new Array(),
        productModel = new Array(), 
        productCountry = new Array(),
        vendorCode = new Array(),
        productPrice = new Array(),
        Brands = new Array(),
        Models = new Array(),
        Countrys = new Array(),
        cache, count, filter;

    if (req.body.select__brand && req.body.select__model && req.body.select__country){
      //+++
      filter = `(price between ${req.body.from} and ${req.body.to}) and (brand like '%${req.body.select__brand}%') and (model like '%${req.body.select__model}%') and (country like '%${req.body.select__country}%')`;
      count = await db.promise().query(`SELECT count(*) as count FROM Products where ${filter};`);
      count = count[0][0].count;

      for (let i = 0; i < count; i++) {
        cache = await db.promise().query(`select vendor_code from Products where аvailability = 1 and ${filter};`);
        vendorCode[i] = cache[0][i].vendor_code;

        cache = await db.promise().query(`select img from Products where аvailability = 1 and ${filter};`);
        img[i] = cache[0][i].img;

        cache = await db.promise().query(`select product_name from Products where аvailability = 1 and ${filter};`);
        productName[i] = cache[0][i].product_name;
        
        cache = await db.promise().query(`select brand from Products where аvailability = 1 and ${filter};`);
        productBrand[i] = cache[0][i].brand;

        cache = await db.promise().query(`select model from Products where аvailability = 1 and ${filter};`);
        productModel[i] = cache[0][i].model;

        cache = await db.promise().query(`select country from Products where аvailability = 1 and ${filter};`);
        productCountry[i] = cache[0][i].country;

        cache = await db.promise().query(`select price from Products where аvailability = 1 and ${filter};`);
        productPrice[i] = cache[0][i].price;
      }
    }
    else 
      if (!req.body.select__brand) {
        if(!req.body.select__country) {
          //---
          filter = `(price between ${req.body.from} and ${req.body.to})`;
          count = await db.promise().query(`SELECT count(*) as count FROM Products where ${filter};`);
          count = count[0][0].count;

          for (let i = 0; i < count; i++) {
            cache = await db.promise().query(`select vendor_code from Products where аvailability = 1 and ${filter};`);
            vendorCode[i] = cache[0][i].vendor_code;
    
            cache = await db.promise().query(`select img from Products where аvailability = 1 and ${filter};`);
            img[i] = cache[0][i].img;
    
            cache = await db.promise().query(`select product_name from Products where аvailability = 1 and ${filter};`);
            productName[i] = cache[0][i].product_name;
            
            cache = await db.promise().query(`select brand from Products where аvailability = 1 and ${filter};`);
            productBrand[i] = cache[0][i].brand;
    
            cache = await db.promise().query(`select model from Products where аvailability = 1 and ${filter};`);
            productModel[i] = cache[0][i].model;
    
            cache = await db.promise().query(`select country from Products where аvailability = 1 and ${filter};`);
            productCountry[i] = cache[0][i].country;
    
            cache = await db.promise().query(`select price from Products where аvailability = 1 and ${filter};`);
            productPrice[i] = cache[0][i].price;
          }
        }
        else {
          //--+
          filter = `(price between ${req.body.from} and ${req.body.to}) and (country like '%${req.body.select__country}%')`
          count = await db.promise().query(`SELECT count(*) as count FROM Products where ${filter};`);
          count = count[0][0].count;

          for (let i = 0; i < count; i++) {
            cache = await db.promise().query(`select vendor_code from Products where аvailability = 1 and ${filter};`);
            vendorCode[i] = cache[0][i].vendor_code;
    
            cache = await db.promise().query(`select img from Products where аvailability = 1 and ${filter};`);
            img[i] = cache[0][i].img;
    
            cache = await db.promise().query(`select product_name from Products where аvailability = 1 and ${filter};`);
            productName[i] = cache[0][i].product_name;
            
            cache = await db.promise().query(`select brand from Products where аvailability = 1 and ${filter};`);
            productBrand[i] = cache[0][i].brand;
    
            cache = await db.promise().query(`select model from Products where аvailability = 1 and ${filter};`);
            productModel[i] = cache[0][i].model;
    
            cache = await db.promise().query(`select country from Products where аvailability = 1 and ${filter};`);
            productCountry[i] = cache[0][i].country;
    
            cache = await db.promise().query(`select price from Products where аvailability = 1 and ${filter};`);
            productPrice[i] = cache[0][i].price;
          }
        }
      }
      else {

        if (req.body.select__model){
          if(!req.body.select__country) 
            //++-
            filter = `(price between ${req.body.from} and ${req.body.to}) and (brand like '%${req.body.select__brand}%') and (model like '%${req.body.select__model}%')`;
            count = await db.promise().query(`SELECT count(*) as count FROM Products where ${filter};`);
            count = count[0][0].count;

            for (let i = 0; i < count; i++) {
              cache = await db.promise().query(`select vendor_code from Products where аvailability = 1 and ${filter};`);
              vendorCode[i] = cache[0][i].vendor_code;
      
              cache = await db.promise().query(`select img from Products where аvailability = 1 and ${filter};`);
              img[i] = cache[0][i].img;
      
              cache = await db.promise().query(`select product_name from Products where аvailability = 1 and ${filter};`);
              productName[i] = cache[0][i].product_name;
              
              cache = await db.promise().query(`select brand from Products where аvailability = 1 and ${filter};`);
              productBrand[i] = cache[0][i].brand;
      
              cache = await db.promise().query(`select model from Products where аvailability = 1 and ${filter};`);
              productModel[i] = cache[0][i].model;
      
              cache = await db.promise().query(`select country from Products where аvailability = 1 and ${filter};`);
              productCountry[i] = cache[0][i].country;
      
              cache = await db.promise().query(`select price from Products where аvailability = 1 and ${filter};`);
              productPrice[i] = cache[0][i].price;
            }
        }
        else if (req.body.select__country){
          //+-+
          filter = `(price between ${req.body.from} and ${req.body.to}) and (brand like '%${req.body.select__brand}%') and (country like '%${req.body.select__country}%')`
          count = await db.promise().query(`SELECT count(*) as count FROM Products where ${filter};`);
          count = count[0][0].count;

          for (let i = 0; i < count; i++) {
            cache = await db.promise().query(`select vendor_code from Products where аvailability = 1 and ${filter};`);
            vendorCode[i] = cache[0][i].vendor_code;
    
            cache = await db.promise().query(`select img from Products where аvailability = 1 and ${filter};`);
            img[i] = cache[0][i].img;
    
            cache = await db.promise().query(`select product_name from Products where аvailability = 1 and ${filter};`);
            productName[i] = cache[0][i].product_name;
            
            cache = await db.promise().query(`select brand from Products where аvailability = 1 and ${filter};`);
            productBrand[i] = cache[0][i].brand;
    
            cache = await db.promise().query(`select model from Products where аvailability = 1 and ${filter};`);
            productModel[i] = cache[0][i].model;
    
            cache = await db.promise().query(`select country from Products where аvailability = 1 and ${filter};`);
            productCountry[i] = cache[0][i].country;
    
            cache = await db.promise().query(`select price from Products where аvailability = 1 and ${filter};`);
            productPrice[i] = cache[0][i].price;
          }
        } else {
          //+--
          filter = `(price between ${req.body.from} and ${req.body.to}) and (brand like '%${req.body.select__brand}%')`;
          count = await db.promise().query(`SELECT count(*) as count FROM Products where ${filter};`);
          count = count[0][0].count;

          for (let i = 0; i < count; i++) {
            cache = await db.promise().query(`select vendor_code from Products where аvailability = 1 and ${filter};`);
            vendorCode[i] = cache[0][i].vendor_code;

            cache = await db.promise().query(`select img from Products where аvailability = 1 and ${filter};`);
            img[i] = cache[0][i].img;

            cache = await db.promise().query(`select product_name from Products where аvailability = 1 and ${filter};`);
            productName[i] = cache[0][i].product_name;
            
            cache = await db.promise().query(`select brand from Products where аvailability = 1 and ${filter};`);
            productBrand[i] = cache[0][i].brand;

            cache = await db.promise().query(`select model from Products where аvailability = 1 and ${filter};`);
            productModel[i] = cache[0][i].model;

            cache = await db.promise().query(`select country from Products where аvailability = 1 and ${filter};`);
            productCountry[i] = cache[0][i].country;

            cache = await db.promise().query(`select price from Products where аvailability = 1 and ${filter};`);
            productPrice[i] = cache[0][i].price;
          }
        }
      }
    
    // console.log(count, vendorCode, productModel);

    //Brands
    let co = await db.promise().query(`SELECT COUNT( distinct brand ) as count FROM Products;`);
    co = co[0][0].count;
    for (let i = 0; i < co; i++) {
      cache = await db.promise().query(`select distinct brand from Products;`);
      Brands[i] = cache[0][i].brand;
    }
    //

    //Countrys
    co = await db.promise().query(`SELECT COUNT( distinct country ) as count FROM Products;`);
    co = co[0][0].count;
    for (let i = 0; i < co; i++) {
      cache = await db.promise().query(`select distinct country from Products;`);
      Countrys[i] = cache[0][i].country;
    }

    //Models
    co = await db.promise().query(`SELECT COUNT( distinct model ) as count FROM Products;`);
    co = co[0][0].count;
    for (let j = 0; j < Brands.length; j++) {
      cache = await db.promise().query(`SELECT distinct model from Products where brand like '%${Brands[j]}%'`);  
      Models[j] = cache[0];
    }
    // console.log(Models);
    let Username

    if (req.session.user) {
      Username = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      Username = Username[0][0].first_name;
    }
    else {
      Username = '';
    }

    res.status(200);
    res.render('catalog', {title: 'Каталог', Name: Username, 
        products: {
          code: vendorCode,
          img: img, 
          name: productName, 
          brand: productBrand,
          model: productModel,
          country: productCountry,
          price: productPrice,
          count: count
        }, 
        filters: {
          brands: Brands,
          models: Models,
          countrys: Countrys
        } 
      });
  });

router
  .route('/search')
  .get(async (req, res) => {
    // console.log(req.query);
    let img = new Array(),
        productName = new Array(), 
        productBrand = new Array(),
        productModel = new Array(), 
        productCountry = new Array(),
        vendorCode = new Array(),
        productPrice = new Array(),
        Brands = new Array(),
        Models = new Array(),
        Countrys = new Array(),
        cache, count, search;

    const query = `Products where product_name like "%${req.query.search}%" or brand like "%${req.query.search}%" or model like "%${req.query.search}%" or country like "%${req.query.search}%";`
    count = await db.promise().query(`SELECT count(*) as count FROM ${query}`);
    count = count[0][0].count;

    search = await db.promise().query(`SELECT * FROM ${query}`)
    search = search[0];
    
    for (let i = 0; i < search.length; i++) {
      vendorCode[i] = search[i].vendor_code;
      img[i] = search[i].img;
      productName[i] = search[i].product_name;
      productBrand[i] = search[i].brand;
      productModel[i] = search[i].model;
      productCountry[i] = search[i].country;
      productPrice[i] = search[i].price;
    }          
    console.log(productPrice);

    //Brands
    let co = await db.promise().query(`SELECT COUNT( distinct brand ) as count FROM Products;`);
    co = co[0][0].count;
    for (let i = 0; i < co; i++) {
      cache = await db.promise().query(`select distinct brand from Products;`);
      Brands[i] = cache[0][i].brand;
    }
    //

    //Countrys
    co = await db.promise().query(`SELECT COUNT( distinct country ) as count FROM Products;`);
    co = co[0][0].count;
    for (let i = 0; i < co; i++) {
      cache = await db.promise().query(`select distinct country from Products;`);
      Countrys[i] = cache[0][i].country;
    }

    //Models
    co = await db.promise().query(`SELECT COUNT( distinct model ) as count FROM Products;`);
    co = co[0][0].count;
    for (let j = 0; j < Brands.length; j++) {
      cache = await db.promise().query(`SELECT distinct model from Products where brand like '%${Brands[j]}%'`);  
      Models[j] = cache[0];
    }
    // console.log(Models);
    let UserName
    if (req.session.user) {
      UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
    }
    else {
      UserName = '';
    }

    res.status(200);
    res.render('catalog', {title: 'Каталог', Name: UserName, 
        products: {
          code: vendorCode,
          img: img, 
          name: productName, 
          brand: productBrand,
          model: productModel,
          country: productCountry,
          price: productPrice,
          count: count
        }, 
        filters: {
          brands: Brands,
          models: Models,
          countrys: Countrys
        } 
      });
  });

// router
//   .route('/logined')
//   .get((req, res) => {
//     res.render('catalog_logined', {title: 'Каталог'})
//   });

export default router;