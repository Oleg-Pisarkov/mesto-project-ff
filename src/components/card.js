
// ДОБАВЛЕНИЕ КАРТОЧКИ
export function addCards(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const templateElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__image').alt = name;
  templateElement.querySelector('.card__title').textContent = name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCard(templateElement);
});
  const likeButton = templateElement.querySelector('.card__like-button');

  handleLikeClick(likeButton);
  
  return templateElement; 
}

// УДАЛЕНИЕ КАРТОЧКИ
function deleteCard(placesList) {
  placesList.remove()
}
// ЛАЙК КАРТОЧКИ
function handleLikeClick(likeButton) {
  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
  });
 }