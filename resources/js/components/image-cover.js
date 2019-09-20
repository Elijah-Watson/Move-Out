export class ImageCover {
	constructor(image) {
		this.image = image;
		this.conatiner = image.parentNode;
	}
	formatImage() {
		this.image.style.width = 'auto';
		this.image.style.height = '100%';
		
		if (this.image.clientWidth <= this.conatiner.clientWidth) {
			this.image.style.width = '100%';
			this.image.style.height = 'auto';
		}
	}
	init() {
		var containerStyles = window.getComputedStyle(this.conatiner);
		let containerPostion = containerStyles.getPropertyValue('position');
		if (!containerPostion || containerPostion === 'static') this.conatiner.style.position = 'relative';

		this.image.style.position = 'absolute';
		this.image.style.top = '50%';
		this.image.style.left = '50%';
		this.image.style.transform = 'translate(-50%, -50%)';

		window.addEventListener('resize', e => {
			this.formatImage();
		});

		if (this.image.complete) {
			this.formatImage();
		} else {
			this.image.addEventListener('load', e => {
				this.formatImage();
			});
		}
	}
}