
// ДОБАВЛЕНИЕ КАРТОЧКИ

export function addCards(link, name, cardId, likes, userId, cardOwnerId, callBacks) {
  const cardTemplate = document.querySelector('#card-template').content;
  const templateElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
  templateElement.querySelector('.card__title').textContent = name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  const likeButton = templateElement.querySelector('.card__like-button');
  const cardImage = templateElement.querySelector('.card__image');
  const cardLikes = templateElement.querySelector('.card__likes');
  const likesId = likes.map((like) => like._id);

  cardImage.src = link;
  cardImage.alt = name;


  cardLikes.textContent = likes.length;
  if(likes.length === 0) {
    cardLikes.textContent = '';
  }
 
  if(likesId.includes(userId)) {
   likeButton.classList.add('card__like-button_is-active');
  }

  if (cardOwnerId !== userId) {
    templateElement.querySelector('.card__delete-button').remove(); 
  }

  //обработчик лайка
  likeButton.addEventListener('click', function() {
    callBacks.likeCallback(likeButton, cardId, cardLikes);
    })

  //обработчик открытия картинки
  cardImage.addEventListener('click', function (evt) {
    callBacks.openPopupCallback(evt);
  });

  //обработчик  открытия модального окна удаления карточки
  
  deleteButton.addEventListener('click', function () {
    callBacks.openDeletePopupCallback(templateElement, cardId);
  });
  
  
  return templateElement; 
}

