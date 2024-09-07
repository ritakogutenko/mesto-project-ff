const cardTemplate = document.querySelector('#card-template').content;

export const createCard = (data, handleLike, openImage, deleteCard) => {
  const cardElement = cardTemplate.cloneNode(true);

  const card = cardElement.querySelector('.card');
  const cardText = card.querySelector('.card__title');
  const cardImage = card.querySelector('.card__image');
  const cardBtn = card.querySelector('.card__delete-button');
  const cardLikeBtn = card.querySelector('.card__like-button');

  cardText.textContent = data.name;
  cardImage.alt = data.name;
  cardImage.src = data.link;

  cardImage.addEventListener('click', () => openImage(data));
  cardBtn.addEventListener('click', deleteCard);
  cardLikeBtn.addEventListener('click', () => handleLike(card));

  return cardElement;
}

export const deleteCard = (evt) => {
  evt.target.closest('.card').remove();
}

export const handleLike = (cardLike) => {
  const likeBtn = cardLike.querySelector('.card__like-button');
  likeBtn.classList.toggle('card__like-button_is-active');
}