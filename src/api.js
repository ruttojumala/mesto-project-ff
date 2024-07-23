const baseUrl = 'https://nomoreparties.co/v1/wff-cohort-18';
const authorizationKey = 'd14c7ee8-cf05-401c-830b-ff888d4e1b25';
const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}
export const getInitalUsersRequest = () => {
  return fetch(baseUrl + '/users/me', {
    method: 'GET',
    headers: {
      authorization: authorizationKey
    }
  })
    .then(res => handleResponse(res));
}

export const getInitialCardsRequest = () => {
  return fetch(baseUrl + '/cards', {
    headers: {
      authorization: authorizationKey
    }
  })
    .then(res => handleResponse(res));
}

export const sendChangedUsersRequest = (name, about) => {
  return fetch(baseUrl + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(res => handleResponse(res));
}

export const addNewCardsRequest = (name, link) => {
  return fetch(baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(res => handleResponse(res));
}

export const deleteCardRequest = (cardId) => {
  return fetch(baseUrl + `/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    }
  })
    .then(res => handleResponse(res));
}

export const setLikeCardRequest = (cardId) => {
  return fetch(baseUrl + `/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    }
  })
    .then(res => handleResponse(res));
}

export const removeLikeCardRequest = (cardId) => {
  return fetch(baseUrl + `/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    }
  })
    .then(res => handleResponse(res));
}

export const editAvatarRequest = (urlAvatar) => {
  return fetch(baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: authorizationKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: urlAvatar,
    })
  })
    .then(res => handleResponse(res));
} 