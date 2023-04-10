const nodemailer = require('nodemailer');
const auth = require('../config/auth');
const hbs = require('nodemailer-express-handlebars')
const path = require('path');

function sendMail(context, type) {

    return new Promise((resolve, reject) => {
        const resData = {};
        let transporter = nodemailer.createTransport({
            service: auth.mail.service_provider,
            auth: {
                user: auth.mail.mailId,
                pass: auth.mail.pasword
            }
        });

        var mailOptions = {}

        // point to the template folder
        const handlebarOptions = {
            viewEngine: {
                partialsDir: path.resolve('./views/'),
                defaultLayout: false,
                extName: '.handlebars',

            },
            viewPath: path.resolve('./views/'),
            extName: '.handlebars',
        };

        // use a template file with nodemailer
        transporter.use('compile', hbs(handlebarOptions))

        mailOptions = {
            from: auth.mail.from_mail_id,
            to: auth.mail.from_mail_id,
            subject: 'New Query',
            template: 'email',
            context: context
        };

        if (context.idUpload) {
            mailOptions.attachments = [
                { filename: `${new Date().getTime()}.png`, path: context.idUpload }
            ]
        }

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

