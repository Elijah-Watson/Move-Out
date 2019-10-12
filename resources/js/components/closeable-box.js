export class CloseableBox {
	constructor(box, closeButton) {
		this.box = box;
		this.closeButton = closeButton;
	}
	closeBox() {
		this.box.style.display = 'none';
	}
	init() {
		this.closeButton.addEventListener('click', () => this.closeBox());
	}
}