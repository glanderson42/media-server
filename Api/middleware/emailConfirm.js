const nodemailer = require('nodemailer');
var User = require('../models/User');

const smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'nodejsemailbot@gmail.com',
        pass: 'Almafa1234'
    }
});

exports.sendConfirmationMail = (user, host) => {
    const link = "http://" + host + "/verify?id=" + user._id;
    let info = smtpTransport.sendMail({
        from: "nodejsemailbot@gmail.com",
        to: user.email,
        subject: "Email confirm",
        text: link
    });

    console.log('Message sent: %s', info.messageId);
}