const express = require('express');
const bodyParser = require('body-parser');
const customerRouter = require('../app/api/customer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/customer/new', customerRouter.newCustomer);

module.exports = app;