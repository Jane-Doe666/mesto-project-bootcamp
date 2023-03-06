import { openPopup } from "./utils";
const templateCard = document
  .querySelector("#element")
  .content.querySelector(".element");

const popupPicture = document.querySelector(".popup_picture");
const popupFigcaptionName = popupPicture.querySelector(".popup__figcaption");
const popupFigcaptionSrc = popupPicture.querySelector(".popup__figure-img");

export default function createCard(link, name) {
  const newCard = templateCard.cloneNode(true);
  const newCardImg = newCard.querySelector(".element__img");
  const newCardName = newCard.querySelector(".element__name");
  newCardImg.src = link;
  newCardImg.alt = name;
  newCardName.textContent = name;

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

function deleteCard(elem) {
  elem.remove();
}

function setPopupBigPicture(element) {
  const cardName = element.querySelector(".element__name");
  const cardLink = element.querySelector(".element__img");
  popupFigcaptionSrc.src = cardLink.src;
  popupFigcaptionName.textContent = cardName.textContent;
  popupFigcaptionSrc.alt = cardName.textContent;
  openPopup(popupPicture);
}
