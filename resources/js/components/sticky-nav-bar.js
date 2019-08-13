export class StickyNavBar {
	constructor(element) {
		this.element = element;
		this.sticky = this.element.offsetTop;
	}

	onScroll() {
		if (window.pageYOffset >= this.sticky) {
			this.element.parentNode.classList.add('sticky');
		} else {
			this.element.parentNode.classList.remove('sticky');
		}
	}

	init() {
		window.addEventListener('scroll', () => this.onScroll());
	}
}
