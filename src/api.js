export const getInitalUsers = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'GET',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const sendChangedUsers = (name, about) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const addNewCards = (name, link) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
    method: 'POST',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const deleteCardRequest = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const setLikeCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const removeLikeCard = (cardId) => {
  return fetch(`https://nomoreparties.co/v1/wff-cohort-18/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25',
      'Content-Type': 'application/json'
    }
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 

export const editAvatar = (urlAvatar) => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: urlAvatar,
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
} 