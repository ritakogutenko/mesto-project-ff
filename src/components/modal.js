export const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEsc);
}

export const closePopup = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', closeEsc);
}

const closeEsc = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.code === 'Escape' && openedPopup) closePopup(openedPopup);
}