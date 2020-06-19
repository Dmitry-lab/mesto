import './index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import {initialCards} from '../constants/data.js';
import {nameSelector, descriptionSelector, configObject,
        popupOpenedModificator, popupCloseButtonSelector, popupFormSelector,
        popupImage, popupImageCaption } from '../constants/constants.js';

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

const galleryBlock = new Section({
  items: initialCards,
  renderer: cardInfo => {
    const cardObject = new Card(cardInfo, '#card-template', (link, name) => popupBlockImage.open(link, name));
    galleryBlock.addItem(cardObject.createCard());
  }
}, '.gallery');

const userInfo = new UserInfo({nameSelector, descriptionSelector});

const popupBlockImage = new PopupWithImage('#popup-image', popupOpenedModificator, popupCloseButtonSelector,
  popupImage, popupImageCaption
);
popupBlockImage.setEventListeners();

const popupBlockAddImage = new PopupWithForm('#popup-add-image',
  popupOpenedModificator, popupCloseButtonSelector, popupFormSelector,
  (formValues) => {
    const {'place-name': name, 'place-link': link} = formValues;
    const cardObject = new Card({name, link}, '#card-template', (link, name) => popupBlockImage.open(link, name));
    galleryBlock.addItemOnTop(cardObject.createCard());
    popupBlockAddImage.close();
  },
  () => popupAddImgValidator.validate()
);
popupBlockAddImage.setEventListeners();

const popupBlockProfile = new PopupWithForm('#popup-profile',
  popupOpenedModificator, popupCloseButtonSelector, popupFormSelector,
  (formValues) => {
    const {'profile-name': name, 'profile-description': description} = formValues;
    userInfo.setUserInfo(name, description);
    popupBlockProfile.close();
  },
  () => {
    const {name, description} = userInfo.getUserInfo();
    popupBlockProfile.getPopupElement().querySelector('#input-name').value = name;
    popupBlockProfile.getPopupElement().querySelector('#input-description').value = description;
    popupProfileValidator.validate();
  }
)
popupBlockProfile.setEventListeners();

const popupProfileValidator = new FormValidator(configObject, popupBlockProfile.getPopupElement());
const popupAddImgValidator = new FormValidator(configObject, popupBlockAddImage.getPopupElement());

editButton.addEventListener('click', () => popupBlockProfile.open());
addButton.addEventListener('click', () => popupBlockAddImage.open());

galleryBlock.renderItems();
popupProfileValidator.enableValidation();
popupAddImgValidator.enableValidation();










