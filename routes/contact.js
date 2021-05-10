import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
const urlencodedParser = bodyParser.urlencoded({ extended: false })

router
  .route('/')
  .post(urlencodedParser, (req, res) => {
    console.log(req.body);//само сообщение
    var message = 'Ваша заявка успешно отправлена!<br> Продавец связжется с вами в ближайщее время';
    res.status(202).end(message);
  });

export default router;

