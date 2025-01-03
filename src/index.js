import './pages/index.css'; // добавьте импорт главного файла стилей 
import { addCards } from './components/card.js';
import { openPopup } from './components/modal.js';
import { closePopup } from './components/modal.js';
import { closePopupEsc } from './components/modal.js';
import { deleteCard } from './components/card.js';
import { handleLikeClick } from './components/card.js';
import { enableValidation } from './components/validation.js';
import { clearValidation } from './components/validation.js';


const placesList = document.querySelector('.places__list');
const popupEdit = document.querySelector('.popup_type_edit'); 
const popupNewCard = document.querySelector('.popup_type_new-card');
const popups = document.querySelectorAll('.popup')
const popupsClose = document.querySelectorAll('.popup__close')
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
const profileForm = document.querySelector('.profile__form'); 
const popupDeleteCard = document.querySelector('.popup_type_delete');
const popupEditAvatarButton = document.querySelector('.profile__avatar-button');
const inputAvatar = formAvatarProfile.querySelector('.popup__input_type_url');
const avatarButton = document.querySelector('.avatar__button');
const newCardButton = document.querySelector('.new_card-button');
const profileButton = document.querySelector('.profile__button');

const callBacks = {
  likeCallback: handleLikeClick,
  openPopupCallback: openPopupImage,
  deleteCallback: deleteCard,
};

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};




   

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
  clearValidation();
});

popupNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
  newCardButton.textContent = 'Сохранить';
  clearValidation();
}); 

popupEditAvatarButton.addEventListener('click', function () {
  openPopup(formAvatarProfile);
  avatarButton.textContent = 'Сохранить';
  clearValidation();
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
  profileButton.textContent = 'Сохранение....';
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', handleProfileFormSubmit);


function handleFormSubmitAvatar(evt) {
  evt.preventDefault();
  
  featchEditAvatar(inputAvatar.value)
  .then((data) => {
    inputAvatar.value = data.avatar;
    inputAvatar.value = '';
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
  newCardButton.textContent = 'Сохранение....';
  closePopup(popupNewCard);
}

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

  function openPopupImage(evt) {
  popupImageImage.src = evt.target.src;
  popupImageCaption.textContent = evt.target.alt;
  openPopup(popupImage);
 };
 

 enableValidation();





 
//////////////API 
const profileImage = document.querySelector('.profile__image');




//ЗАГРУЗКА ДАННЫХ ПОЛЬЗОВАТЕЛЯ 
function getUserData() {
 return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-29/users/me', 
  { 
    method: 'GET',
    headers: { authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f' } })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}

// Загрузка карточек с сервера
function getCards() {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-29/cards',
  { 
    method: 'GET',
    headers: { authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f' } })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }else{
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  })
}
let userId = null;
let cardId = null;
function loadUserData() {
  return Promise.all([getUserData(), getCards()])
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
}

loadUserData()


// РЕДАКТИРОВАНИЕ ПРОФИЛЯ 
 
function featchEditProfile(name, about) {
  return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-29/users/me', {
    method: 'PATCH',
    headers: {
      authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      about: about,
    })
  })
  .then(res => res.json())
  
  }


  ////Добавление новой карточки

  export function featchNewCard(name, link) {
    return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-29/cards ', {
      method: 'POST',
      headers: {
        authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link,
      })
    })
    .then(res => res.json())
    
    }

    
    ///УДАЛЕНИЕ КАРТОЧКИ
    
    export function featchDeleteCard(cardId) {
      return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-29/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
        }
      })
      .then(res => res.json())
      
      }

      /// ПОСТАНОВКА ЛАЙКА

      export function featchLikeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-29/cards/${cardId}/likes`, {
          method: 'PUT',
          headers: {
            authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
          }
        })
        .then(res => res.json())
        
        }

        /// СНЯТИЕ ЛАЙКА

        export function featchDislikeCard(cardId) {
          return fetch(`https://mesto.nomoreparties.co/v1/wff-cohort-29/cards/${cardId}/likes`, {
            method: 'DELETE',
            headers: {
              authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
            }
          })
          .then(res => res.json())
          
          }


          //Обновление аватара пользователя

          export function featchEditAvatar(avatar) {
            return fetch('https://mesto.nomoreparties.co/v1/wff-cohort-29/users/me/avatar', {
              method: 'PATCH',
              headers: {
                authorization: 'dd733b9c-9d2a-4111-8e6e-6b504e32608f',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                avatar: avatar,
              })
            })
            .then(res => res.json())
          } 