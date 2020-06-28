export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers
  }

  getUserInfo(userInfoFunction) {
    fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
      .then(userInfoFunction)
      .catch(err => console.log(`Ошибка ${err}`));
  }

  getInitialCards(cardLoadingFunction) {
    fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
      .then(cardLoadingFunction)
      .catch(err => console.log(`Ошибка ${err}`));
  }

  changeUserInfo(name, about, updateFunction, errFunction) {
    fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({name, about})
    })
      .then(res => {
        if (res.ok)
          updateFunction();
        else {
          console.log(`Ошибка ${res.status}`);
          alert('Ошибка записи данных на сервер. Проверьте корректность введенных данных или загрузите данные позднее');
          errFunction();
        }
      })
  }

  changeAvatar(newUrl, updateFunction, errFunction) {
    fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({avatar: newUrl})
    })
      .then(res => {
        if (res.ok)
          updateFunction();
        else {
          console.log(`Ошибка ${res.status}`);
          alert('Ошибка записи данных на сервер. Проверьте корректность введенных данных или загрузите данные позднее');
          errFunction();
        }
      })
  }

  addCard(name, link, updateFunction, errFunction) {
    fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({name, link})
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status);
      })
      .then(data => updateFunction(data._id))
      .catch(err => {
        console.log(`Ошибка ${err}`);
        alert('Ошибка записи данных на сервер. Проверьте корректность введенных данных или загрузите данные позднее');
        errFunction();
      })
  }

  deleteCard(id, updateFunction, errFunction) {
    fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          updateFunction()
        else {
          console.log(`Ошибка ${res.status}`);
          errFunction();
        }
      })
  }

  putLike(putLikeFunction, cardID) {
    fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'PUT',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then (res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
      .then(data => putLikeFunction(data.likes.length))
      .catch(err => console.log(`Ошибка ${err}`));
  }

  deleteLike(deleteLikeFunction, cardID) {
    fetch(`${this._baseUrl}/cards/likes/${cardID}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => {
        if (res.ok)
          return res.json();
        else
          return Promise.reject(res.status)
      })
      .then(data => deleteLikeFunction(data.likes.length))
      .catch(err => console.log(`Ошибка ${err}`))
  }
}
