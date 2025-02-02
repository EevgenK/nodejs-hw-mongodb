import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { getEnvVar } from './getEnvVar.js';

const transporter = nodemailer.createTransport({
  host: getEnvVar(SMTP.SMTP_HOST),
  port: Number(getEnvVar(SMTP.SMTP_PORT)),
  //secure: false, // true for port 465, false for other ports
  // secure: false,
  auth: {
    user: getEnvVar(SMTP.SMTP_USER),
    pass: getEnvVar(SMTP.SMTP_PASSWORD),
  },
});
/*Checking errors in transporter*/
// transporter.verify(function (error, success) {
//   if (error) {
//     console.log('ПОМИЛКА-', error);
//   } else {
//     console.log('Server is ready to take our messages');
//   }
// });
export const sendEmail = async (options) => {
  return await transporter.sendMail(options);
};
