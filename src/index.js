import "./index.css";

const popupPicture = document.querySelector(".popup_picture");
const popupUserInfo = document.querySelector(".popup_info");
const popupAddPic = document.querySelector(".popup_place");
const popupsList = document.querySelectorAll(".popup");
const popupOpenPicture = document.querySelector(".popup_picture");
const containerOfPictures = document.querySelector(".elements__list");
const buttonEditPopup = document.querySelector(".profile__button-edit");
const userName = document.querySelector(".profile__name");
const userProfession = document.querySelector(".profile__position");
const popupUserForm = document.forms.formUserInfo;
const popupPlaceForm = document.forms.formPlace;
// const popupsForms = document.forms;
const fieldName = popupUserInfo.querySelector(".popup__field_name");
const fieldPosission = popupUserInfo.querySelector(".popup__field_profession");
const elementsList = document.querySelectorAll(".element");
const buttonAddPic = document.querySelector(".profile__button-add");
const buttonDeleteCard = document.querySelector(".element__button-delete");
const popupFigcaptionName = popupPicture.querySelector(".popup__figcaption");
const popupFigcaptionSrc = popupPicture.querySelector(".popup__figure-img");
const templateCard = document
  .querySelector("#element")
  .content.querySelector(".element");
const pictName = popupAddPic.querySelector(".popup__field_picName");
const pictLink = popupAddPic.querySelector(".popup__field_link");

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

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function deleteCard(elem) {
  elem.remove();
}

function handleOverlay(event) {
  if (event.target === event.currentTarget) {
    closePopup(event.currentTarget);
  }
}

function handleOverlayByEsc(event, popup) {
  if (event.key === "Escape") {
    closePopup(popup);
  }
}

function handleUserInfo(evt) {
  evt.preventDefault();
  userName.textContent = fieldName.value;
  userProfession.textContent = fieldPosission.value;
}

function createCard(link, name) {
  const newCard = templateCard.cloneNode(true);
  const newCardImg = newCard.querySelector(".element__img");
  const newCardName = newCard.querySelector(".element__name");
  newCardImg.src = link;
  newCardImg.alt = name;
  newCardName.textContent = name;

  // https://avatars.mds.yandex.net/i?id=0eaa142d7202ac9bbd26ac279e7ae159_l-4898876-images-thumbs&n=27&h=480&w=480

  newCard.addEventListener("click", (e) => {
    if (e.target.closest(".element__button-like")) addLike(e);
    if (e.target.closest(".element__button-delete")) deleteCard(newCard);
    if (e.target.closest(".element__img")) setPopupBigPicture(newCard);
  });
  return newCard;
}

function addLike(e) {
  const like = e.target.closest(".element__like-img");
  like.classList.toggle("element__like-img_active");
}

function setPopupBigPicture(element) {
  const cardName = element.querySelector(".element__name");
  const cardLink = element.querySelector(".element__img");
  popupFigcaptionSrc.src = cardLink.src;
  popupFigcaptionName.textContent = cardName.textContent;
  popupFigcaptionSrc.alt = cardName.textContent;
  openPopup(popupPicture);
}

initialCards.forEach((item) => {
  const card = createCard(item.link, item.name);
  containerOfPictures.append(card);
});

buttonAddPic.addEventListener("click", () => {
  openPopup(popupAddPic);
  toggleButton(popupPlaceForm);
});

popupAddPic.addEventListener("submit", (e) => {
  e.preventDefault();
  const newCard = createCard(pictLink.value, pictName.value);
  popupPlaceForm.reset();
  containerOfPictures.prepend(newCard);
  closePopup(popupAddPic);
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

popupsList.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlay);
  document.addEventListener("keydown", (evt) => {
    handleOverlayByEsc(evt, popup);
  });

  const buttonClosePopup = popup.querySelector(".popup__close");
  buttonClosePopup.addEventListener("click", () => {
    closePopup(popup);
  });
});

// vallidation //

function showValidation(input, errorMessage) {
  const spanElementSelector = `#error-${input.id}`;
  const span = document.querySelector(spanElementSelector);
  input.classList.add("popup__field_invalid");
  span.textContent = errorMessage;
  // validateURL(form);
}

function hideErrorMessage(input) {
  const spanElementSelector = `#error-${input.id}`;
  const span = document.querySelector(spanElementSelector);
  input.classList.remove("popup__field_invalid");
  span.textContent = "";
  // validateURL(form);
}

function checkValidation(form, input) {
  console.log(1, input);
  if (input.validity.valid) {
    hideErrorMessage(input);
    toggleButton(form);
  } else {
    showValidation(input, input.validationMessage);
    toggleButton(form);
  }
}

function setEventListeners(formElement) {
  const imputsList = Array.from(formElement.querySelectorAll(".popup__field"));
  imputsList.forEach((imputElement) =>
    imputElement.addEventListener("input", () => {
      checkValidation(formElement, imputElement);
    })
  );
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  });
}

enableValidation();

function toggleButton(form) {
  const buttonSubmit = form.querySelector(".popup__button-submit");

  if (form.checkValidity()) {
    buttonSubmit.removeAttribute("disabled");
    buttonSubmit.classList.remove("popup__button-submit_disable");
  } else {
    buttonSubmit.disabled = "true";
    buttonSubmit.classList.add("popup__button-submit_disable");
  }
}

//url

function validateURL(form) {
  // const url = form.querySelector(".popup__field_link");
  // const pattern =
  //   /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  // console.log(1, url.value);
  // pattern.test(url.value)
  //   ? url.classList.remove("popup__field_invalid")
  //   : console.log("Url is not valid!");
}
