import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import db from './db.js';
import mailer from './mailer.js';
import cryptoRandomString from 'crypto-random-string';

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .get(async (req, res) => {
    if (req.session.user) {
      let UserName = await db.promise().query(`select first_name from Users where id = ${req.session.user.name}`);
      UserName = UserName[0][0].first_name;
      res.status(200).render('delivery', {title: 'Оформление доставки', Name: UserName});
    }
    else 
      res.status(404).render('404', {title: 'Не найдено'});
  });


router
  .route('/')
  .post(urlencodedParser, async (req, res) => {
    try {
      const address = req.body.address;
      const date = req.body.date;
      let AllForDelivery = new Array(), 
      arr1= new Array(),
      arr2= new Array(),
      arr3= new Array(),
      arr4= new Array(),
      arr5= new Array(),
      arr6= new Array(),
      arr7= new Array();
      // let email = await db.promise().query(`select e_mail from Auth where id = ${req.session.user.name}`);
      // email = email[0][0].e_mail;
      
      // console.log(address, date, email);
      await db.promise().query(`insert into Delivery(receipt_id, address, delivery_date) values (${req.session.user.name}, '${address}', '${date}');`);
      AllForDelivery = await db.promise().query(`select Products.product_name, Products.brand, Products.model, Products.country, Basket.quantity from Products inner join Basket on Products.vendor_code = Basket.vendor_code where Basket.receipt_id = ${req.session.user.name};`);
      AllForDelivery = AllForDelivery[0];

        arr1[0] = AllForDelivery[0].product_name
        arr1[1] = AllForDelivery[0].brand
        arr1[2] = AllForDelivery[0].model
        arr1[3] = AllForDelivery[0].country
        arr1[4] = AllForDelivery[0].quantity

        arr2[0] = AllForDelivery[1].product_name
        arr2[1] = AllForDelivery[1].brand
        arr2[2] = AllForDelivery[1].model
        arr2[3] = AllForDelivery[1].country
        arr2[4] = AllForDelivery[1].quantity
        
        arr2[0] = AllForDelivery[1].product_name
        arr2[1] = AllForDelivery[1].brand
        arr2[2] = AllForDelivery[1].model
        arr2[3] = AllForDelivery[1].country
        arr2[4] = AllForDelivery[1].quantity

        arr3[0] = AllForDelivery[2].product_name
        arr3[1] = AllForDelivery[2].brand
        arr3[2] = AllForDelivery[2].model
        arr3[3] = AllForDelivery[2].country
        arr3[4] = AllForDelivery[2].quantity

        arr4[0] = AllForDelivery[3].product_name
        arr4[1] = AllForDelivery[3].brand
        arr4[2] = AllForDelivery[3].model
        arr4[3] = AllForDelivery[3].country
        arr4[4] = AllForDelivery[3].quantity

        arr5[0] = AllForDelivery[4].product_name
        arr5[1] = AllForDelivery[4].brand
        arr5[2] = AllForDelivery[4].model
        arr5[3] = AllForDelivery[4].country
        arr5[4] = AllForDelivery[4].quantity
        
        arr6[0] = AllForDelivery[5].product_name
        arr6[1] = AllForDelivery[5].brand
        arr6[2] = AllForDelivery[5].model
        arr6[3] = AllForDelivery[5].country
        arr6[4] = AllForDelivery[5].quantity

        arr7[0] = AllForDelivery[5].product_name
        arr7[1] = AllForDelivery[5].brand
        arr7[2] = AllForDelivery[5].model
        arr7[3] = AllForDelivery[5].country
        arr7[4] = AllForDelivery[5].quantity


      console.log(AllForDelivery[0].brand);
      
      let deliveryTotal = await db.promise().query(`select sum(price) as total from Products where vendor_code in (select vendor_code from Basket where receipt_id = ${req.session.user.name});`);
      deliveryTotal = deliveryTotal[0][0].total;

      const message = {
        to: `suren.khachatryan.99@mail.ru`,
        subject: 'Новый заказ',
        
        html: `<b>Новый заказ на ОптПоставка.ру</b>
        <p>Данные заказчика:</p>
        <p>Номер заказа в базе: ${req.session.user.name}</p>
        <p>Адрес доставки: ${address}</p>
        <p>Крайняя дата доставки: ${date}</p> 
        
        <p>Товары:</p>

        <p>Название товарa: ${arr1[0]} </p>
        <p>Марка товара: ${arr1[1]} </p>
        <p>Модель товара: ${arr1[2]} </p>
        <p>Страна товара: ${arr1[3]} </p>
        <p>Количество товара: ${arr1[4]} </p>
        <br><br>
        <p>Название товарa: ${arr2[0]} </p>
        <p>Марка товара: ${arr2[1]} </p>
        <p>Модель товара: ${arr2[2]} </p>
        <p>Страна товара: ${arr2[3]} </p>
        <p>Количество товара: ${arr2[4]} </p>
        <br><br>
        <p>Название товарa: ${arr3[0]} </p>
        <p>Марка товара: ${arr3[1]} </p>
        <p>Модель товара: ${arr3[2]} </p>
        <p>Страна товара: ${arr3[3]} </p>
        <p>Количество товара: ${arr3[4]} </p>
        <br><br>
        <p>Название товарa: ${arr4[0]} </p>
        <p>Марка товара: ${arr4[1]} </p>
        <p>Модель товара: ${arr4[2]} </p>
        <p>Страна товара: ${arr4[3]} </p>
        <p>Количество товара: ${arr4[4]} </p>
        <br><br>
        <p>Название товарa: ${arr5[0]} </p>
        <p>Марка товара: ${arr5[1]} </p>
        <p>Модель товара: ${arr5[2]} </p>
        <p>Страна товара: ${arr5[3]} </p>
        <p>Количество товара: ${arr5[4]} </p>
        <br><br>
        <p>Название товарa: ${arr6[0]} </p>
        <p>Марка товара: ${arr6[1]} </p>
        <p>Модель товара: ${arr6[2]} </p>
        <p>Страна товара: ${arr6[3]} </p>
        <p>Количество товара: ${arr6[4]} </p>
        <br><br>
        <p>Название товарa: ${arr7[0]} </p>
        <p>Марка товара: ${arr7[1]} </p>
        <p>Модель товара: ${arr7[2]} </p>
        <p>Страна товара: ${arr7[3]} </p>
        <p>Количество товара: ${arr7[4]} </p>
        <br><br>
        <p>Общая сумма заказа составяет: ${deliveryTotal} руб.</p>
        `
      }
      mailer(message);
      
      res.status(200).send('Спасибо за заказ!<br>Мы с вами свяжемся в ближайщее время');
    } catch (error) {
      console.log(error);
      res.status(500).send('Что-то пошло не так..<br> Проверьте наличие товаров в корзине и попробуйте снова');
    }
    
  })

export default router;