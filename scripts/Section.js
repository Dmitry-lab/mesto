export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(item, position = 'append') {
    if (position === 'append')
      this._container.append(item);
    else
      this._container.prepend(item);
  }
}
