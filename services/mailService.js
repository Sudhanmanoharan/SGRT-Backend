const nodemailer = require('nodemailer');
const auth = require('../config/auth');

function sendMail(htmlDetails) {

    return new Promise((resolve, reject) => {
        const resData = {};
        let transporter = nodemailer.createTransport({
            service: auth.mail.service_provider,
            auth: {
                user: auth.mail.mailId,
                pass: auth.mail.pasword
            }
        });

        let mailOptions = {
            from: auth.mail.from_mail_id,
            to: auth.mail.from_mail_id,
            subject: 'New Query',
            html: htmlDetails
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                resData.result = 'Failure';
                reject(resData);
            } else {
                resData.result = 'Success';
                resolve(resData);
            }
        });
    });
}

module.exports = {
    mail: sendMail
};

