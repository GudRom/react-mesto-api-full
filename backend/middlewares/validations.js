const { celebrate, Joi, Segments } = require('celebrate');
const validator = require('validator');
// eslint-disable-next-line no-useless-escape
const regex = /^https?:\/\/([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$/i;

const signupValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    // eslint-disable-next-line consistent-return
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }),
    // eslint-disable-next-line consistent-return
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Короткий пароль',
    }),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom((value, helper) => {
      if (!regex.test(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }),
  }),
});

const signinValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    // eslint-disable-next-line consistent-return
    email: Joi.string().required().custom((value, helper) => {
      if (!validator.isEmail(value)) {
        return helper.error('string.notEmail');
      }
      return value;
    }),
    // eslint-disable-next-line consistent-return
    password: Joi.string().required().messages({
      'any.required': 'Пароль не указан',
      'string.min': 'Короткий пароль',
    }),
  }),
});

const userInfoValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
});

const userAvatarValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    avatar: Joi.string().required().custom((value, helper) => {
      if (!regex.test(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }),
  }),
});

const userIdValidate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

const cardValidate = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    // eslint-disable-next-line consistent-return
    link: Joi.string().required().custom((value, helper) => {
      if (!regex.test(value)) {
        return helper.error('string.notURL');
      }
      return value;
    }),
  }),
});

const cardIdValidate = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    cardId: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  signupValidate,
  signinValidate,
  userInfoValidate,
  userAvatarValidate,
  userIdValidate,
  cardValidate,
  cardIdValidate,
};
