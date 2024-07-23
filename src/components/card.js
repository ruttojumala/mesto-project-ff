import { deleteCardRequest, setLikeCardRequest, removeLikeCardRequest } from '../api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки
//function createCard(name, img, like, deleteCard, handleImageClick, likeCardButton, isOwner, cardId, isLiked) 
function createCard(card, deleteCard, handleImageClick, likeCardButton, userId){
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImg = cardTemplateClone.querySelector('.card__image');
  const cardTitle = cardTemplateClone.querySelector('.card__title');
  const numberLike = cardTemplateClone.querySelector('.card__like-button-number');

  // Проверка айди пользователя и айди карточки
  const isOwner = card.owner._id === userId;
  const isLiked = card.likes.find((element) => element._id === userId);

  // Присваивание значений карточке
  cardTitle.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;
  numberLike.textContent = card.likes.length;

  // Обработчик события удаления карточки по кнопке
  const buttonCardDelete = cardTemplateClone.querySelector('.card__delete-button');
  //buttonCardDelete.addEventListener('click', deleteCard);
  
  // Удаление корзины
  if (!isOwner) {
    buttonCardDelete.remove();
  } else {
    buttonCardDelete.addEventListener('click', (evt) => {
      deleteCardRequest(card._id)
        .then(() => {
          deleteCard(evt);
        })
        .catch((err) => {
          console.log(err);
        });
    })
  }
  
  // Обработчик события лайка карточки по кнопке
  const buttonCardLike = cardTemplateClone.querySelector('.card__like-button');
  if (isLiked) {
    buttonCardLike.classList.add("card__like-button_is-active")
  }
  buttonCardLike.addEventListener('click', () => {
    //likeCardButton(buttonCardLike);
    /*if (buttonCardLike.classList.contains("card__like-button_is-active")) {
      setLikeCardRequest(card._id)
        .catch((err) => {
          console.log(err);
        });
      let counter = Number(numberLike.textContent);
      counter += 1;
      numberLike.textContent = counter;
    } else {
      removeLikeCardRequest(card._id)
        .catch((err) => {
          console.log(err);
        });
      let counter = Number(numberLike.textContent);
      counter -= 1;
      numberLike.textContent = counter;
    }*/
    const likeMethod = buttonCardLike.classList.contains("card__like-button_is-active") ? removeLikeCardRequest: setLikeCardRequest;
likeMethod(card._id) 
        .then((res) => {
           numberLike.textContent = res.likes.length; 
           likeCardButton(buttonCardLike); 
        })
.catch(err => console.log(err));
  });

  // Обработчик события открытия попапа карточки по клику на картинку
  cardImg.addEventListener('click', handleImageClick);

  return cardTemplateClone;
};

// Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

// Функция лайк карточки 
function likeCardButton(buttonCardLike) {
  buttonCardLike.classList.toggle("card__like-button_is-active");
}

// Экспорт создания, удаления, лайка карточки
export { createCard, deleteCard, /*likeCard as*/ likeCardButton };