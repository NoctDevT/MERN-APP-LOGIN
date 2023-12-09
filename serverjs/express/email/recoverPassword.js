const emailTransporter = require('./emailInstance');

require('dotenv').config({ path: '../../.env' })

function SendRecoveryEmail(email, link) {


    const mailOptions = {
        from: process.env.MAILEMAIL, // sender address
        to: email, // list of receivers
        subject: "Password reset request", // Subject line
        html: `<p>Click <a href="${link}">here</a> to reset your password</p>`

    }

    emailTransporter.sendMail(mailOptions, (err, data) => {
        if (err) return console.log(err)
        console.log(data)
    });


}

function sendConfirmationEmail(email, message) {


    const mailOptions = {
        from: process.env.MAILEMAIL, // sender address
        to: email, // list of receivers
        subject: "Password has been changed", // Subject line
        html: `<p>${message}</p>`

    }

    emailTransporter.sendMail(mailOptions, (err, data) => {
        if (err) return console.log(err)
        console.log(data)
    });


}


module.exports = { SendRecoveryEmail, sendConfirmationEmail }