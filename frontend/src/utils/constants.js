export const ESC_CODE = "Escape";
export const addButton = document.querySelector('.wanderer__add-button');
export const editButton = document.querySelector('.wanderer__edit-button');
export const editAvatarButton = document.querySelector('.wanderer__avatar-box');
export const formPopup = document.querySelector('[name=edit-profile]');
export const inputName = formPopup.querySelector('[name=name]');
export const inputJob = formPopup.querySelector('[name=about]');
export const formEditCard = document.querySelector('[name=edit-profile]');
export const formAddCard = document.querySelector('[name=add-card]');
export const formEditAvatar = document.querySelector('[name=edit-avatar]');
export const inputTitle = document.querySelector('[name=input-title]');
export const inputURL = document.querySelector('[name=input-url]');
export const saveButtons = document.querySelectorAll('.popup__save-button')
export const userProfile = {
    name: '.wanderer__name',
    about: '.wanderer__subtitle',
    avatar: '.wanderer__avatar'
}
export const config = {
formSelector: '.popup__form',
inputSelector: '.popup__form-text',
inputErrorClass: 'popup__form-error',
saveButtonSelector: '.popup__save-button',
inactiveButtonClass: 'popup__save-button_disable',
cardsBoxSelector: '.place__boxes',
popupEditCardSelector: '.popup_edit',
popupAddCardSelector: '.popup_add',
popupEnlagerSelector: '.popup_enlager',
popupDeleteCardSelector: '.popup_delete',
popupEditAvatarSelector: '.popup_edit-avatar',
templateSelector: '.template',
boxSelector: '.place__box',
popupImgSelector: '.popup__image',
popupCaptionSelector: '.popup__caption',
photoSelector: '.place__photo',
titleSelector: '.place__title',
likeSelector: '.place__like',
deleteSelector: '.place__delete',
likeCounterSelector: '.place__count-like'
}