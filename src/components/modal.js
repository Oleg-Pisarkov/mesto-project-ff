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
    const popupEdit = document.querySelector('.popup_type_edit'); 
    const popupNewCard = document.querySelector('.popup_type_new-card');
    const popupImage = document.querySelector('.popup_type_image');
    closePopup(popupEdit);
    closePopup(popupNewCard);
    closePopup(popupImage);
  }
}

