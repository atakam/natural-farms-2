const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('../app/api/user');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/user/new', userRouter.newUser);
app.post('/user/login', userRouter.login);
app.get('/user/logout', userRouter.logout);
app.get('/user/authenticated', userRouter.authenticated);

module.exports = app;