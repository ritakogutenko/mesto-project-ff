import './pages/index.css';
import { initialCards } from './components/cards'
import { closePopup, openPopup } from './components/modal';
import { createCard, deleteCard, handleLike } from './components/card';

// дом-дерево 
const container = document.querySelector('.content');
const cardList = container.querySelector('.places__list');
// все попапы
const allPopups = document.querySelectorAll('.popup');
// отдельные попапы
const cardPopup = document.querySelector('.popup_type_new-card');
const imageTypePopup = document.querySelector('.popup_type_image');
const profileEdit = document.querySelector('.popup_type_edit');
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

// слушатели на все попапы (закрытие попапов)
allPopups.forEach((out) => {
  out.addEventListener('mouseup', (evt) => {
    const isTargetCloseBtn = evt.target.classList.contains('popup__close');
    const isTargetOverlay = evt.target === evt.currentTarget;
    if (isTargetCloseBtn || isTargetOverlay) closePopup(out);
  })
})

// функция редактирования профиля
const handleFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDesc.textContent = inputDesc.value;
  closePopup(profileEdit);
}

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

  const data = {
    name: inputCardName.value,
    link: inputLinkName.value
  };

  cardList.prepend(createCard(data, handleLike, openImage, deleteCard));

  inputCardName.value = '';
  inputLinkName.value = '';

  closePopup(cardPopup);
}

// вызов карточек на страницу из массива components/cards.js
initialCards.forEach(data => cardList.append(createCard(data, handleLike, openImage, deleteCard)));

// слшуатель на кнопку редактирования профиля
profileEditBtn.addEventListener('click', () => {
  inputName.value = profileName.textContent;
  inputDesc.value = profileDesc.textContent;
  openPopup(profileEdit);
})

// слушатель на кнопку добавления новой карточки
cardBtn.addEventListener('click', () => {
  openPopup(cardPopup);
})

// слушатели на обработку форм (профиля + создание карточки)
profileForm.addEventListener('submit', handleFormSubmit);
cardForm.addEventListener('submit', handleCardSubmit);