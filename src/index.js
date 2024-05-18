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