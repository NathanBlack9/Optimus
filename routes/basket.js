import bodyParser from 'body-parser';
import express, { response } from 'express';
import db from './db.js';

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

router
  .route('/clear')
  .post(urlencodedParser , async (req, res) => {
    let UserID = req.session.user.name;

    await db.promise().query(`delete from Basket where receipt_id = ${UserID};`);

    res.end();
  })
  
router
  .route('/add')
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

router
  .route('/remove')
  .post(urlencodedParser, async function(req, res) {
    let UserID = req.session.user.name;
    // console.log(req.body.vendor);
    await db.promise().query(`delete from basket where receipt_id = ${UserID} and vendor_code = ${req.body.vendor};`);
    res.end();
  })
export default router;