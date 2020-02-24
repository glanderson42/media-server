require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const _ = require('lodash');

const app = express();

mongoose.Promise = global.Promise;
const DATABASE_URL = process.env.DATABASE_URL || "mongodb://localhost:27017/mediaServer";
mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () =>  { console.log('Connected to the database') },
    (err) => { console.log('Can not connect the database! ' + err) }
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

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is listening on " + PORT)
})