function FooterBarAnimations() {
	this.animate = function () {
		var currentFooterBar = document.getElementById('current-footer-bar');
		var futureFooterBar = document.getElementById('future-footer-bar');
		var currentInputContainer = document.getElementById('current-input-container');
		var futureInputContainer = document.getElementById('future-input-container');
		var outputContainer = document.querySelector('.output-container');
		var windowHeight = window.innerHeight;
		var adjustedWindowHeight = windowHeight - currentFooterBar.offsetHeight;

		var outputContainerPositionFromTop = outputContainer.getBoundingClientRect().top;
		var futureInputContainerPositionFromTop = futureInputContainer.getBoundingClientRect().top;

		if (futureInputContainerPositionFromTop - adjustedWindowHeight >= 0) {
			currentFooterBar.classList.remove('footer-bar--hidden');
			futureFooterBar.classList.add('footer-bar--hidden');
		} else if (futureInputContainerPositionFromTop - adjustedWindowHeight <= 0 && outputContainerPositionFromTop - adjustedWindowHeight >= 0) {
			currentFooterBar.classList.add('footer-bar--hidden');
			futureFooterBar.classList.remove('footer-bar--hidden');
		} else if (outputContainerPositionFromTop - adjustedWindowHeight <= 0) {
			futureFooterBar.classList.add('footer-bar--hidden');
			currentFooterBar.classList.add('footer-bar--hidden');
		}
	}

	this.init = function() {
		window.addEventListener('scroll', this.animate);
	}
}

(function onLoad() {
	var footerBar = new FooterBarAnimations();
	footerBar.init();
})();