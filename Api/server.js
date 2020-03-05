require('dotenv').config();

const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect(config.databaseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () =>  { 
        console.log('Connected to the database')
    },
    (err) => {
        console.log('Can not connect the database! ' + err)
    }
);

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());
app.use(morgan('dev'));

var routes = require('./routes/userRoutes');
var auth = require('./routes/userAuth');
routes(app);
auth(app);

app.listen(config.port, () => {
    console.log("Server is listening on " + config.port)
})