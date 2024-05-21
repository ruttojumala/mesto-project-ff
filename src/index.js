import './pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCardButton } from './components/card.js';
import { openPopup, closePopup} from './components/modal.js';

// DOM узлы
const conteinerCards = document.querySelector('.places__list');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const contentPopups = document.querySelectorAll('.popup__content');
const closeButtons = document.querySelectorAll('.popup__close');
const formNewCard = popupNewCard.querySelector('.popup__form');
const newCardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const newCardUrlInput = formNewCard.querySelector('.popup__input_type_url');
const titleName = document.querySelector('.profile__title');
const titleDescription = document.querySelector('.profile__description');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const formEdit = document.querySelector('.popup__form');

// Выводим карточки на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link, deleteCard, openPopup, likeCardButton);
  conteinerCards.append(newCard);
});

// Обработчики события открытия попапов 
buttonEdit.addEventListener('click', () => { openPopup(popupEdit) });
buttonAdd.addEventListener('click', () => { openPopup(popupNewCard) });

// Обработчики события отправки сабмитов
formEdit.addEventListener('submit', handleFormEditSubmit);
formNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Обработчик события закрытия попапа по кнопке
closeButtons.forEach(function callback (item) {
  item.addEventListener('click', () => { closePopup(item.closest('.popup')) });
});

// Обработчик события закрытия попапа по оверлею
popups.forEach(function callback (item) {
  item.addEventListener('click', () => {  closePopup(item) });
});

// Отмена всплытия закрытия по попапу
contentPopups.forEach(function callback (item) {
  item.addEventListener('click', (evt) =>  {
    evt.stopPropagation();
  });
});

// Функция отправки формы редактирования
function handleFormEditSubmit(evt) {
  evt.preventDefault();
  titleName.textContent = nameInput.value;
  titleDescription.textContent = jobInput.value;
  closePopup(evt.target.closest('.popup'));
}

// Функция отправки формы создания новой карты
function handleFormNewCardSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard(newCardNameInput.value, newCardUrlInput.value, deleteCard, openPopup, likeCardButton);
  conteinerCards.prepend(newCard);
  closePopup(evt.target.closest('.popup'));
  newCardNameInput.value = '';
  newCardUrlInput.value = '';
};