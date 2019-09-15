import '../css/main.css';
import { StickyNavBar } from './components/sticky-nav-bar';
import 'svg-injector';

function injectSVGs() {
	var mySVGsToInject = document.querySelectorAll('img.iconic-sprite');
	SVGInjector(mySVGsToInject);
}

(function onLoad() {
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();
})();