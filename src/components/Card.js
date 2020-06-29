export default class Card {
  constructor({name, link, likes = [], _id = '', owner = {}}, templateSelector, handleCardClick, handleBinClick, api) {
    this._name = name;
    this._src = link;
    this._likes = likes;
    this._id = _id;
    this._ownerId = owner._id;
    this._templateSelector = templateSelector;
    this._popupFunction = handleCardClick;
    this._agreementPopupFunction = handleBinClick;
    this._api = api;
  }

  _likeClick() {
    if (!this._likeButton.classList.contains('card__like-button_checked')) {
      this._api.putLike(this._id)
        .then(data => {
          this._likeButton.classList.add('card__like-button_checked');
          this._likesNumberField.textContent = data.likes.length;
        })
        .catch(err => {
          console.log(`Ошибка ${err}`);
          alert('Ошибка сервера. Попробуйте повторить действие позже.');
        })
    }
    else {
      this._api.deleteLike(this._id)
        .then(data => {
          this._likeButton.classList.remove('card__like-button_checked');
          this._likesNumberField.textContent = data.likes.length;
        })
        .catch(err => {
          console.log(`Ошибка ${err}`);
          alert('Ошибка сервера. Попробуйте повторить действие позже.');
        })
    }
  }

  getId() {
    return this._id;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', (evt) => this._agreementPopupFunction(this));
    this._likeButton.addEventListener('click', this._likeClick.bind(this));
    this._cardShadowRect.addEventListener('click', () => this._popupFunction(this._src, this._name));
  }

  removeCard() {
    this._deleteButton.closest('.card').remove();
  }

  createCard(myId) {
    this._cardNode = document.querySelector(this._templateSelector).content.cloneNode(true);
    this._cardShadowRect = this._cardNode.querySelector('.card__shadow-rect');
    this._likeButton = this._cardNode.querySelector('.card__like-button');
    this._deleteButton = this._cardNode.querySelector('.card__delete-button');
    this._likesNumberField = this._cardNode.querySelector('.card__likes-counter');
    const cardImage = this._cardNode.querySelector('img');

    if (myId !== this._ownerId) {
      this._deleteButton.classList.add('card__delete-button_hidden');
      this._deleteButton.disabled = true;
    }

    if (this._likes.some(item => item._id === myId))
      this._likeButton.classList.add('card__like-button_checked');

    this._setEventListeners();

    this._cardNode.querySelector('p').textContent = this._name;
    cardImage.src = this._src;
    this._cardShadowRect.dataset.url = this._src;
    cardImage.alt = this._name;
    this._cardShadowRect.dataset.alt = this._name;
    this._likesNumberField.textContent = this._likes.length;

    return this._cardNode;
  }
}
