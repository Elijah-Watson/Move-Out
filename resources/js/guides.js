import '../css/main.css';
import { StickyNavBar } from './components/sticky-nav-bar';

(function onLoad() {
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();
})();