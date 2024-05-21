let popupOpened = null;

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popupOpened = popup;
  window.addEventListener('keydown', handleDownKey);
};

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popupOpened = null;
  window.removeEventListener('keydown', handleDownKey);
};
    
// Закрытие попапа на кнопку "Escape"
function handleDownKey(evt) {
  if (evt.key === 'Escape'){
    closePopup(popupOpened);
  }
};

// Экспорт попапов
export {openPopup, closePopup};