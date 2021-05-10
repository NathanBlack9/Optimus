import express from 'express';
import bodyParser from 'body-parser';
import mailer from './mailer.js'

const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, (req, res) => {
    // console.log(req.body);//само сообщение
    const message = {
      to: 'suren.khachatryan.99@mail.ru',
      subject: 'Ответный звонок',
      text: `Свяжитесь со мной!
       Мои данные:
       Имя: ${req.body.name}
       Почта: ${req.body.email}
       Телефон: ${req.body.tel}
       Сообщение: ${req.body.text}`
    }
    mailer(message)

    res.status(202).end('Ваша заявка успешно отправлена!<br> Продавец связжется с вами в ближайщее время');
  });

export default router;

