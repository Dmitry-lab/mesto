import Popup from "./Popup.js";
import {popupImage, popupImageCaption} from './constants.js';

export default class popupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(imageSrc, imageCaption) {
    super.open();
    this._element.querySelector(popupImage).src = imageSrc;
    this._element.querySelector(popupImageCaption).textContent = imageCaption;
  }
}
