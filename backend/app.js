const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();
const { PORT = 3000 } = process.env;
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const validations = require('./middlewares/validations');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://themestechko.students.nomoredomains.work',
  credentials: true,
}));
app.use(requestLogger);

app.post('/signup', validations.signupValidate, createUser);
app.post('/signin', validations.signinValidate, login);
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((req, res, next) => {
  next(new NotFoundError('Не могу найти!'));
});
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.log(err.stack || err);
  const status = err.statusCode || 500;

  res.status(status).send({ message: err.message, err });
});
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
