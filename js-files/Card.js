export default class Card {
  constructor(data, templateSelector, popup, popupFunction) {
    this._name = data.name;
    this._src = data.link;
    this._templateSelector = templateSelector;
    this._cardsPopup = popup;
    this._popupFunction = popupFunction;
  }

  _showPopup() {
    this._popupFunction(this._cardsPopup);
    this._cardsPopup.querySelector('.popup__image').src = this._cardShadowRect.dataset.url;
    this._cardsPopup.querySelector('.popup__image-caption').textContent = this._cardShadowRect.dataset.alt;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._deleteButton.closest('.card').remove());
    this._likeButton.addEventListener('click', () => this._likeButton.classList.toggle('card__like-button_checked'));
    this._cardShadowRect.addEventListener('click', () => this._showPopup());
  }

  createCard() {
    this._cardNode = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._cardShadowRect = this._cardNode.querySelector('.card__shadow-rect');
    this._likeButton = this._cardNode.querySelector('.card__like-button');
    this._deleteButton = this._cardNode.querySelector('.card__delete-button');
    const cardImage = this._cardNode.querySelector('img');

    this._setEventListeners();

    this._cardNode.querySelector('p').textContent = this._name;
    cardImage.src = this._src;
    this._cardShadowRect.dataset.url = this._src;
    cardImage.alt = this._name;
    this._cardShadowRect.dataset.alt = this._name;

    return this._cardNode;
  }
}
