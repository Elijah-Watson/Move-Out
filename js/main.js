function StickyNavBar() {
	this.sticky = document.querySelector('.site-nav').offsetTop;

	this.onScroll = function() {
		var navBar = document.querySelector('.site-nav');
		if (window.pageYOffset >= this.sticky) {
			navBar.classList.add('sticky');
		} else {
			navBar.classList.remove('sticky');
		}
	}

	this.init = function() {
		window.addEventListener('scroll', this.onScroll.bind(this));
	}
};

(function onLoad() {
	var navBar = new StickyNavBar();
	navBar.init();
})();

