import {popupOpenedModificator, popupCloseButtonSelector} from './constants.js';

export default class Popup {
  constructor(popupSelector) {
    this._element = document.querySelector(popupSelector);
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

    this._element.querySelector(popupCloseButtonSelector).addEventListener('click', this.close.bind(this));
    this._element.addEventListener('click', evt => {
      if (evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  open() {
    this._element.classList.add(popupOpenedModificator);
    document.addEventListener('keydown', this._bindHandleEsc);
  }

  close() {
    this._element.classList.remove(popupOpenedModificator);
    document.removeEventListener('keydown', this._bindHandleEsc);
  }
}
