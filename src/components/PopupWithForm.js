import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, popupOpenedModificator, popupCloseButtonSelector, popupSaveButtonSelector,
              popupFormSelector, saveButtonModificator, submitFunction, openFunction) {
    super(popupSelector, popupOpenedModificator, popupCloseButtonSelector);
    this._submitFunction = submitFunction;
    this._openFunction = openFunction;
    this._inputList = this._element.querySelectorAll('input');
    this._form = this._element.querySelector(popupFormSelector);
    this._saveButton = this._form.querySelector(popupSaveButtonSelector);
    this._defaultText = this._saveButton.textContent;
    this._saveButtonModificator = saveButtonModificator;
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach(item => formValues[item.name] = item.value);
    return formValues;
  }

  open() {
    super.open();
    this._saveButton.disabled = false;
    this._saveButton.textContent = this._defaultText;
    this._saveButton.classList.remove(this._saveButtonModificator);
    this._openFunction();
  }

  beginWait() {
    this._saveButton.textContent = 'Сохранение...';
    this._saveButton.classList.add(this._saveButtonModificator);
    this._saveButton.disabled = true;
  }

  stopWait() {
    this._saveButton.disabled = false;
    this._saveButton.textContent = this._defaultText;
    this._saveButton.classList.remove(this._saveButtonModificator);
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
