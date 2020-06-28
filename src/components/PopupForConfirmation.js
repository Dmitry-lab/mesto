import Popup from './Popup.js';

export default class PopupForConfirmation extends Popup {
  constructor(popupSelector, popupOpenedModificator, popupCloseButtonSelector, popupFormSelector, submitFunction) {
    super(popupSelector, popupOpenedModificator, popupCloseButtonSelector);
    this._submitFunction = submitFunction;
    this._form = this._element.querySelector(popupFormSelector);
  }

  open(connectedObject, domElement) {
    super.open();
    this._connectedObject = connectedObject;
    this._domElement = domElement;
  }

  getConnectedObject() {
    return this._connectedObject;
  }

  getDOMElement() {
    return this._domElement;
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction();
    });
  }
}
