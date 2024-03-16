import nodemailer from "nodemailer";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_NAME_HOLL,
    pass: process.env.EMAIL_PASSWORD_HOLL,
  },
});

async function sendEmail(to, subject, text, html) {
  try {
    const mailOptions = await transporter.sendMail({
      from: `"Holl" <${process.env.EMAIL_NAME_HOLL}>`,
      to,
      subject,
      text,
      html,
    });
    console.log("Message sent: %s", mailOptions.messageId);
    return mailOptions;
  } catch (error) {
    return error;
  }
}

export default sendEmail;