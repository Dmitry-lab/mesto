import {profileNameInput, profileDescriptionInput} from './constants.js';

export default class UserInfo {
  constructor({nameSelector, descriptionSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._descriptionField = document.querySelector(descriptionSelector);
  }

  getUserInfo() {
    return {name: this._nameField.textContent, description: this._descriptionField.textContent};
  }

  setUserInfo({[profileNameInput]: name, [profileDescriptionInput]: description}) {
    this._nameField.textContent = name;
    this._descriptionField.textContent = description;
  }
}
