import { openPopup } from './modal';
import { closePopup } from './modal';
import { featchDeleteCard, featchLikeCard, featchDislikeCard } from '../components/api';

// ДОБАВЛЕНИЕ КАРТОЧКИ

export function addCards(link, name, cardId, likes, userId, cardOwnerId, callBacks) {
  const cardTemplate = document.querySelector('#card-template').content;
  const templateElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
  templateElement.querySelector('.card__title').textContent = name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  const likeButton = templateElement.querySelector('.card__like-button');
  const cardImage = templateElement.querySelector('.card__image');
  const cardLikes = templateElement.querySelector('.card__likes');
  
  cardLikes.textContent = likes.length;
  if(likes.length === 0) {
    cardLikes.textContent = '';
  }

  cardImage.src = link;
  cardImage.alt = name;

  if (cardOwnerId !== userId) {
    templateElement.querySelector('.card__delete-button').remove(); 
  }

  //обработчик лайка
  
  likeButton.addEventListener('click', function() {
    
    if(likeButton.classList.contains('card__like-button_is-active')) {
      featchDislikeCard(cardId)
      .then((data) => {
        callBacks.likeCallback(likeButton);
        cardLikes.textContent = data.likes.length;
        if(data.likes.length === 0) {
          cardLikes.textContent = '';
        }
        
      })
    } else {
      featchLikeCard(cardId)
      .then((data) => {
        callBacks.likeCallback(likeButton);
        cardLikes.textContent = data.likes.length;
      })
    } 
    })
  
  //обработчик открытия картинки
  cardImage.addEventListener('click', function (evt) {
    callBacks.openPopupCallback(evt);
  });

  //обработчик удаления карточки
  deleteButton.addEventListener('click', function () {
    const popupDeleteCard = document.querySelector('.popup_type_delete');
    openPopup(popupDeleteCard);
    const buttonDelete = popupDeleteCard.querySelector('.popup__button');
    buttonDelete.addEventListener('click', function () {
    callBacks.deleteCallback(templateElement, userId, cardOwnerId, cardId);
    closePopup(popupDeleteCard);
   })
});

  return templateElement; 
}

// УДАЛЕНИЕ КАРТОЧКИ
export function deleteCard(placesList, userId, cardOwnerId, cardId) {
  if(userId == cardOwnerId) {
    featchDeleteCard(cardId)
  .then(() => {
    placesList.remove();
  })
  }
}

// ЛАЙК КАРТОЧКИ
export function handleLikeClick(likeButton) {
 // likeButton.classList.toggle('card__like-button_is-active');
  if(likeButton.classList.contains('card__like-button_is-active')) {
    likeButton.classList.remove('card__like-button_is-active');
  } else {
    likeButton.classList.add('card__like-button_is-active');
  }
 }

