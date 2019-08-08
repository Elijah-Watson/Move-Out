class StickyNavBar {
	constructor(element) {
		this.element = element;
		this.sticky = this.element.offsetTop;
	}

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

(function onLoad() {
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();
})();

