// Открытие попапа
function openPopup(popup, img, name) {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', (evt) => { handleDownKey (evt, popup)});
  
// Вызов предзаполнения инпутов при открытии попапа редактирование
  if(popup.classList.contains('popup_type_edit')){
    fillInputs(popup);
  };

// Открытие попапа с картинкой
  if(popup.classList.contains('popup_type_image')){
    const imgPopup = popup.querySelector('.popup__image');
    const captionPopup = popup.querySelector('.popup__caption');
    imgPopup.src = img;
    imgPopup.alt = name;
    captionPopup.textContent = name;
  }
};

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  window.removeEventListener('keydown', (evt) => { handleDownKey (evt, popup)});
};

// Закрытие попапа на кнопку "Escape"
function handleDownKey(evt, popup) {
  if (evt.key === 'Escape'){
    closePopup(popup);
  }
};

// Автозаполнение инпутов для попапа редактирования
function fillInputs(popup) {
  popup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
  popup.querySelector('.popup__input_type_description').value =  document.querySelector('.profile__description').textContent; 
};

// Экспорт попапов
export {openPopup, closePopup};