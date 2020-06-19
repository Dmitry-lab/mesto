import Popup from "./Popup.js";

export default class popupWithImage extends Popup {
  constructor(popupSelector, popupOpenedModificator, popupCloseButtonSelector, popupImage, popupImageCaption) {
    super(popupSelector, popupOpenedModificator, popupCloseButtonSelector);
    this._image = this._element.querySelector(popupImage);
    this._caption = this._element.querySelector(popupImageCaption);
  }

  open(imageSrc, imageCaption) {
    this._image.src = imageSrc;
    this._caption.textContent = imageCaption;
    super.open();
  }
}
