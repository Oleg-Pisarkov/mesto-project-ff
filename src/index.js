import './pages/index.css'; // добавьте импорт главного файла стилей 
import { addCards } from './scripts/card.js';
import { openPopup } from './scripts/modal.js';
import { closePopup } from './scripts/modal.js';
import { deleteCard } from './scripts/card.js';
import { handleLikeClick } from './scripts/card.js';
import { enableValidation } from './components/validation.js';
import { clearValidation } from './components/validation.js';
import { featchEditProfile, featchNewCard, featchEditAvatar, loadUserData } from './components/api.js';


const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupNewCardButton = document.querySelector('.profile__add-button');
const formEditProfile = document.querySelector('.popup_type_edit');
const formAvatarProfile = document.querySelector('.popup_type_avatar');
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
const popupEditAvatarButton = document.querySelector('.profile__avatar-button');
const inputAvatar = formAvatarProfile.querySelector('.popup__input_type_url');
const avatarButton = document.querySelector('.avatar__button');
const newCardButton = document.querySelector('.new_card-button');
const profileButton = document.querySelector('.profile__button');
const profileImage = document.querySelector('.profile__image');

const callBacks = {
  likeCallback: handleLikeClick,
  openPopupCallback: openPopupImage,
  deleteCallback: deleteCard,
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

let userId = null;
let cardId = null;


loadUserData()
.then(([userData, cards]) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.src = userData.avatar;
  userId = userData._id;
  
  cards.forEach((card) => {
    cardId = card._id;
   placesList.append(addCards(card.link, card.name, cardId, card.likes, userId, card.owner._id, callBacks));
  });
})
.catch((err) => {
  console.log(err);
})

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
  profileButton.textContent = 'Сохранить';
  clearValidation(validationConfig);
});

popupNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
  newCardButton.textContent = 'Сохранить';
  clearValidation(validationConfig);
}); 

popupEditAvatarButton.addEventListener('click', function () {
  openPopup(formAvatarProfile);
  avatarButton.textContent = 'Сохранить';
  clearValidation(validationConfig);
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
  
  const nameValue = inputName.value;
  const descriptionValue = inputDescription.value

  featchEditProfile(nameValue, descriptionValue)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

})
    .catch((err) => {
      console.log(err);
})

  profileButton.textContent = 'Сохранение....';
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  
  featchEditAvatar(inputAvatar.value)
  .then((data) => {
    inputAvatar.value = data.avatar; 
    profileImage.src = inputAvatar.value;
    inputAvatar.value = '';
  })
  .catch((err) => {
    console.log(err);
  })

  avatarButton.textContent = 'Сохранение....';
  closePopup(formAvatarProfile);
}

formAvatarProfile.addEventListener('submit', handleFormSubmitAvatar);

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  
  placesList.prepend(addCards(inputLink.value, inputCardName.value, cardId, 0, userId, userId, callBacks));
  
  featchNewCard(inputCardName.value, inputLink.value)
  .then((data) => {
    inputCardName.value = data.name;
    inputLink.value = data.link; 
    inputLink.value = '';
    inputCardName.value = '';
  })
  .catch((err) => {
    console.log(err);
  });

  newCardButton.textContent = 'Сохранение....';
  closePopup(popupNewCard);
}

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

  function openPopupImage(evt) {
  popupImageImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupImage);
 };
 
 enableValidation(validationConfig);





 





