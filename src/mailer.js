import nodemailer from 'nodemailer';

function setup() {
  const config = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: process.env.MAILER_PORT,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });
  return config;
}

export default function sendConfirmationEmail(user) {
  const transport = setup();
  const email = {
    to: user.email,
    subject: 'Welcome to Task Tracker',
    text: `
      Welcome to Task Tracker. Please confirm your email.
      ${user.generateConfirmationUrl()}`,
  };
  transport.sendMail(email);
}
