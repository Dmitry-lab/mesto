export default class Popup {
  constructor(popupSelector, popupOpenedModificator, popupCloseButtonSelector) {
    this._element = document.querySelector(popupSelector);
    this._openedModfificator = popupOpenedModificator;
    this._closeButton = this._element.querySelector(popupCloseButtonSelector);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape')
      this.close();
  }

  getPopupElement() {
    return this._element;
  }

  setEventListeners() {
    this._bindHandleEsc = this._handleEscClose.bind(this);

    this._closeButton.addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  open() {
    this._element.classList.add(this._openedModfificator);
    document.addEventListener('keydown', this._bindHandleEsc);
  }

  close() {
    this._element.classList.remove(this._openedModfificator);
    document.removeEventListener('keydown', this._bindHandleEsc);
  }
}
