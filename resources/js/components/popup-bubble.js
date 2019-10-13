// Places a popup bubble as near to its popup button as possible
// Requires a popup element that contains an element with text and a button
// Possible to set viewport or anchor padding, assumed unit is px
export class PopupBubble {
	constructor(popup, viewportPadding, anchorPadding) {
		this.popup = popup;
		this.viewportPadding = viewportPadding || { top: 0, right: 0, bottom: 0, left: 0 };
		this.anchorPadding = anchorPadding || { top: 0, right: 0, bottom: 0, left: 0 };
		this.popupButton = popup.querySelector('.popup-button');
		this.popupText = popup.querySelector('.popup-text');
	}
	setViewportPadding(viewportPadding) {
		this.viewportPadding = viewportPadding || { top: 0, right: 0, bottom: 0, left: 0 };
	}
	setAnchorPadding(anchorPadding) {
		this.anchorPadding = anchorPadding || { top: 0, right: 0, bottom: 0, left: 0 };
	}
	positioner(popupText, anchor, viewportPadding, anchorPadding) {
		// Clear any width modifications
		popupText.style.width = '';

		let popupWidth = popupText.offsetWidth;
		let popupHeight = popupText.offsetHeight;
		let anchorPosition = {
			top: anchor.offsetTop - anchorPadding.top,
			right: anchor.offsetLeft + anchor.offsetWidth + anchorPadding.right,
			bottom: anchor.offsetTop + anchor.offsetHeight + anchorPadding.bottom,
			left: anchor.offsetLeft - anchorPadding.left
		}

		// Standard -> Left
		popupText.style.left = anchorPosition.right + 'px';

		// If offscreen right, flip to left
		if (document.documentElement.clientWidth - popupText.getBoundingClientRect().right < viewportPadding.right) {
			popupText.style.left = -1 * popupWidth + anchorPosition.left + 'px';
		}

		// If offscreen left, push left as possible
		if (popupText.getBoundingClientRect().left < viewportPadding.left) {
			popupText.style.left = -1 * popupWidth - popupText.getBoundingClientRect().left + anchorPosition.left + viewportPadding.left + 'px';
			// If offscreen right, shorten width
			if (document.documentElement.clientWidth - popupText.getBoundingClientRect().right < viewportPadding.right) {
				popupWidth = popupWidth + (document.documentElement.clientWidth - popupText.getBoundingClientRect().right) - viewportPadding.right;
				popupText.style.width = popupWidth + 'px';
				popupHeight = popupText.offsetHeight;
			}
		}

		// Standard -> Top
		popupText.style.top = -1 * popupHeight + anchorPosition.top + 'px';

		// If offscreen top, flip to bottom
		if (popupText.getBoundingClientRect().top < viewportPadding.top) {
			popupText.style.top = anchorPosition.bottom + 'px';
		}
	}
	hide() {
		this.popupText.classList.add('hidden');
		this.popupButton.classList.remove('active');
	}
	show() {
		this.popupText.classList.remove('hidden');
		this.popupButton.classList.add('active');
	}
	init() {
		// Used to prevent duplicate event listeners
		let resizeEventHandler = () => {
			this.positioner(this.popupText, this.popupButton, this.viewportPadding, this.anchorPadding);
		}
		this.popupButton.addEventListener('click', e => {
			if (this.popupText.classList.contains('hidden')) {
				this.show();
				this.positioner(this.popupText, this.popupButton, this.viewportPadding, this.anchorPadding);
				window.addEventListener('resize', resizeEventHandler);
			} else {
				this.hide();
				window.removeEventListener('resize', resizeEventHandler);
			}
		});
	}
}