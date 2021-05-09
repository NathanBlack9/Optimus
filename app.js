import express from 'express';
import path from 'path';
//--contact-form
import contact from './routes/contact.js';
//--login-form
import auth from './routes/auth.js';

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

app
  .route('/register')
  .get((req, res) => {
    res.render('register', {title: 'Регистрация'})
  });

//-------

app.use(express.json());
app.use('/login', auth);
app.use('/contact', contact);


app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});