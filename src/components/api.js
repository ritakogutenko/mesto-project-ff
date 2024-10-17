const config = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-23',
  headers: {
    authorization: 'e453ad1c-c697-4ea6-b501-cc0f07e53de1',
    'Content-Type': 'application/json'
  }
}

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};

const post = (url, data, method = 'POST') => {
  return fetch(`${config.baseUrl}${url}`, {
    method,
    headers: config.headers,
    body: JSON.stringify(data)
  }).then(handleResponse);
};

export const getUser = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then(handleResponse);
};

export const getCards = () =>{
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then(handleResponse);
}

export const formEdit = (inputName, inputDesc) => {
  return post('/users/me', { name: inputName, about: inputDesc }, 'PATCH');
}

export const avatarEdit = (inputLink) => {
  return post('/users/me/avatar', { avatar: inputLink }, 'PATCH');
}

export const addLike = (data) => {
  return post(`/cards/likes/${data._id}`, {}, 'PUT');
}

export const delLike = (data) => {
  return post(`/cards/likes/${data._id}`, {}, 'DELETE');
}

export const addCard = (inputName, inputLink) => {
  return post('/cards' , { name: inputName, link: inputLink});
}

export const delCard = (card) => {
  return post(`/cards/${card}`, {}, 'DELETE');
}