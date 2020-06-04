export default class FormValidator {
  constructor(configObject, formElement) {
    this._inputSelector = configObject.inputSelector;
    this._submitButtonSelector = configObject.submitButtonSelector;
    this._inactiveButtonClass = configObject.inactiveButtonClass;
    this._inputErrorClass = configObject.inputErrorClass;
    this._errorClass = configObject.errorClass;
    this._form = formElement;
  }

  _showErrorMessage(inputElement, errorElement) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  _hideErrorMessage(inputElement, errorElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(this._errorClass);
  }

  _checkValidity(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);

    if (inputElement.validity.valid) {
      this._hideErrorMessage(inputElement, errorElement);
    }
    else {
      this._showErrorMessage(inputElement, errorElement);
    }
  }

  _formIsNotValid() {
    return Array.from(this._form.querySelectorAll('.popup__item')).some(element => !element.validity.valid);
  }

  _changeButtonState() {
    const formButton = this._form.querySelector(this._submitButtonSelector);

    if (this._formIsNotValid()) {
      formButton.classList.add(this._inactiveButtonClass);
      formButton.disabled = true;
    }
    else {
      formButton.classList.remove(this._inactiveButtonClass);
      formButton.disabled = false;
    }
  }

  _setEventListeners() {
    const inputList = this._form.querySelectorAll(this._inputSelector);

    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkValidity(inputElement);
        this._changeButtonState();
      });
    });
  }

  validate() {
    const inputList = this._form.querySelectorAll(this._inputSelector);

    inputList.forEach(inputElement => {
      this._checkValidity(inputElement);
      this._changeButtonState();
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}
