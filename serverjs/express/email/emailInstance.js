const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../../.env' })

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAILEMAIL,
        pass: process.env.MAILPASS
    },
    //only for development on a server without valid certificate
    tls: {
        rejectUnauthorized: false
    }
})


module.exports = transporter

    // let info = await transporter.sendMail(options);


    // console.log("Message sent: " + info.messageId)







