const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const galleryBlock = document.querySelector('.gallery');
const templateContent = document.querySelector('#card-template').content;

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
const imageBlockImage = popupBlockImage.querySelector('.popup__image');
const exitButtonImage = popupBlockImage.querySelector('.popup__close-button');
const imageCaption = popupBlockImage.querySelector('.popup__image-caption');

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

function addElementsListener(eventType, listenerFunction, ...elements) {
  elements.forEach(item => item.addEventListener(eventType, listenerFunction))
}

function showClosePopupForm(element) {
  element.classList.toggle('popup_opened');
}

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  showClosePopupForm(popupBlockProfile);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  if (evt.target === formElementProfile) {
    profileName.textContent = inputName.value;
    profileDescription.textContent = inputDescription.value;
    showClosePopupForm(popupBlockProfile);
  }
  else {
    galleryBlock.prepend(createCard(inputImageName.value, inputImageLink.value, false));
    showClosePopupForm(popupBlockAddImage);
  }
}

function createCard(name, link) {
  const cardNode = templateContent.cloneNode(true);
  const cardImage = cardNode.querySelector('img');

  cardNode.querySelector('p').textContent = name;
  cardImage.src = link;
  cardImage.alt = name;
  cardNode.querySelector('.card__delete-button').addEventListener('click', evt => evt.target.closest('.card').remove());
  cardNode.querySelector('.card__like-button').addEventListener('click', evt => evt.target.classList.toggle('card__like-button_checked'));
  cardNode.querySelector('.card__shadow-rect').addEventListener('click', evt => {
    showClosePopupForm(popupBlockImage);
    imageBlockImage.src = evt.target.previousElementSibling.src;
    imageCaption.textContent = evt.target.previousElementSibling.alt;
  });
  return cardNode;
}

function createGallery(cards) {
  cards.forEach(card => galleryBlock.append(createCard(card.name, card.link)));
}

addElementsListener('click', fillProfileForm, editButton, exitButtonProfile);
addElementsListener('click', () => showClosePopupForm(popupBlockAddImage), addButton, exitButtonAddImage);
addElementsListener('click', () => showClosePopupForm(popupBlockImage), exitButtonImage);
addElementsListener('submit', formSubmitHandler, formElementProfile, formElementAddImage);
createGallery(initialCards);








