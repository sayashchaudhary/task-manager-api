const sgMail = require('@sendgrid/mail')
const res = require("express");

const sendgridAPIKey = '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';
sgMail.setApiKey(sendgridAPIKey);

const msg = {
    to: 'learnmorewithsaysh@gmail.com',
    form: 'sayashchaudhary@gmail.com',
    subject: 'this is my first creation',
    text: 'I hope this is actually gets to you'
}


sgMail.send(msg);

