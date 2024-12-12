import './pages/index.css'; // добавьте импорт главного файла стилей 
import { initialCards } from './scripts/cards.js';
import { addCards } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { closePopupEsc } from './components/modal.js';
import { deleteCard } from './components/card.js';
import { handleLikeClick } from './components/card.js';

const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup')
const popupsClose = document.querySelectorAll('.popup__close')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupNewCardButton = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup_type_edit');
const inputName = formEditProfile.querySelector('.popup__input_type_name');
const inputDescription = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description');
const formNewCard = document.querySelector('.popup_type_new-card');
const inputCardName = formNewCard.querySelector('.popup__input_type_card-name');
const inputLink = formNewCard.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup_type_image');
const popupImageImage = popupImage.querySelector('.popup__image');  
const popupImageCaption = popupImage.querySelector('.popup__caption');


const renderCard = function () {
  initialCards.forEach(function (card) {
    placesList.append(addCards(card.link, card.name, handleLikeClick, openPopupImage, deleteCard));
  });
}

renderCard()
    
popups.forEach(function(popup){
  const closeButton = popup.querySelector('.popup__close')
  closeButton.addEventListener('click', function () {
    closePopup(popup);
  })
})

popupEditButton.addEventListener('click', function () {
  inputName.value = profileTitle.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});

popupNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
}); 

popups.forEach(function(popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
    }
  })
})
  
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  placesList.prepend(addCards(inputLink.value, inputCardName.value, handleLikeClick, openPopupImage, deleteCard));
  closePopup(popupNewCard);
  inputLink.value = '';
  inputCardName.value = '';
}

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

  function openPopupImage(evt) {
  popupImageImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupImage);
 }
 

