import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super({ popupSelector });
        this._imageElement = this._popupElement.querySelector(".modal__image");
        this._imageCaption = this._popupElement.querySelector(".modal__caption");

        super.setEventListeners();
    }

    open(imageData) {
        this._imageElement.src = imageData.link;
        this._imageElement.alt = imageData.name;
        this._imageCaption.textContent = imageData.name;
        super.open();
    }
}