export default class UserInfo {
  constructor({nameSelector, descriptionSelector, avatarSelector}) {
    this._nameField = document.querySelector(nameSelector);
    this._descriptionField = document.querySelector(descriptionSelector);
    this._avatarSelector = document.querySelector(avatarSelector);
    this._myId = '';
  }

  getUserInfo() {
    return {name: this._nameField.textContent, description: this._descriptionField.textContent};
  }

  setUserInfo({name, description}) {
    this._nameField.textContent = name;
    this._descriptionField.textContent = description;
  }

  setUserAvatar(avatarUrl) {
    this._avatarSelector.src = avatarUrl;
  }

  setUserId(_id) {
    this._myId = _id;
  }

  getUserId() {
    return this._myId;
  }
}
