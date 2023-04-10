const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const web = require('./routes/web');
const app = express();

const PORT = process.env.PORT|| 3000;

app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/api', web);

app.listen(PORT, () => console.log(chalk.bgBlue(chalk.white(` Example app listening on port  ${PORT}!`))));
