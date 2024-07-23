import './pages/index.css';
//import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCardButton } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCardsRequest, getInitalUsersRequest, sendChangedUsersRequest, addNewCardsRequest, editAvatarRequest } from './api.js';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image-button');
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const avatarPopup = document.querySelector('.popup_type_avatar')
const imagePopup = document.querySelector('.popup_type_image');
const allPopupsContexts = document.querySelectorAll('.popup__content');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const newCardForm = document.forms["new-place"];
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url');
const profileTitleName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');
const profileEditForm = document.forms["edit-profile"];
const imgPopup = imagePopup.querySelector('.popup__image');
const captionPopup = imagePopup.querySelector('.popup__caption');
const profileImage = document.querySelector('.profile__image');
const avatarEditForm = document.forms["edit-avatar"];
const avatarPopupInput = avatarEditForm.querySelector('.popup__input_type_avatar');
const avatarSaveButton = avatarEditForm.querySelector('.button');
const profileSaveButton = profileEditForm.querySelector('.button');
const newCardSaveButton = newCardForm.querySelector('.button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// валидация
enableValidation(validationConfig);

/* Выводим карточки на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link, deleteCard, handleImageClick, likeCardButton);
  cardsContainer.append(newCard);
});*/

// Обработчики события открытия попапов 
profileEditButton.addEventListener('click', () => {
  fillProfileInputs();
  openPopup(profileEditPopup);
  clearValidation(profileEditPopup, validationConfig)
});

newCardButton.addEventListener('click', () => {
  clearValidation(newCardPopup, validationConfig)
  newCardForm.reset();
  openPopup(newCardPopup);
});

avatarButton.addEventListener('click', () => {
  clearValidation(avatarPopup, validationConfig)
  avatarEditForm.reset();
  openPopup(avatarPopup);
});

// Обработчики события отправки сабмитов
profileEditForm.addEventListener('submit', handleFormEditSubmit);
newCardForm.addEventListener('submit', handleFormNewCardSubmit);
avatarEditForm.addEventListener('submit', handleFormEditAvatarSubmit);

// Обработчик события закрытия попапа по кнопке
popupCloseButtons.forEach(function callback(item) {
  item.addEventListener('click', () => { closePopup(item.closest('.popup')) });
});

// Обработчик события закрытия попапа по оверлею
popups.forEach(function callback(item) {
  item.addEventListener('click', () => { closePopup(item) });
});

// Отмена всплытия закрытия по попапу
allPopupsContexts.forEach(function callback(item) {
  item.addEventListener('click', (evt) => {
    evt.stopPropagation();
  });
});

// Функция отправки формы редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileSaveButton.textContent = 'Сохранение...'
  sendChangedUsersRequest(popupNameInput.value, popupDescriptionInput.value)
    .then((res) => {
      profileTitleName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(profileEditPopup);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardSaveButton.textContent = 'Сохранить'
    })
}

// Функция отправки формы создания новой карты
function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  newCardSaveButton.textContent = 'Сохранение...'
  addNewCardsRequest(newCardNameInput.value, newCardUrlInput.value)
  .then((res) => {
      const newCard = createCard(res, deleteCard, handleImageClick, likeCardButton, res.owner._id);
      cardsContainer.prepend(newCard);
      closePopup(newCardPopup);
      newCardPopup.reset;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardSaveButton.textContent = 'Создать'
    })
};

// Функция отправки формы обновленного аватара
function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  avatarSaveButton.textContent = 'Сохранение...'
  editAvatarRequest(avatarPopupInput.value)
  .then((res) => {
      profileImage.src = res.avatar;
      closePopup(avatarPopup);
      avatarPopupInput.value = '';
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      newCardSaveButton.textContent = 'Сохранить'
    })
}

// Автозаполнение инпутов для попапа редактирования
function fillProfileInputs() {
  popupNameInput.value = profileTitleName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
};

// Функция открытия попапа карточки по клику на картинку
function handleImageClick(evt) {
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
  openPopup(imagePopup, evt.target.src, evt.target.alt)
};


Promise.all([getInitalUsersRequest(), getInitialCardsRequest()])
  .then((result) => {
    profileTitleName.textContent = result[0].name;
    profileDescription.textContent = result[0].about;
    profileImage.src = result[0].avatar;
    result[1].forEach(function (card) {
      //const isOwner = card.owner._id === result[0]._id ? true : false;
      //const isLiked = card.likes.find((element) => element._id === result[0]._id);
      //const newCard = createCard(card.name, card.link, card.likes, deleteCard, handleImageClick, likeCardButton, isOwner, card._id, isLiked, result[0]._id);
      const newCard = createCard(card, deleteCard, handleImageClick, likeCardButton, result[0]._id);
      cardsContainer.append(newCard);
    });
  })
  .catch((err) => {
    console.log(err);
  }); 