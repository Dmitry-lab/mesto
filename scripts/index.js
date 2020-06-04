import FormValidator from './FormValidator.js';
import Card from './Card.js';
import {initialCards} from './data.js';
import {addElementsListener, showClosePopupForm} from './utils.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const galleryBlock = document.querySelector('.gallery');

const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupBlockProfile = document.querySelector('#popup-profile');
const formElementProfile = popupBlockProfile.querySelector('.popup__container');
const exitButtonProfile = popupBlockProfile.querySelector('.popup__close-button');
const inputName = popupBlockProfile.querySelector('.popup__item_type_name');
const inputDescription = popupBlockProfile.querySelector('.popup__item_type_description');

const popupBlockAddImage = document.querySelector('#popup-add-image');
const formElementAddImage = popupBlockAddImage.querySelector('.popup__container');
const exitButtonAddImage = popupBlockAddImage.querySelector('.popup__close-button');
const inputImageName = popupBlockAddImage.querySelector('.popup__item_type_name');
const inputImageLink = popupBlockAddImage.querySelector('.popup__item_type_description');

const popupBlockImage = document.querySelector('#popup-image');
const exitButtonImage = popupBlockImage.querySelector('.popup__close-button');

const configObject = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_inappropriate',
  errorClass: 'popup__error_visible'
}
const popupProfileValidator = new FormValidator(configObject, popupBlockProfile);
const popupAddImgValidator = new FormValidator(configObject, popupBlockAddImage);

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popupProfileValidator.validate();
  showClosePopupForm(popupBlockProfile);
}

function fillAddImageForm() {
  inputImageName.value = '';
  inputImageLink.value = '';
  popupAddImgValidator.validate();
  showClosePopupForm(popupBlockAddImage);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (evt.target === formElementProfile) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    showClosePopupForm(popupBlockProfile);
  }
  else {
    const cardObject = new Card({name: inputImageName.value, link: inputImageLink.value}, '#card-template', popupBlockImage, showClosePopupForm);
    galleryBlock.prepend(cardObject.createCard());
    showClosePopupForm(popupBlockAddImage);
  }
}

function createGallery(cards) {
  cards.forEach(card => {
    const cardObject = new Card(card, '#card-template', popupBlockImage, showClosePopupForm);
    galleryBlock.append(cardObject.createCard());
  });
}

addElementsListener('click', fillProfileForm, editButton, exitButtonProfile);
addElementsListener('click', fillAddImageForm, addButton, exitButtonAddImage);
addElementsListener('click', () => showClosePopupForm(popupBlockImage), exitButtonImage);
addElementsListener('submit', formSubmitHandler, formElementProfile, formElementAddImage);

// закрытие popup-ов при клике на оверлей
document.querySelectorAll('.popup').forEach(popupElement => {
  popupElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      showClosePopupForm(evt.currentTarget);
    }
  });
});

createGallery(initialCards);
popupProfileValidator.enableValidation();
popupAddImgValidator.enableValidation();










