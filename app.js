import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import path from 'path';
//--first-page-feedbacks
import index from './routes/index.js';
//--contact-form
import contact from './routes/contact.js';
//--catalog
import catalog from './routes/catalog.js';
//--login-form
import auth from './routes/auth.js';
//--register-form
import register from './routes/register.js';
//--restore-form
import restore from './routes/restore.js';


const __dirname = path.resolve();
const port = process.env.port || 8080;
const app = express();

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/build'));
app.use('/styles', express.static(__dirname + '/build/styles'))

app.use(
  session({
  secret: '123abc',
  resave: false,
  saveUninitialized: false
}));

//-------

app.use(express.json());
app.use('/', index);
app.use('/catalog', catalog);
app.use('/contact', contact);
app.use('/login', auth);
app.use('/register', register);
app.use('/restore', restore);

app.get('/logout', function(req, res){
  req.session.destroy(function(){
     console.log("user logged out.");
     console.log(req.session);
  });
  res.redirect('/');
});
// app.use(connect.cookieParser());
// app.use(connect.session({ secret: 'your secret here'} ));

// app.use(cookieParser());
// app.use(
//   session({
//   secret: '123abc',
//   resave: false,
//   saveUninitialized: false
// }));

// app.get('/', function(req, res){
//    if(req.session.page_views){
//       req.session.page_views++;
//       res.send("You visited this page " + req.session.page_views + " times");
//    } else {
//       req.session.page_views = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });


app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});