let popupOpened = null;

// Открытие попапа
function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popupOpened = popup;
  window.addEventListener('keydown', handleEscape);
};

// Закрытие попапа
function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popupOpened = null;
  window.removeEventListener('keydown', handleEscape);
};
    
// Закрытие попапа на кнопку "Escape"
function handleEscape(evt) {
  if (evt.key === 'Escape'){
    closePopup(popupOpened);
  }
};

// Экспорт попапов
export {openPopup, closePopup};