import Popup from './Popup.js';
import {popupFormSelector} from './constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFunction, openFunction) {
    super(popupSelector);
    this._submitFunction = submitFunction;
    this._openFunction = openFunction;
    this._inputList = this._element.querySelectorAll('input');
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
    this._element.querySelector(popupFormSelector).addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFunction(this._getInputValues());
    });
  }
}
