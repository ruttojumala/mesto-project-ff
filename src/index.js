import './pages/index.css';
import { initialCards } from './cards.js';

// @todo: Темплейт карточ
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы

const conteinerCards = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(name, img, deleteCard, likeCard) {
  const cardTemplateClone = cardTemplate.cloneNode(true);
  
  const cardImg = cardTemplateClone.querySelector('.card__image');
  const cardTitle = cardTemplateClone.querySelector('.card__title');
  
  cardTitle.textContent = name;
  cardImg.src = img;
  cardImg.alt = name;

  const buttonCardDelete = cardTemplateClone.querySelector('.card__delete-button');
  buttonCardDelete.addEventListener('click', deleteCard);

  const buttonCardLike = cardTemplateClone.querySelector('.card__like-button');
  buttonCardLike.addEventListener('click', () => { likeCardButton(buttonCardLike)} );

  cardImg.addEventListener('click', () => { openPopup(popupTypeImage, img, name) });

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
const popups = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupContent = document.querySelectorAll('.popup__content');
const buttonClose = document.querySelectorAll('.popup__close');

function openPopup(popup, img, name) {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', (evt) => { handleDownKey (evt, popup)});
  nameInput.value = titleName.textContent;
  jobInput.value = titleDescription.textContent;

  // Открытие попапа с картинкой

  if(popup.classList.contains('popup_type_image')){
    const imgPopup = popup.querySelector('.popup__image');
    const captionPopup = popup.querySelector('.popup__caption');
    imgPopup.src = img;
    imgPopup.alt = name;
    captionPopup.textContent = name;
  }
};

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', (evt) => { handleDownKey (evt, popup)});
};


function handleDownKey(evt, popup) {
  if (evt.key === 'Escape'){
    closePopup(popup);
  }
};

buttonEdit.addEventListener('click', () => { openPopup(popupEdit) });
buttonAdd.addEventListener('click', () => { openPopup(popupNewCard) });

buttonClose.forEach(function callback (item) {
  item.addEventListener('click', () => { closePopup(item.closest('.popup')) });
});
popups.forEach(function callback (item) {
  item.addEventListener('click', () => {  closePopup(item) });
});
popupContent.forEach(function callback (item) {
  item.addEventListener('click', (evt) =>  {
    evt.stopPropagation();
  });
});
  

// Редактирование имени и информации о себе
const titleName = document.querySelector('.profile__title');
const titleDescription = document.querySelector('.profile__description');

// Находим форму в DOM
const formEdit = document.querySelector('.popup__form');
// Находим поля формы в DOM
const nameInput = formEdit.querySelector('.popup__input_type_name');
const jobInput = formEdit.querySelector('.popup__input_type_description');
const formNewCard = popupNewCard.querySelector('.popup__form');
const newCardNameInput = formNewCard.querySelector('.popup__input_type_card-name');
const newCardUrlInput = formNewCard.querySelector('.popup__input_type_url');
/*const cardNameInput = document.querySelector()*/

// Обработчик «отправки» формы
function handleFormEditSubmit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
    // Получите значение полей jobInput и nameInput из свойства value
    // Выберите элементы, куда должны быть вставлены значения полей
    // Вставьте новые значения с помощью textContent
      titleName.textContent = nameInput.value;
      titleDescription.textContent = jobInput.value;
    closePopup(evt.target.closest('.popup'));
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener('submit', handleFormEditSubmit);

//Добавление карточки 

function handleFormNewCardSubmit (evt) {
  evt.preventDefault();
  const newCard = createCard(newCardNameInput.value, newCardUrlInput.value, deleteCard);
  conteinerCards.prepend(newCard);
  closePopup(evt.target.closest('.popup'));
};

formNewCard.addEventListener('submit', handleFormNewCardSubmit);

// Лайк карточки 

function likeCardButton (buttonCardLike) {
  if(buttonCardLike.classList.contains('card__like-button_is-active')){
    buttonCardLike.classList.remove('card__like-button_is-active');
  } else { 
    buttonCardLike.classList.add('card__like-button_is-active');
  };
};