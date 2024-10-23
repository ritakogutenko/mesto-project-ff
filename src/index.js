import './pages/index.css';
import { closePopup, openPopup } from './components/modal';
import { createCard, addLikeCard, deleteCard } from './components/card';
import { clearValidation, enableValidation } from './components/validation';
import { getUser, getCards, formEdit, avatarEdit, addCard } from './components/api';

// дом-дерево 
const container = document.querySelector('.content');
const cardList = container.querySelector('.places__list');
// все попапы
const allPopups = document.querySelectorAll('.popup');
// отдельные попапы
const cardPopup = document.querySelector('.popup_type_new-card');
const imageTypePopup = document.querySelector('.popup_type_image');
const profileEdit = document.querySelector('.popup_type_edit');
const profileButton = profileEdit.querySelector('.button');
const cardButton = cardPopup.querySelector('.button');

// форма аватар-карточки
const avatarPopup = document.querySelector('.popup__avatar');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLink = avatarForm.querySelector('.popup__input_type_url');
const profileAvatar = document.querySelector('.profile__image');
const avatarButton = avatarForm.querySelector('.button');

// попап новой карточки
const cardForm = cardPopup.querySelector('.popup__form');
const inputCardName = cardForm.querySelector('.popup__input_type_card-name');
const inputLinkName = cardForm.querySelector('.popup__input_type_url');
// попап профиля
const profileForm = profileEdit.querySelector('.popup__form');
const inputName = profileForm.querySelector('.popup__input_type_name');
const inputDesc = profileForm.querySelector('.popup__input_type_description');
// попап фото
const imagePopup = imageTypePopup.querySelector('.popup__image');
const imageDesc = imageTypePopup.querySelector('.popup__caption');
// данные профиля
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
// кнопки
const cardBtn = document.querySelector('.profile__add-button');
const profileEditBtn = document.querySelector('.profile__edit-button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// слушатели на все попапы (закрытие попапов)
allPopups.forEach((out) => {
  out.addEventListener('mouseup', (evt) => {
    const isTargetCloseBtn = evt.target.classList.contains('popup__close');
    const isTargetOverlay = evt.target === evt.currentTarget;
    if (isTargetCloseBtn || isTargetOverlay) closePopup(out);
  })
})

Promise.all([getUser(), getCards()])
  .then(([user, cards]) => {
    profileName.textContent = user.name;
    profileDesc.textContent = user.about;
    profileAvatar.style.backgroundImage = `url('${user.avatar}')`;
    cards.forEach(card => cardList.append(createCard(card, user._id, addLikeCard, openImage, deleteCard)));
  })
  .catch((err) => console.error(`Ошибка: ${err}`))

// функция редактирования профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileButton.textContent = 'Сохранение...'
  formEdit(inputName.value, inputDesc.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDesc.textContent = res.about;
      closePopup(profileEdit);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
.finally(() => profileButton.textContent = 'Сохранить')
};

const handleAvatarSubmit = (evt) => {
  evt.preventDefault();
  avatarButton.textContent = 'Сохранение...'
  avatarEdit(avatarLink.value)
    .then((res) => {
      profileAvatar.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(avatarPopup)
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => avatarButton.textContent = 'Сохранить')
};

// функция открытия попапа картинок
const openImage = ({name, link}) => {
  imagePopup.alt = name;
  imagePopup.src = link;
  imageDesc.textContent = name;
  openPopup(imageTypePopup);
}

// функция создания новой карточки
const handleCardSubmit = (evt) => {
  evt.preventDefault();
  cardButton.textContent = 'Сохранение...'
  addCard(inputCardName.value, inputLinkName.value)
    .then((card) => {
      cardList.prepend(createCard(card, card.owner._id, addLikeCard, openImage, deleteCard));
      closePopup(cardPopup);
    })
    .catch((err) => console.error(`Ошибка: ${err}`))
    .finally(() => cardButton.textContent = 'Сохранить')
};

// слшуатель на кнопку редактирования профиля
profileEditBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  clearValidation(profileEdit, validationConfig);
  openPopup(profileEdit);
})

// слушатель на кнопку добавления новой карточки
cardBtn.addEventListener('click', () => {
  inputCardName.value = '';
  inputLinkName.value = '';
  clearValidation(cardPopup, validationConfig);
  openPopup(cardPopup);
})

profileAvatar.addEventListener('click', () => {
  avatarLink.value = '';
  clearValidation(avatarPopup, validationConfig);
  openPopup(avatarPopup);
})

// слушатели на обработку форм (профиля + создание карточки)
profileForm.addEventListener('submit', handleProfileFormSubmit);
cardForm.addEventListener('submit', handleCardSubmit);
avatarForm.addEventListener('submit', handleAvatarSubmit);

enableValidation(validationConfig);