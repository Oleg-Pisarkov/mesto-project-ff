import './pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from './scripts/cards.js';
const placesList = document.querySelector('.places__list');


function addCards(link, name ) {
  const cardTemplate = document.querySelector('#card-template').content;
  const templateElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__title').textContent = name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCard(templateElement);
});
  const likeButton = templateElement.querySelector('.card__like-button');

  handleLikeClick(likeButton)
  return templateElement;
  
}


const renderCard = function () {
  initialCards.forEach(function (card) {
    placesList.append(addCards(card.link, card.name));
  });
}

renderCard()

function deleteCard(placesList) {
  placesList.remove()
}


//popup 
const popupEdit = document.querySelector('.popup_type_edit'); 

const popupNewCard = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');

const popups = document.querySelectorAll('.popup')
const popupsClose = document.querySelectorAll('.popup__close')
const popupEditButton = document.querySelector('.profile__edit-button');
const popupNewCardButton = document.querySelector('.profile__add-button');

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closePopupEsc);
} 

function closePopup(popup) {
      popup.classList.remove('popup_is-opened');
      document.removeEventListener('keydown', closePopupEsc);
    }

function closePopupEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(popupEdit);
    closePopup(popupNewCard);
    closePopup(popupImage);
  }
}

popupsClose.forEach(function(popupClose) {
  popupClose.addEventListener('click', function () {
    closePopup(popupEdit);
    closePopup(popupNewCard);
    closePopup(popupImage);
  })
})

popupEditButton.addEventListener('click', function () {
  openPopup(popupEdit);
});

popupNewCardButton.addEventListener('click', function () {
  openPopup(popupNewCard);
}); 

popups.forEach(function(popup) {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
      closePopup(popup);
      document.removeEventListener('keydown', closePopupEsc);
    }
  })
})
  

//inpyt card


const formEditProfile = document.querySelector('.popup_type_edit');
const inputName = formEditProfile.querySelector('.popup__input_type_name');
const inputDescription = formEditProfile.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title'); 
const profileDescription = document.querySelector('.profile__description');


function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(popupEdit);
}

formEditProfile.addEventListener('submit', handleFormSubmit);


// inpyt newcard

const formNewCard = document.querySelector('.popup_type_new-card');
const inputCardName = formNewCard.querySelector('.popup__input_type_card-name');
const inputLink = formNewCard.querySelector('.popup__input_type_url');


function handleFormSubmitNewCard(evt) {
  evt.preventDefault();
  placesList.prepend(addCards(inputLink.value, inputCardName.value));
  closePopup(popupNewCard);
}

formNewCard.addEventListener('submit', handleFormSubmitNewCard);

// like .card__like-button_is-active



 function handleLikeClick(likeButton) {
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });
 
 }


