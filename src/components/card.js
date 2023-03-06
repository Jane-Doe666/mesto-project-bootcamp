import { openPopup } from "./utils";
const templateCard = document
  .querySelector("#element")
  .content.querySelector(".element");

const popupPicture = document.querySelector(".popup_picture");
const popupFigcaptionName = popupPicture.querySelector(".popup__figcaption");
const popupFigcaptionSrc = popupPicture.querySelector(".popup__figure-img");

export default function createCard(link, name) {
  const newCard = templateCard.cloneNode(true);
  const like = newCard.querySelector(".element__button-like");
  const buttonDelete = newCard.querySelector(".element__button-delete");
  const imgElement = newCard.querySelector(".element__img");
  const newCardImg = newCard.querySelector(".element__img");
  const newCardName = newCard.querySelector(".element__name");
  newCardImg.src = link;
  newCardImg.alt = name;
  newCardName.textContent = name;

  like.addEventListener("click", toggleLike);
  buttonDelete.addEventListener("click", deleteCard);
  imgElement.addEventListener("click", () => {
    setPopupBigPicture(newCardName.textContent, newCardImg.src);
  });

  return newCard;
}

function toggleLike(e) {
  const like = e.target.closest(".element__like-img");
  like.classList.toggle("element__like-img_active");
}

function deleteCard(e) {
  const elementToRemove = e.target.closest(".element");
  elementToRemove.remove();
}

function setPopupBigPicture(name, src) {
  popupFigcaptionSrc.src = src;
  popupFigcaptionName.textContent = name;
  popupFigcaptionSrc.alt = name;
  openPopup(popupPicture);
}
