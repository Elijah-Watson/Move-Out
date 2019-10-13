import 'normalize.css';
import '../css/main.css';
import { StickyNavBar } from './components/sticky-nav-bar';
import SVGInjector from 'svg-injector';

// Injects SVGs so sprites work on older browsers
function injectSVGs() {
	var mySVGsToInject = document.querySelectorAll('img.iconic-sprite');
	SVGInjector(mySVGsToInject);
}

(function onLoad() {
	injectSVGs();
	
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();
})();