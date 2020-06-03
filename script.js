import Card from './Card.js';
import FormValidator from './FormValidator.js';

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

const initialCards = [
  {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const configObject = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_inappropriate',
  errorClass: 'popup__error_visible'
}
const popupProfileValidator = new FormValidator(configObject, popupBlockProfile);
const popupAddImgValidator = new FormValidator(configObject, popupBlockAddImage);


function addElementsListener(eventType, listenerFunction, ...elements) {
  elements.forEach(item => item.addEventListener(eventType, listenerFunction))
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    showClosePopupForm(document.querySelector('.popup_opened'));
  }
}

function showClosePopupForm(element) {
  if (element.classList.contains('popup_opened')) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
  else {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }
}

function clearFormErrors(formElement, formValidator) {
  formElement.querySelectorAll('.popup__item').forEach(element => formValidator.checkValidity(element));
}

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearFormErrors(popupBlockProfile, popupProfileValidator);
  popupProfileValidator.changeButtonState();
  showClosePopupForm(popupBlockProfile);
}

function fillAddImageForm() {
  inputImageName.value = '';
  inputImageLink.value = '';
  clearFormErrors(popupBlockAddImage, popupAddImgValidator);
  popupAddImgValidator.changeButtonState();
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










