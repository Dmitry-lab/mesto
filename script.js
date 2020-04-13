const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupBlock = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const exitIcon = document.querySelector('.popup__close-button');
const inputName = popupBlock.querySelector('.popup__item_type_name');
const inputDescription = popupBlock.querySelector('.popup__item_type_description');
const saveButton = document.querySelector('.popup__button');


editButton.addEventListener('click', showClosePopupForm);
exitIcon.addEventListener('click', showClosePopupForm);
formElement.addEventListener('submit', formSubmitHandler);

function showClosePopupForm() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  popupBlock.classList.toggle('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  showClosePopupForm();
}
