import 'normalize.css';
import '../css/main.css';
import { StickyNavBar } from './components/sticky-nav-bar';
import { ImageCover } from './components/image-cover';

(function onLoad() {
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();

	let imageCoverElements = [...document.querySelectorAll('.image-cover')];
	let imageCoverObjects = imageCoverElements.map(imageCoverElement => new ImageCover(imageCoverElement));
	imageCoverObjects.forEach(imageCoverObject => imageCoverObject.init());
})();