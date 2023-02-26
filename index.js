const popupPicture = document.querySelector('.popup_picture')
const popupUserInfo = document.querySelector('.popup_info');
const popupAddPic = document.querySelector('.popup_place');
const popupsList = document.querySelectorAll('.popup');
const popupOpenPicture = document.querySelector('.popup_picture')
const containerOfPictures = document.querySelector('.elements__list');
const buttonEditPopup = document.querySelector('.profile__button-edit');
const userName = document.querySelector('.profile__name');
const userProfession = document.querySelector('.profile__position');
const popupUserForm = popupUserInfo.querySelector('.popup__form');
const fieldName = popupUserInfo.querySelector('.popup__field_name');
const fieldPosission = popupUserInfo.querySelector('.popup__field_profession');
const modalWindow = popupUserInfo.querySelector('.popup__container');
const elementsList = document.querySelectorAll('.element');
const elementsImgList = document.querySelectorAll('.element__img');
const buttonAddPic = document.querySelector('.profile__button-add');
const buttonDeleteCard = document.querySelector('.element__button-delete');
const popupFigcaptionName = popupPicture.querySelector('.popup__figcaption');
const popupFigcaptionSrc = popupPicture.querySelector('.popup__figure-img');
const buttomClosePopup = popupPicture.querySelector('.popup__close');
const templateCard = document.querySelector('#element').content;

function openPopup (popup) {
  popup.classList.add('popup_opened')
};

function closePopup (popup) {
  popup.classList.remove('popup_opened')
};

function closeOverModalWindow(event) {
  if (event.target === event.currentTarget) {
   closePopup(event.currentTarget)
  }
 };

function handleUserInfo(evt) {
  evt.preventDefault()

  if (evt.submitter.closest('.popup__close')) {
    closePopup(popupUserInfo);
  }
  else {
    userName.textContent = fieldName.value;
    userProfession.textContent = fieldPosission.value;
    closePopup(popupUserInfo);
  }
};

function createCard (link, name) {
  const newCard = templateCard.querySelector('.element').cloneNode(true);
  newCard.querySelector('.element__img').src = link;
  newCard.querySelector('.element__name').textContent = name;
  newCard.querySelector('.element__img').alt = name;
  containerOfPictures.prepend(newCard)
  closePopup(popupAddPic);
}

function deleteCard (elem) {
  elem.remove()
}

function updateCardsListFromWeb (cardList) {
  const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

    cardList.forEach((item, idx) => {
      const itemName = item.querySelector('.element__name');
      const itemPict = item.querySelector('.element__img');

      itemName.textContent = initialCards[idx].name;
      itemPict.src = initialCards[idx].link;
      itemPict.alt = initialCards[idx].name;
    });
};

function addLike (e) {
  const like = e.target.closest('.element__like-img');
  like.classList.toggle('element__like-img_active');
};

function setPopupBigPicture(element) {
  const cardName = element.querySelector('.element__name');
  const cardLink = element.querySelector('.element__img');
  popupFigcaptionSrc.src = cardLink.src;
  popupFigcaptionName.textContent = cardName.textContent;
  popupFigcaptionSrc.alt = cardName.textContent;
  openPopup(popupPicture);
};

updateCardsListFromWeb(elementsList);

buttonAddPic.addEventListener('click', ()=>{
  openPopup(popupAddPic);
});

popupAddPic.addEventListener('submit', (e) => {
  e.preventDefault()
  const pictName = popupAddPic.querySelector('.popup__field_picName').value;
  const pictLink = popupAddPic.querySelector('.popup__field_link').value;

  createCard(pictLink, pictName)
});

buttonEditPopup.addEventListener('click', () => {
  openPopup(popupUserInfo)
  fieldName.value = userName.textContent;
  fieldPosission.value = userProfession.textContent;
});

popupUserForm.addEventListener('submit', handleUserInfo);

popupsList.forEach(item => {
  const buttonClosePopup = item.querySelector('.popup__close');
  buttonClosePopup.addEventListener('click', () => {
    closePopup(item);
  });
  item.addEventListener('mousedown', closeOverModalWindow);
});

containerOfPictures.addEventListener('click', (e) => {
  const element = e.target.closest('.element');
  if (e.target.closest('.element__button-like')) addLike(e);
  if (e.target.closest('.element__button-delete')) deleteCard(element);
  if (e.target.closest('.element__img')) setPopupBigPicture(element);
});

