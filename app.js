import express from 'express';
import path from 'path';
//--contact-form
import contact from './routes/contact.js';
//--login-form
import auth from './routes/auth.js';
//--register-form
import register from './routes/register.js';

const __dirname = path.resolve();
const port = process.env.port || 8080;
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/build'));
// server.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/styles', express.static(__dirname + '/build/styles'))


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


//-------

app.use(express.json());
app.use('/contact', contact);
app.use('/login', auth);
app.use('/register', register);


app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});