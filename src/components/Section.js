export default class Section {
    constructor({ items, renderer }) {
        this._renderedItmes = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItmes.forEach((item) => {
            this._renderer(item)
        });
    }

    addItem(element) {
        this._container.perpend(element);
    }
}