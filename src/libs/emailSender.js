// En /src/libs/emailSender.js
import nodemailer from 'nodemailer';
import { nodemailerdata } from "../config.js";

const transporter = nodemailer.createTransport({
  service: 'gmail', // O tu proveedor de servicios de correo electrónico
  auth: {
    user: nodemailerdata.email, // Definido en tu archivo .env
    pass: nodemailerdata.password, // Definido en tu archivo .env
  },
});

const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: nodemailerdata.email,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error al enviar el email:", error);
    throw error; // Relanza el error para manejarlo en el nivel superior
  }
};

export default  sendEmail;
