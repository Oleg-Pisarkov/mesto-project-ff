
// ДОБАВЛЕНИЕ КАРТОЧКИ

export function addCards(link, name, callBacks) {
  const cardTemplate = document.querySelector('#card-template').content;
  const templateElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
  templateElement.querySelector('.card__title').textContent = name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  const likeButton = templateElement.querySelector('.card__like-button');
  const cardImage = templateElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = name;
 
  

  //обработчик лайка
  likeButton.addEventListener('click', function() {
    callBacks.likeCallback(likeButton);
  })
  
  //обработчик открытия картинки
  cardImage.addEventListener('click', function (evt) {
    callBacks.openPopupCallback(evt);
  });
  //обработчик удаления карточки
  deleteButton.addEventListener('click', function () {
    callBacks.deleteCallback(templateElement);
});

  return templateElement; 
}

// УДАЛЕНИЕ КАРТОЧКИ
export function deleteCard(placesList) {
  placesList.remove()
}
// ЛАЙК КАРТОЧКИ
export function handleLikeClick(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
 }

