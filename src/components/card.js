import { delLike, addLike, delCard } from "./api";

const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (data, userID, addLikeCard, openImage, deleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector('.card');
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardBtn = card.querySelector('.card__delete-button');
  const cardLikeBtn = card.querySelector('.card__like-button');
  const cardLikeCounter = card.querySelector('.card__like-counter');

  cardLikeCounter.textContent = data.likes.length;
  cardText.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;
  card.id = data._id;

  if (data.owner._id !== userID) {
    cardBtn.remove();
  }

  if (check(data, userID)) {
    cardLikeBtn.classList.add('card__like-button_is-active');
  } else {
    cardLikeBtn.classList.remove('card__like-button_is-active');
  }

  cardImage.addEventListener('click', () => openImage(data));
  cardBtn.addEventListener('click', () => deleteCard(card));
  cardLikeBtn.addEventListener('click', () => addLikeCard(data, userID, cardLikeBtn, cardLikeCounter));

  return cardElement;
}

export const deleteCard = (card) => {
  delCard(card.id)
    .then(() => card.remove())
    .catch((err) => console.error(`Ошибка: ${err}`))
}

export const addLikeCard = (card, userID, buttonElement, countElement) => {
  if (check(card, userID)) {
    delLike(card)
    .then((res) => {
      handleLike(res, buttonElement, countElement);
      card.likes = res.likes;
    }).catch(handleLikeError)
  } else {
    addLike(card)
    .then((res) => {
      handleLike(res, buttonElement, countElement);
      card.likes = res.likes;
    }).catch(handleLikeError)
  }
}

const check = (card, userID) => {
  return card.likes.some((like) => like._id === userID);
}

const handleLike = (res, buttonElement, countElement) => {
  buttonElement.classList.toggle('card__like-button_is-active');
  countElement.textContent = res.likes.length;
}

const handleLikeError = (err) => {
  console.error(`Ошибка: ${err}`);
}