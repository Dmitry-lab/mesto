const configObject = {
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_inappropriate',
  errorClass: 'popup__error_visible'
}

function showErrorMessage(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideErrorMessage(inputElement, errorElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.textContent = '';
  errorElement.classList.remove(errorClass);
}

function checkValidity(formElement, inputElement, inputErrorClass, errorClass) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (inputElement.validity.valid) {
    hideErrorMessage(inputElement, errorElement, inputErrorClass, errorClass);
  }
  else {
    showErrorMessage(inputElement, errorElement, inputErrorClass, errorClass);
  }
}

function formIsNotValid(formElement) {
  return Array.from(formElement.querySelectorAll('.popup__item')).some(element => !element.validity.valid);
}

function changeButtonState(formElement, submitButtonSelector, inactiveButtonClass) {
  const formButton = formElement.querySelector(submitButtonSelector);

  if (formIsNotValid(formElement)) {
    formButton.classList.add(inactiveButtonClass);
    formButton.disabled = true;
  }
  else {
    formButton.classList.remove(inactiveButtonClass);
    formButton.disabled = false;
  }
}

function setEventListeners(formElement, obj) {
  const inputList = formElement.querySelectorAll(obj.inputSelector);
  const {submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass} = obj;

  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
      checkValidity(formElement, inputElement, inputErrorClass, errorClass);
      changeButtonState(formElement, submitButtonSelector, inactiveButtonClass);
    });
  });
}

function enableValidation (obj) {
  const popupForms = document.querySelectorAll(obj.formSelector);
  popupForms.forEach(formElement => setEventListeners(formElement, obj));
};

enableValidation({
  formSelector: '.popup__container',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__item_inappropriate',
  errorClass: 'popup__error_visible'
});
