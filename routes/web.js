const express = require('express');
const emailService = require('../services/mailService');
const router = express.Router();

//....... User Submit Query API in webite ......

router.post("/submit-query", (req, res) => {
    const resData = {};
    if (req.body.mail && req.body.mobileNumber) {
        let context = {
            name: req.body.name,
            email: req.body.mail,
            phone: req.body.mobileNumber,
            message: req.body.message
        }
        emailService.mail(context, 'submit-query').then((mailRes) => {
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


//....... User Submit Details API  ......

router.post("/details-query", (req, res) => {
    var context = {};
    const resData = {};
    if (req.body) {
        context = {
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            institution: req.body.institution,
            department: req.body.department,
            year: req.body.year,
            idUpload: req.body.idUpload,
            interestedTopic: req.body.interestedTopic,
            requirement: req.body.requirement,
            researchTopic: req.body.researchTopic,
            category : req.body.category
        };

        emailService.mail(context, 'details-query').then((mailRes) => {
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
