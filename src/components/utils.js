export function addElementsListener(eventType, listenerFunction, ...elements) {
  elements.forEach(item => item.addEventListener(eventType, listenerFunction))
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    showClosePopupForm(document.querySelector('.popup_opened'));
  }
}

export function showClosePopupForm(element) {
  if (element.classList.contains('popup_opened')) {
    element.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
  }
  else {
    element.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
  }
}

