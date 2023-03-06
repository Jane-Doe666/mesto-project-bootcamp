import "./index.css";
import enableValidation from "./components/validate.js";
import createCard from "./components/card.js";
import { openPopup, closePopup } from "./components/utils";
import { handleOverlay } from "./components/modal.js";
const popupUserInfo = document.querySelector(".popup_info");
const popupAddСard = document.querySelector(".popup_place");
const popupsList = document.querySelectorAll(".popup");
const containerOfPictures = document.querySelector(".elements__list");
const buttonEditPopup = document.querySelector(".profile__button-edit");
const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__position");
const popupUserForm = document.forms.formUserInfo;
const popupPlaceForm = document.forms.formPlace;
const fieldName = popupUserInfo.querySelector(".popup__field_name");
const fieldPosission = popupUserInfo.querySelector(".popup__field_profession");
const buttonAddPic = document.querySelector(".profile__button-add");
const pictName = popupAddСard.querySelector(".popup__field_picName");
const pictLink = popupAddСard.querySelector(".popup__field_link");
const buttonAddPlace = popupAddСard.querySelector(".popup__button-submit");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function handleUserInfo(evt) {
  evt.preventDefault();
  userName.textContent = fieldName.value;
  userProfession.textContent = fieldPosission.value;
}

initialCards.forEach((item) => {
  const card = createCard(item.link, item.name);
  containerOfPictures.append(card);
});

buttonAddPic.addEventListener("click", () => {
  openPopup(popupAddСard);
});

popupAddСard.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = createCard(pictLink.value, pictName.value);
  popupPlaceForm.reset();
  containerOfPictures.prepend(newCard);
  closePopup(popupAddСard);
});

buttonEditPopup.addEventListener("click", () => {
  openPopup(popupUserInfo);
  fieldName.value = userName.textContent;
  fieldPosission.value = userProfession.textContent;
});

popupUserForm.addEventListener("submit", (evt) => {
  handleUserInfo(evt);
  closePopup(popupUserInfo);
});

//переписать событие
popupsList.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlay);
  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => {
    closePopup(popup);
  });
});

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_disable",
  inputErrorClass: "popup__field_invalid",
});
