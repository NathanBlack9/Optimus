// const mysql = require('mysql');
import express from 'express';
import path from 'path';
//--contact-form
import contact from './routes/contact.js';
//--login-form
import login from './routes/login.js';

const __dirname = path.resolve();
const port = process.env.port || 8080;
const app = express();


app.use(express.static(__dirname + '/build'));
app.use('/styles', express.static(__dirname + 'build/styles'))

app.set('view engine', 'ejs')

app
  .route('/')
  .get((req, res) => {
    res.render('index', {title: 'ОптПоставка'})
  });

app
  .route('/catalog')
  .get((req, res) => {
    res.render('catalog', {title: 'Каталог'})
  });

// app
//   .route('/login')
//   .post((req, res) => {
//     res.render('index-login', {title: 'ОптПоставка'})
//   })

//-------
// app.use(express.json());

app.use('/login', login);
app.use('/contact', contact);

// app
//   .route('/logined')
//   .get((req, res) => {
//     res.render('index-login', {title: 'ОптПоставка'})
//   })

//-------
// app.get('/', (req,res) =>{
//   // res.send('asdas'); //сообщение
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html')); //файл
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

// app.use(static(__dirname + '/build'));



