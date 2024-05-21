import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCardButton } from './components/card.js';
import { openPopup, closePopup} from './components/modal.js';

// DOM узлы
const conteinerCards = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const newCardButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const allPopupsContent = document.querySelectorAll('.popup__content');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardNameInput = newCardForm.querySelector('.popup__input_type_card-name');
const newCardUrlInput = newCardForm.querySelector('.popup__input_type_url');
const profileTitleName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');
const profileEditForm = profileEditPopup.querySelector('.popup__form');

// Выводим карточки на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link, deleteCard, handleImageClick, likeCardButton);
  conteinerCards.append(newCard);
});

// Обработчики события открытия попапов 
profileEditButton.addEventListener('click', () => { 
  openPopup(profileEditPopup);
  fillProfileInputs();
});
newCardButton.addEventListener('click', () => { openPopup(newCardPopup) });

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
allPopupsContent.forEach(function callback (item) {
  item.addEventListener('click', (evt) =>  {
    evt.stopPropagation();
  });
});

// Функция отправки формы редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileTitleName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;
  closePopup(evt.target.closest('.popup'));
}

// Функция отправки формы создания новой карты
function handleFormNewCardSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard(newCardNameInput.value, newCardUrlInput.value, deleteCard, handleImageClick, likeCardButton);
  conteinerCards.prepend(newCard);
  closePopup(evt.target.closest('.popup'));
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
  const imgPopup = imagePopup.querySelector('.popup__image');
  const captionPopup = imagePopup.querySelector('.popup__caption');
  imgPopup.src = evt.target.src;
  imgPopup.alt = evt.target.alt;
  captionPopup.textContent = evt.target.alt;
  openPopup(imagePopup, evt.target.src, evt.target.alt)
};