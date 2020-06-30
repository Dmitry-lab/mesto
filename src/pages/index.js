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
      currentCard => popupBlockAgreement.open(currentCard),
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
    api.deleteCard(currentCard.getId())
      .then(() => {
        currentCard.removeCard();
        popupBlockAgreement.close();
      })
      .catch(err => {
        popupBlockAgreement.close();
        console.log(`Ошибка ${err}`);
        alert('Ошибка сервера. Попробуйте повторить действие позже.');
      })
  }
);
popupBlockAgreement.setEventListeners();

const popupBlockAddImage = new PopupWithForm('#popup-add-image',
  popupOpenedModificator, popupCloseButtonSelector, popupSaveButtonSelector,
  popupFormSelector, saveButtonModificator,
  (formValues) => {
    const {'place-name': name, 'place-link': link} = formValues;
    popupBlockAddImage.beginWait();
    api.addCard(name, link)
      .then(cardInfo => {
        const cardObject = new Card({name, link: cardInfo.link, _id: cardInfo._id, owner: {_id: cardInfo.owner._id}},
          '#card-template',
          (link, name) => popupBlockImage.open(link, name),
          currentCard => popupBlockAgreement.open(currentCard),
          api
        );
        galleryBlock.addItemOnTop(cardObject.createCard(cardInfo.owner._id));
        popupBlockAddImage.close();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        popupBlockAddImage.stopWait();
        alert('Ошибка записи данных на сервер. Проверьте корректность введенных данных или загрузите данные позже');
      })
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
    api.changeUserInfo(name, description)
      .then(newData => {
        userInfo.setUserInfo({name: newData.name, description: newData.about});
        popupBlockProfile.close();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`);
        popupBlockProfile.stopWait();
        alert('Ошибка записи данных на сервер. Проверьте корректность введенных данных или загрузите данные позже');
      });
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
    popupBlockAvatar.beginWait();
    api.changeAvatar(avatarUrl)
      .then(newData => {
        userInfo.setUserAvatar(newData.avatar);
        popupBlockAvatar.close();
      })
      .catch(err => {
        console.log(`Ошибка ${err}`)
        popupBlockAvatar.stopWait();
        alert('Ошибка записи данных на сервер. Проверьте корректность введенных данных или загрузите данные позже');
      });
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

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsArray]) => {
    userInfo.setUserInfo({name: userData.name, description: userData.about});
    userInfo.setUserAvatar(userData.avatar);
    userInfo.setUserId(userData._id);

    galleryBlock.renderItems(cardsArray);
  }).
  catch(err => {
    console.log(`Ошибка ${err}`);
    alert('Ошибка подключения к серверу.');
  })

popupProfileValidator.enableValidation();
popupAddImgValidator.enableValidation();
popupAvatarValidator.enableValidation();










