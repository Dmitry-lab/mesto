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

function clearFormErrors(formElement) {
  formElement.querySelectorAll('.popup__item').forEach(element => checkValidity(formElement, element, configObject.inputErrorClass, configObject.errorClass));
}

function fillProfileForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearFormErrors(popupBlockProfile);
  changeButtonState(popupBlockProfile, configObject.submitButtonSelector, configObject.inactiveButtonClass);
  showClosePopupForm(popupBlockProfile);
}

function fillAddImageForm() {
  inputImageName.value = '';
  inputImageLink.value = '';
  clearFormErrors(popupBlockAddImage);
  changeButtonState(popupBlockAddImage,configObject.submitButtonSelector, configObject.inactiveButtonClass);
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
    galleryBlock.prepend(createCard(inputImageName.value, inputImageLink.value, false));
    showClosePopupForm(popupBlockAddImage);
  }
}

function createCard(name, link) {
  const cardNode = templateContent.cloneNode(true);
  const cardImage = cardNode.querySelector('img');
  const cardShadowRect = cardNode.querySelector('.card__shadow-rect');

  cardNode.querySelector('p').textContent = name;
  cardImage.src = cardShadowRect.dataset.url = link;
  cardImage.alt = cardShadowRect.dataset.alt = name;

  return cardNode;
}

function createGallery(cards) {
  cards.forEach(card => galleryBlock.append(createCard(card.name, card.link)));
}

addElementsListener('click', fillProfileForm, editButton, exitButtonProfile);
addElementsListener('click', fillAddImageForm, addButton, exitButtonAddImage);
addElementsListener('click', () => showClosePopupForm(popupBlockImage), exitButtonImage);
addElementsListener('submit', formSubmitHandler, formElementProfile, formElementAddImage);

// назначение обработчиков событий для работы с карточками фотографий путем делегирования событий
galleryBlock.addEventListener('click', evt => {
  if (evt.target.classList.contains('card__delete-button')) {
    evt.target.closest('.card').remove();
  }

  else if (evt.target.classList.contains('card__like-button')) {
    evt.target.classList.toggle('card__like-button_checked');
  }

  else if (evt.target.classList.contains('card__shadow-rect')) {
    showClosePopupForm(popupBlockImage);
    imageBlockImage.src = evt.target.dataset.url;
    imageCaption.textContent = evt.target.dataset.alt;
  }
});

// закрытие popup-ов при клике на оверлей
document.querySelectorAll('.popup').forEach(popupElement => {
  popupElement.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      showClosePopupForm(evt.currentTarget);
    }
  });
});

createGallery(initialCards);









