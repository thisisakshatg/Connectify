const nodemailer = require('nodemailer');

module.exports = class Email {
  constructor(user, url, message) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.message = message;
    this.from =
      process.env.NODE_ENV === 'development'
        ? `Akshat Gupta <${process.env.EMAIL_FROM}>`
        : `${process.env.SENDGRID_EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(subject) {
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: this.message,
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendPasswordReset() {
    await this.send('Password Reset Token(valid for 10 mins)');
  }
};
