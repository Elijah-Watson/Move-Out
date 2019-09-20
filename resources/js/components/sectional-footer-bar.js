export class SectionalFooterBar {
	constructor(...args) {
		this.sections = [...args];
	}

	onScroll() {
		let windowHeight = window.innerHeight;
		let sections = this.sections;
		let highestPosition = -Infinity;
		let highestBar = null;
		let others = [];
		for (let i = 0; i < sections.length; i++) {
			let section = sections[i];
			let barHeight = section[0] ? section[0].offsetHeight : highestBar.offsetHeight;
			let adjustedWindowHeight = windowHeight - barHeight;
			let position = section[1].getBoundingClientRect().top - adjustedWindowHeight;
			if (position >= highestPosition && position <= 0) {
				if (others[0]) others.push(others[0]);
				if (highestBar) others[0] = highestBar;
				highestPosition = position;
				highestBar = section[0];
			} else {
				others.push(section[0]);
			}
		}
		others.forEach(other => {
			if (other) other.classList.add('footer-bar--hidden');
		});
		if (highestBar) highestBar.classList.remove('footer-bar--hidden');
	}

	init() {
		window.addEventListener('scroll', () => this.onScroll());
	}
}