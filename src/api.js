export const getInitalUsers = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/users/me', {
    method: 'GET',
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25'
    }
  })
  .then(res => res.json());
}

export const getInitialCards = () => {
  return fetch('https://nomoreparties.co/v1/wff-cohort-18/cards', {
    headers: {
      authorization: 'd14c7ee8-cf05-401c-830b-ff888d4e1b25'
    }
  })
    .then(res => res.json())
} 
