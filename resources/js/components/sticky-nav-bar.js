// Makes a nav bar stick to the top of the screen when scrolling
export class StickyNavBar {
	constructor(element) {
		this.element = element;
		this.sticky = this.element.offsetTop;
	}

	// Checks to see how far the nav bar is from the top of the page
	// Once it is at the top of the page, position it there absolutely
	onScroll() {
		if (window.pageYOffset >= this.sticky) {
			this.element.classList.add('sticky');
		} else {
			this.element.classList.remove('sticky');
		}
	}

	init() {
		window.addEventListener('scroll', () => this.onScroll());
	}
}
