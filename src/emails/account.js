const sgMail = require('@sendgrid/mail')
const res = require("express");

const sendgridAPIKey = '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';
sgMail.setApiKey(sendgridAPIKey);

const msg = {
    to: 'learnmorewithsaysh@gmail.com',
    form: 'sayashchaudhary@gmail.com',
    name: 'sayash',
    subject: 'this is my first creation',
    text: 'I hope this is actually gets to you'
}


    // sgMail.send(msg);


    sgMail
        .send(msg)
        .then(() => {}, error => {
            console.error(error);

            if (error.response) {
                console.error(error.response.body)
            }
        });

    // (async () => {
    //     try {
    //         await sgMail.send(msg);
    //     } catch (error) {
    //         console.error(error);
    //
    //         if (error.response) {
    //             console.error(error.response.body)
    //         }
    //     }
    // })
