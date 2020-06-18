import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../components/data.js';
import {editButton, addButton, nameSelector, descriptionSelector} from '../components/constants.js';


const galleryBlock = new Section({
  items: initialCards,
  renderer: cardInfo => {
    const cardObject = new Card(cardInfo, '#card-template', () => popupBlockImage.open(cardInfo.link, cardInfo.name));
    galleryBlock.addItem(cardObject.createCard());
  }
}, '.gallery');

const userInfo = new UserInfo({nameSelector, descriptionSelector});

const popupBlockImage = new PopupWithImage('#popup-image');
popupBlockImage.setEventListeners();

const popupBlockAddImage = new PopupWithForm('#popup-add-image',
  (formValues) => {
    let {'place-name': name, 'place-link': link} = formValues;
    const cardObject = new Card({name, link}, '#card-template', () => popupBlockImage.open(link, name));
    galleryBlock.addItem(cardObject.createCard(), 'prepend');
    popupBlockAddImage.close();
  },
  () => popupAddImgValidator.validate()
);
popupBlockAddImage.setEventListeners();

const popupBlockProfile = new PopupWithForm('#popup-profile',
  (formValues) => {
    userInfo.setUserInfo(formValues);
    popupBlockProfile.close();
  },
  () => {
    let {name, description} = userInfo.getUserInfo();
    popupBlockProfile.getPopupElement().querySelector('#input-name').value = name;
    popupBlockProfile.getPopupElement().querySelector('#input-description').value = description;
    popupProfileValidator.validate();
  }
)
popupBlockProfile.setEventListeners();

const configObject = {
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_inappropriate',
  errorClass: 'popup__error_visible'
}
const popupProfileValidator = new FormValidator(configObject, popupBlockProfile.getPopupElement());
const popupAddImgValidator = new FormValidator(configObject, popupBlockAddImage.getPopupElement());

editButton.addEventListener('click', () => popupBlockProfile.open());
addButton.addEventListener('click', () => popupBlockAddImage.open());

galleryBlock.renderItems();
popupProfileValidator.enableValidation();
popupAddImgValidator.enableValidation();










