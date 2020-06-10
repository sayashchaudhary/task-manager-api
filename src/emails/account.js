const sgMail = require('@sendgrid/mail')
const res = require("express");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sayashchaudhary@gmail.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}. Let me know how to get along the app.`
    })
}

const cancellationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sayashchaudhary@gmail.com',
        subject: 'It feels sad you are leaving the app',
        text: `${name}, its feels sad you are the leaving the app`
    })
}

module.exports = {
    sendWelcomeEmail,
    cancellationEmail
}
