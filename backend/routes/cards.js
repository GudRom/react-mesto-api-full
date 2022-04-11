/* eslint-disable object-curly-newline */
const router = require('express').Router();
const { getCards, deleteCard, createCard, likeCard, dislikeCard } = require('../controllers/cards');
const validations = require('../middlewares/validations');

router.get('/', getCards);
router.delete('/:cardId', validations.cardIdValidate, deleteCard);
router.post('/', validations.cardValidate, createCard);
router.put('/:cardId/likes', validations.cardIdValidate, likeCard);
router.delete('/:cardId/likes', validations.cardIdValidate, dislikeCard);

module.exports = router;
