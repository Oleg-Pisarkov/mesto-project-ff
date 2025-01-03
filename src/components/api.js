const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-29',
  headers: {
    authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
    'Content-Type': 'application/json'
  }
}

//Загрузка данных пользователя  
function getUserData() {
 return fetch(`${config.baseUrl}/users/me`, 
  { 
    method: 'GET',
    headers: config.headers })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

// Загрузка карточек с сервера
function getCards() {
  return fetch(`${config.baseUrl}/cards`,
  { 
    method: 'GET',
    headers: config.headers })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

export function loadUserData() {
  return Promise.all([getUserData(), getCards()])
}

// Редактирование профиля 
 
export function featchEditProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  }

  //Добавление новой карточки
export function featchNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  }

  //Удаление карточки
  
export function featchDeleteCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  }

  // Постановка лайка

export function featchLikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  }

  // Снятие лайка

export function featchDislikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
  }

  //Обновление аватара пользователя

  export function featchEditAvatar(avatar) {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatar,
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }else{
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    })
  } 
