/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getUsers, getUser, updateProfile, updateAvatar, getUserInfo } = require('../controllers/users');
const validations = require('../middlewares/validations');

router.get('/', getUsers);
router.get('/me', getUserInfo);
router.patch('/me', validations.userInfoValidate, updateProfile);
router.patch('/me/avatar', validations.userAvatarValidate, updateAvatar);
router.get('/:userId', validations.userIdValidate, getUser);

module.exports = router;
