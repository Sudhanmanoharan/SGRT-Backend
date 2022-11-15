const express = require('express');
const emailService = require('../services/mailService');
const router = express.Router();

//....... User Submit Query API in webite ......

router.post("/submit-query", (req, res) => {
    const resData = {};
    if (req.body.mail && req.body.mobileNumber) {
        const userDetails =
            'Hi,' +
            '<br>' +
            'You have new query request.' +
            '<br>' +
            '<br>' +
            '<div>' +
            ' <b> Name : ' + req.body.name + '</b>' +
            ' <br> ' +
            ' <b> Email : ' + req.body.mail + '</b>' +
            ' <br> ' +
            ' <b> Mobile Number : ' + `<a href="tel:+91${req.body.mobileNumber}"> ` + req.body.mobileNumber + '</a>' +
            '</b>' +
            ' <b> Message : ' + req.body.message + '</b>' +
            '</div>' +
            '<br>' +
            'Thanks,' +
            '<br>' +
            'Structural Glass Research and Testing (SGRT) Facility'

        emailService.mail(userDetails).then((mailRes) => {
            resData.result = 'Success';
            resData.message = 'SGRT team will contact you regarding your query shortly';
            res.send(resData);
        }, (err) => {
            resData.result = 'Failure';
            resData.message = err;
            res.send(resData);
        });
    }
});

module.exports = router;
