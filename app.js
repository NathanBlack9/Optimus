import express from 'express';
import path from 'path';
//--first-page-feedbacks
import index from './routes/index.js';
//--contact-form
import contact from './routes/contact.js';
//--login-form
import auth from './routes/auth.js';
//--register-form
import register from './routes/register.js';
//--restore-form
import restore from './routes/restore.js';


const __dirname = path.resolve();
const port = process.env.port || 3000;
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/build'));
app.use('/styles', express.static(__dirname + '/build/styles'))

app
  .route('/catalog')
  .get((req, res) => {
    res.render('catalog', {title: 'Каталог'})
  });

//-------

app.use(express.json());
app.use('/', index);
app.use('/contact', contact);
app.use('/login', auth);
app.use('/register', register);
app.use('/restore', restore);


app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});