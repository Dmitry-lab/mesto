const editButton = document.querySelector('.profile__button_type_edit');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const popupBlock = document.querySelector('.popup');
const formElement = document.querySelector('.popup__container');
const exitIcon = document.querySelector('.popup__close-icon');
const inputName = popupBlock.querySelector('.popup__item_type_name');
const inputDescription = popupBlock.querySelector('.popup__item_type_description');
const saveButton = document.querySelector('.popup__button');

editButton.addEventListener('click', showPopupForm);
exitIcon.addEventListener('click', closeForm);
formElement.addEventListener('submit', formSubmitHandler);

function showPopupForm() {
  popupBlock.classList.add('popup_opened');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}

function closeForm() {
  popupBlock.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closeForm();
}
