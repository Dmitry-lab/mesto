import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupOpenedModificator, popupCloseButtonSelector, popupFormSelector, submitFunction, openFunction) {
    super(popupSelector, popupOpenedModificator, popupCloseButtonSelector);
    this._submitFunction = submitFunction;
    this._openFunction = openFunction;
    this._inputList = this._element.querySelectorAll('input');
    this._form = this._element.querySelector(popupFormSelector);
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(item => formValues[item.name] = item.value);
    return formValues;
  }

  open() {
    super.open();
    this._openFunction();
  }

  close() {
    this._inputList.forEach(item => item.value = '');
    super.close();
  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}
