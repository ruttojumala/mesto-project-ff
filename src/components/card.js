import { deleteCardRequest, setLikeCardRequest, removeLikeCardRequest } from '../api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки 
function createCard(card, handleImageClick, userId) {
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

  // Элемент кнопки удаления карточки
  const buttonCardDelete = cardTemplateClone.querySelector('.card__delete-button');

  // Удаление корзины
  if (!isOwner) {
    buttonCardDelete.remove();
  } else {
    buttonCardDelete.addEventListener('click', (evt) => {
      handleDeleteCard(evt, card);
    })
  }

  // Обработчик события лайка карточки по кнопке
  const buttonCardLike = cardTemplateClone.querySelector('.card__like-button');
  if (isLiked) {
    buttonCardLike.classList.add("card__like-button_is-active")
  }
  buttonCardLike.addEventListener('click', () => {
    handleLike(buttonCardLike, numberLike, card);
  });

  // Обработчик события открытия попапа карточки по клику на картинку
  cardImg.addEventListener('click', handleImageClick);

  return cardTemplateClone;
};

function handleDeleteCard(evt, card) {
  deleteCardRequest(card._id)
    .then(() => {
      evt.target.closest('.card').remove();
    })
    .catch((err) => {
      console.log(err);
    });
}


function handleLike(buttonCardLike, numberLike, card) {
  const likeMethod = buttonCardLike.classList.contains("card__like-button_is-active") ? removeLikeCardRequest : setLikeCardRequest;
  likeMethod(card._id)
    .then((res) => {
      numberLike.textContent = res.likes.length;
      buttonCardLike.classList.toggle("card__like-button_is-active");
    })
    .catch(err => console.log(err));
}


// Экспорт создания, удаления, лайка карточки
export { createCard };