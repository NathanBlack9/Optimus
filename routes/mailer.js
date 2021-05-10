import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.email,
    pass: process.env.password
  }
  },
  {
    from: `ОптПоставка ${process.env.email}`
  }
);

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if(err) return console.log(err);
    console.log('Email sent: ', info)
  })
}

export default mailer;