  // Темплейт карточки
 const cardTemplate = document.querySelector('#card-template').content;
 

// Функция создания карточки
function createCard(name, img, deleteCard, handleImageClick, likeCardButton) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImg = cardTemplateClone.querySelector('.card__image');
  const cardTitle = cardTemplateClone.querySelector('.card__title');
  
  // Присваивание значений карточке
  cardTitle.textContent = name;
  cardImg.src = img;
  cardImg.alt = name;

  // Обработчик события удаления карточки по кнопке
  const buttonCardDelete = cardTemplateClone.querySelector('.card__delete-button');
  buttonCardDelete.addEventListener('click', deleteCard);

  // Обработчик события лайка карточки по кнопке
  const buttonCardLike = cardTemplateClone.querySelector('.card__like-button');
  buttonCardLike.addEventListener('click', () => { likeCardButton(buttonCardLike)} );

  // Обработчик события открытия попапа карточки по клику на картинку
  cardImg.addEventListener('click', handleImageClick);

  return cardTemplateClone;
};

// Функция удаления карточки
function deleteCard(evt){
  evt.target.closest('.card').remove();
};

// Функция лайк карточки 
 function likeCard(buttonCardLike) {
  buttonCardLike.classList.toggle("card__like-button_is-active");
} 

// Экспорт создания, удаления, лайка карточки
export {createCard, deleteCard, likeCard as likeCardButton};