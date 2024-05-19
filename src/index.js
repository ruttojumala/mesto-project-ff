import './pages/index.css';
import { initialCards } from './cards.js';

// @todo: Темплейт карточ
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

const conteinerCards = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, img, deleteCard) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  
  const cardImg = cardTemplateClone.querySelector('.card__image');
  const cardTitle = cardTemplateClone.querySelector('.card__title');
  
  cardTitle.textContent = name;
  cardImg.src = img;
  cardImg.alt = name;

  const buttonCardDelete = cardTemplateClone.querySelector('.card__delete-button');
  buttonCardDelete.addEventListener('click', deleteCard);

  return cardTemplateClone;
};

// @todo: Функция удаления карточки
function deleteCard(evt){
  evt.target.closest('.card').remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(function(item) {
  const newCard = createCard(item.name, item.link, deleteCard);
  conteinerCards.append(newCard);
});

// Открытие и закрытие модального окна
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const profileImage = document.querySelector('.profile__image');
const popupEdit = document.querySelector('.popup_type_edit');
const popupContent = document.querySelector('.popup__content');
function openPopupEdit() {
  popupEdit.classList.add('popup_is-opened');
  window.addEventListener('keydown', handleDownKey);
};

buttonEdit.addEventListener('click', openPopupEdit);
buttonAdd.addEventListener('click', openPopupEdit);
profileImage.addEventListener('click', openPopupEdit);

const buttonClose = document.querySelector('.popup__close');
function closePopupEdit() {
  popupEdit.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', handleDownKey);
};
buttonClose.addEventListener('click', closePopupEdit);
popupEdit.addEventListener('click', closePopupEdit);
popupContent.addEventListener('click', (evt) =>  {
  evt.stopPropagation();
});
function handleDownKey(evt) {
  if (evt.key === 'Escape'){
    closePopupEdit()
  }
};