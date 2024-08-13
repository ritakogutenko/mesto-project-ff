// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector('#card-template').content;

const container = document.querySelector('.content');
const cardList = container.querySelector('.places__list');

const addCard = (el, deleteCard) => {
  const elementCard = cardTemplate.cloneNode(true);

  const card = elementCard.querySelector('.card');
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardBtn = card.querySelector('.card__delete-button');

  cardText.textContent = el.name;
  cardImage.alt = el.name;
  cardImage.src = el.link;

  cardBtn.addEventListener('click', deleteCard);

  return elementCard;
}

const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

initialCards.forEach(el => cardList.append(addCard(el, deleteCard)));