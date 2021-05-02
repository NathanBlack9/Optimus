// const mysql = require('mysql');
import express from 'express';
import path from 'path';
import serverRoutes from './routes/servers.js';

const __dirname = path.resolve();
const port = process.env.port || 3000;
const app = express();

app.use(express.static(__dirname + '/build'));
app.use('/styles', express.static(__dirname + 'build/styles'))

app.set('view engine', 'ejs')


app.use(serverRoutes);

app.get('/', (req, res) => {
  res.render('index', {title: 'ОптПоставка'})
})

app.get('/catalog', (req, res) => {
  res.render('catalog', {title: 'Каталог'})
})

// app.get('/', (req,res) =>{
//   // res.send('asdas'); //сообщение
//   res.sendFile(path.resolve(__dirname, 'build', 'index.html')); //файл
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

// app.use(static(__dirname + '/build'));



