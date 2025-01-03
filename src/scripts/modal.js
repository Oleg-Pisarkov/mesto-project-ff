//ОТКРЫТИЕ МОДАЛЬНОГО ОКНА
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
} 
//ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА
export function closePopup(popup) {
      popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closePopupEsc);
    }
//ЗАКРЫТИЕ МОДАЛЬНОГО ОКНА ESC
export function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

