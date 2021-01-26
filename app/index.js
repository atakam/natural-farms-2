const express = require('express');
const cors = require('cors');
const path = require('path');

const customerRouter = require('./api/customer');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

// const ORIGIN = 'https://sihone-app-client-demo.herokuapp.com';
// app.use(cors({origin: ORIGIN, credentials: true}));
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

app.use('/customer', customerRouter);

module.exports = app;