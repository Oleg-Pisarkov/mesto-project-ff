// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const placesList = document.querySelector('.places__list');

function addCards(link, name) {
  const cardTemplate = document.querySelector('#card-template').content;
  const templateElement = cardTemplate.querySelector('.places__item ').cloneNode(true);
  templateElement.querySelector('.card__image').src = link;
  templateElement.querySelector('.card__title').textContent = name;
  const deleteButton = templateElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', function () {
    deleteCard(templateElement);
});

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