import './pages/index.css'; // добавьте импорт главного файла стилей 
import { addCards } from './scripts/card.js';
import { openPopup } from './scripts/modal.js';
import { closePopup } from './scripts/modal.js';
import { enableValidation } from './components/validation.js';
import { clearValidation } from './components/validation.js';
import { featchEditProfile, featchNewCard, featchEditAvatar, loadUserData, featchDeleteCard, featchLikeCard, featchDislikeCard } from './components/api.js';


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
const popupDeleteCard = document.querySelector('.popup_type_delete');
const buttonDeleteCard = popupDeleteCard.querySelector('.popup__button');

let userId = null;
let cardId = null;


const callBacks = {
  likeCallback: handleLikeClick,
  openPopupCallback: openPopupImage,
  openDeletePopupCallback: openDeletePopup,
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

loadUserData()
.then(([userData, cards]) => {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.src = userData.avatar;
  userId = userData._id;

  cards.forEach((card) => {
   cardId = card._id;
   placesList.append(addCards(card.link, card.name, card._id, card.likes, userId, card.owner._id, callBacks));
  
  });
})
.catch((err) => {
  console.log(err);
});

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
  
  clearValidation(popupEdit, validationConfig);
});

popupNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
  
  clearValidation(popupNewCard, validationConfig);
}); 

popupEditAvatarButton.addEventListener('click', function () {
  openPopup(formAvatarProfile);
  
  clearValidation(formAvatarProfile, validationConfig);
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
  profileButton.textContent = 'Сохранение....';
  const nameValue = inputName.value;
  const descriptionValue = inputDescription.value

  featchEditProfile(nameValue, descriptionValue)
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;
      closePopup(popupEdit);
})
    .catch((err) => {
      console.log(err);
})
    .finally(() => {
      profileButton.textContent = 'Сохранить';
    })
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  avatarButton.textContent = 'Сохранение....';
  featchEditAvatar(inputAvatar.value)
  .then((data) => {
    inputAvatar.value = data.avatar; 
    profileImage.src = inputAvatar.value;
    inputAvatar.value = '';
    closePopup(formAvatarProfile);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    avatarButton.textContent = 'Сохранить';
  })
}

formAvatarProfile.addEventListener('submit', handleFormSubmitAvatar);

function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  newCardButton.textContent = 'Сохранение....';
  

 
  
  featchNewCard(inputCardName.value, inputLink.value)
  .then((data) => {
    inputCardName.value = data.name;
    inputLink.value = data.link; 
    cardId = data._id;
    closePopup(popupNewCard);
    placesList.prepend(addCards(inputLink.value, inputCardName.value, cardId, 0, userId, userId, callBacks));
    inputLink.value = '';
    inputCardName.value = '';
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    newCardButton.textContent = 'Сохранить';
   
  })
  
}

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

  function openPopupImage(evt) {
  popupImageImage.src = evt.target.src;
  popupImageImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupImage);
 };
 
 // ЛАЙК КАРТОЧКИ
 
 function handleLikeClick(likeButton, cardId, cardLikes) {
  
  if(likeButton.classList.contains('card__like-button_is-active')) {
    featchDislikeCard(cardId)
    .then((data) => {
      likeButton.classList.remove('card__like-button_is-active');
      cardLikes.textContent = data.likes.length;
      if(data.likes.length === 0) {
        cardLikes.textContent = '';
      }
    })
    .catch((err) => {
      console.log(err);
    });

    
  } else {
    
    featchLikeCard(cardId)
    .then((data) => {
      likeButton.classList.add('card__like-button_is-active');
      cardLikes.textContent = data.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
  } 
 };
 

// Удаление карточки


let cardDelete = null;
let cardIdDelete = null;

    
function openDeletePopup(element, cardId) {
  cardDelete = element;
  cardIdDelete = cardId;

  openPopup(popupDeleteCard);
  
 };


buttonDeleteCard.addEventListener('click', function () {
  featchDeleteCard(cardIdDelete)
  .then(() => {
    cardDelete.remove();
    closePopup(popupDeleteCard);
  })
  .catch((err) => {
    console.log(err);
  })
});

 enableValidation(validationConfig);
