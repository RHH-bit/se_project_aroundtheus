const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

//  profile modal  //

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileModalCloseButton = document.querySelector(
"#modal-profile-close-button");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileSubtitleInput = document.querySelector("#profile-subtitle-input");
const profileEditForm = document.querySelector("#profile-edit-form");
const imagePreviewModal = document.querySelector("#modal-previewer");
const previewCloseButton = document.querySelector(
  "#modal-previewer-close-button"
);
const imagePreviewUrl = document.querySelector("#modal__image-perview");
const imagePreviewName = document.querySelector(".modal__perviewer-text");
const addCardModalCloseButton = document.querySelector(
  "#modal-add-card-close-button"
);
const addCardModal = document.querySelector("#add-card-modal");

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalEscape);
};

profileModalCloseButton.addEventListener("click", () => {
  closePopup(profileEditModal);
});

previewCloseButton.addEventListener("click", () => {
  closePopup(imagePreviewModal);
});

addCardModalCloseButton.addEventListener("click", () => {
  closePopup(addCardModal);
});

function openPopup(popup) {
  popup.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
};

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileSubtitleInput.value = profileSubtitle.textContent;
  openPopup(profileEditModal);
});

profileEditForm.addEventListener("submit", (event) => {
  event.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileSubtitle.textContent = profileSubtitleInput.value;
  closePopup(profileEditModal);
});

//  card template  //
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);

  cardListEl.append(cardElement);
});

//  new card modal  //
const addCardButton = document.querySelector(".profile__add-button");

const newCardTitleEl = document.querySelector("#new-card-title-input");
const newCardImageEl = document.querySelector("#new-card-link-input");
const addCardForm = document.querySelector("#add-card-form");
const cardsWrap = document.querySelector(".cards__list");

addCardButton.addEventListener("click", () => {
  openPopup(addCardModal);
});

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".cards__image");
  const cardTitleEl = cardElement.querySelector(".cards__text");
  const likeButton = cardElement.querySelector(".cards__like-button");
  const deleteButton = cardElement.querySelector(".cards__delete-button");

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("cards__like-Button_active");
  });

  cardImageEl.addEventListener("click", () => {
    imagePreviewUrl.src = data.link;
    imagePreviewUrl.alt = data.name;
    imagePreviewName.textContent = data.name;
    openPopup(imagePreviewModal);
  });

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  return cardElement;
};

function addNewCard(event) {
  event.preventDefault();
  const name = newCardTitleEl.value;
  const link = newCardImageEl.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  event.target.reset();
  cardsWrap.prepend(cardElement);
  closePopup(addCardModal);
};

addCardForm.addEventListener("submit", addNewCard);

function closeModalEscape(event) {
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal_opened");
    closePopup(modal);
  }
}

function closeModalOverlay(event) {
  if (event.target.classList.contains("modal_opened")) {
    closePopup(event.target);
  }
}

profileEditModal.addEventListener("click", closeModalOverlay);
addCardModal.addEventListener("click", closeModalOverlay);
imagePreviewModal.addEventListener("click", closeModalOverlay);