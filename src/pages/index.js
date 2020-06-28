import './index.css';

import Api from '../components/Api.js';
import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupForConfirmation from '../components/PopupForConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import {nameSelector, descriptionSelector, avatarSelector, configObject,
        popupOpenedModificator, popupCloseButtonSelector, popupSaveButtonSelector, popupFormSelector,
        saveButtonModificator, popupImage, popupImageCaption } from '../constants/constants.js';
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatar = document.querySelector('.profile__avatar-block');

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-12',
  headers: {
    authorization: 'ffe2a54c-a9b3-42ed-8feb-c2a6d6aa9dd2',
    'Content-Type': 'application/json'
  }
});

const galleryBlock = new Section(
  cardInfo => {
    const cardObject = new Card(cardInfo, '#card-template',
      (link, name) => popupBlockImage.open(link, name),
      (currentCard, cardDOMElement) => popupBlockAgreement.open(currentCard, cardDOMElement),
      api
    );
    galleryBlock.addItem(cardObject.createCard(userInfo.getUserId()));
  },
  '.gallery'
);

const userInfo = new UserInfo({nameSelector, descriptionSelector, avatarSelector});

const popupBlockImage = new PopupWithImage('#popup-image', popupOpenedModificator, popupCloseButtonSelector,
  popupImage, popupImageCaption
);
popupBlockImage.setEventListeners();

const popupBlockAgreement = new PopupForConfirmation('#popup-agreement',
  popupOpenedModificator, popupCloseButtonSelector, popupFormSelector,
  () => {
    const currentCard = popupBlockAgreement.getConnectedObject();
    api.deleteCard(currentCard.getId(),
      () => {
        popupBlockAgreement.getDOMElement().remove();
        popupBlockAgreement.close();
      },
      () => popupBlockAgreement.close()
    )
  }
);
popupBlockAgreement.setEventListeners();

const popupBlockAddImage = new PopupWithForm('#popup-add-image',
  popupOpenedModificator, popupCloseButtonSelector, popupSaveButtonSelector,
  popupFormSelector, saveButtonModificator,
  (formValues) => {
    const {'place-name': name, 'place-link': link} = formValues;
    popupBlockAddImage.beginWait();
    api.addCard(name, link,
      (_id) => {
        const cardObject = new Card({name, link, _id, owner: {_id: userInfo.getUserId()}},
          '#card-template',
          (link, name) => popupBlockImage.open(link, name),
          (currentCard, cardDOMElement) => popupBlockAgreement.open(currentCard, cardDOMElement),
          api
        );
        galleryBlock.addItemOnTop(cardObject.createCard(userInfo.getUserId()));
        popupBlockAddImage.close();
      },
      () => popupBlockAddImage.close()
    )
  },
  () => popupAddImgValidator.validate()
);
popupBlockAddImage.setEventListeners();

const popupBlockProfile = new PopupWithForm('#popup-profile',
  popupOpenedModificator, popupCloseButtonSelector, popupSaveButtonSelector,
  popupFormSelector, saveButtonModificator,
  (formValues) => {
    const {'profile-name': name, 'profile-description': description} = formValues;
    popupBlockProfile.beginWait();
    api.changeUserInfo(name, description,
      () => {
        userInfo.setUserInfo({name, description});
        popupBlockProfile.close();
      },
      () => popupBlockProfile.close()
    )
  },
  () => {
    const {name, description} = userInfo.getUserInfo();
    popupBlockProfile.getPopupElement().querySelector('#input-name').value = name;
    popupBlockProfile.getPopupElement().querySelector('#input-description').value = description;
    popupProfileValidator.validate();
  }
)
popupBlockProfile.setEventListeners();

const popupBlockAvatar = new PopupWithForm('#popup-avatar-change',
  popupOpenedModificator, popupCloseButtonSelector, popupSaveButtonSelector,
  popupFormSelector, saveButtonModificator,
  (formValues) => {
    const {'user-avatar': avatarUrl} = formValues;
    popupBlockAddImage.beginWait();
    api.changeAvatar(avatarUrl,
      () => {
        userInfo.setUserAvatar(avatarUrl);
        popupBlockAvatar.close();
      },
      () => popupBlockAvatar .close()
    )
  },
  () => popupAvatarValidator.validate()
)
popupBlockAvatar.setEventListeners();

const popupProfileValidator = new FormValidator(configObject, popupBlockProfile.getPopupElement());
const popupAddImgValidator = new FormValidator(configObject, popupBlockAddImage.getPopupElement());
const popupAvatarValidator = new FormValidator(configObject, popupBlockAvatar.getPopupElement());

editButton.addEventListener('click', () => popupBlockProfile.open());
addButton.addEventListener('click', () => popupBlockAddImage.open());
editAvatar.addEventListener('click', () => popupBlockAvatar.open());

api.getUserInfo(userData => {
  userInfo.setUserInfo({name: userData.name, description: userData.about});
  userInfo.setUserAvatar(userData.avatar);
  userInfo.setUserId(userData._id);

  api.getInitialCards(cardsArray => {
    galleryBlock.renderItems(cardsArray);
  });
});

popupProfileValidator.enableValidation();
popupAddImgValidator.enableValidation();
popupAvatarValidator.enableValidation();










