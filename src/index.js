import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCardButton } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getInitalUsers, prom } from './api.js';

// DOM узлы
const cardsContainer = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
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

// валидация
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}); 

// Выводим карточки на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link, deleteCard, handleImageClick, likeCardButton);
  cardsContainer.append(newCard);
});

// Обработчики события открытия попапов 
profileEditButton.addEventListener('click', () => { 
  openPopup(profileEditPopup);
  fillProfileInputs();
  clearValidation(profileEditPopup, {
    inputClass: ".popup__input",
    runToggleButton: true,
    runIsValid: true
  })
});
newCardButton.addEventListener('click', () => { 
  openPopup(newCardPopup);
  clearValidation(newCardPopup, {
    inputClass: ".popup__input",
    runToggleButton: true,
    runIsValid: false
  })
});

// Обработчики события отправки сабмитов
profileEditForm.addEventListener('submit', handleFormEditSubmit);
newCardForm.addEventListener('submit', handleFormNewCardSubmit);

// Обработчик события закрытия попапа по кнопке
popupCloseButtons.forEach(function callback (item) {
  item.addEventListener('click', () => { closePopup(item.closest('.popup')) });
});

// Обработчик события закрытия попапа по оверлею
popups.forEach(function callback (item) {
  item.addEventListener('click', () => {  closePopup(item) });
});

// Отмена всплытия закрытия по попапу
allPopupsContexts.forEach(function callback (item) {
  item.addEventListener('click', (evt) =>  {
    evt.stopPropagation();
  });
});

// Функция отправки формы редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;
  closePopup(profileEditPopup);
}

// Функция отправки формы создания новой карты
function handleFormNewCardSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard(newCardNameInput.value, newCardUrlInput.value, deleteCard, handleImageClick, likeCardButton);
  cardsContainer.prepend(newCard);
  closePopup(newCardPopup);
  newCardNameInput.value = '';
  newCardUrlInput.value = '';
};

// Автозаполнение инпутов для попапа редактирования
function fillProfileInputs() {
  popupNameInput.value = profileTitleName.textContent;
  popupDescriptionInput.value =  profileDescription.textContent; 
};

// Функция открытия попапа карточки по клику на картинку
function handleImageClick(evt) {
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
  openPopup(imagePopup, evt.target.src, evt.target.alt)
};

/*getInitialCards();
getInitalUsers()
.then((result) => {
  profileTitleName.textContent = result.name;
  profileDescription.textContent = result.about;
  profileImage.src = result.avatar;
});*/

Promise.all([getInitalUsers(), getInitialCards()])
.then((result) => {
  profileTitleName.textContent = result[0].name;
  profileDescription.textContent = result[0].about;
  profileImage.src = result[0].avatar;
})