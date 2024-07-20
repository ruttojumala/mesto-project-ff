import { deleteCardRequest, setLikeCardRequest, removeLikeCardRequest } from '../api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;


// Функция создания карточки
function createCard(name, img, like, deleteCard, handleImageClick, likeCardButton, isOwner, cardId, isLiked) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  const cardImg = cardTemplateClone.querySelector('.card__image');
  const cardTitle = cardTemplateClone.querySelector('.card__title');
  const numberLike = cardTemplateClone.querySelector('.card__like-button-number');

  // Присваивание значений карточке
  cardTitle.textContent = name;
  cardImg.src = img;
  cardImg.alt = name;
  numberLike.textContent = like.length;

  // Обработчик события удаления карточки по кнопке
  const buttonCardDelete = cardTemplateClone.querySelector('.card__delete-button');
  //buttonCardDelete.addEventListener('click', deleteCard);
  buttonCardDelete.addEventListener('click', (evt) => {
    deleteCardRequest(cardId)
      .catch((err) => {
        console.log(err);
      });
    deleteCard(evt);
  })

  // Удаление корзины
  if (!isOwner) {
    buttonCardDelete.remove();
  }

  // Обработчик события лайка карточки по кнопке
  const buttonCardLike = cardTemplateClone.querySelector('.card__like-button');
  if (isLiked) {
    buttonCardLike.classList.add("card__like-button_is-active")
  }
  buttonCardLike.addEventListener('click', () => {
    likeCardButton(buttonCardLike);
    console.log(buttonCardLike);
    if (buttonCardLike.classList.contains("card__like-button_is-active")) {
      setLikeCardRequest(cardId)
        .catch((err) => {
          console.log(err);
        });
      let counter = Number(numberLike.textContent);
      counter += 1;
      numberLike.textContent = counter;
    } else {
      removeLikeCardRequest(cardId)
        .catch((err) => {
          console.log(err);
        });
      let counter = Number(numberLike.textContent);
      counter -= 1;
      numberLike.textContent = counter;
    }
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