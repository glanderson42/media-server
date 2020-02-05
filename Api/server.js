require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const bodyParser = require('body-parser');

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.use(bodyParser.json());

var routes = require('./routes/userRoutes');
routes(app);

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log("Server is listening on " + PORT)
})