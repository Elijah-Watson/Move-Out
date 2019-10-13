// Takes a collection of sections and footer bars and displays the correct footer bars when the corresponding sections are in view
export class SectionalFooterBar {
	// Takes an array of arrays
	// Each child array should have the footer bar first and the corresponding section second
	constructor(...args) {
		this.sections = [...args];
	}
	onScroll() {
		let windowHeight = window.innerHeight;
		let sections = this.sections;
		// Stores the position of "active" section
		let highestPosition = -Infinity;
		// Stores the footer bar of the "active" section
		let highestBar = null;
		// Stores all "non-active" footer bars
		let others = [];
		for (let i = 0; i < sections.length; i++) {
			let section = sections[i];
			// Gets height of current bar if it exists
			let barHeight = section[0] ? section[0].offsetHeight : highestBar.offsetHeight;
			// Calculates available space based on bar height
			let adjustedWindowHeight = windowHeight - barHeight;
			// Determine how far the current section is from the top
			let position = section[1].getBoundingClientRect().top - adjustedWindowHeight;
			// If section is further down on the page than the "active" section AND the top of it is off the screen, 
			// set the current section as "active"
			if (position >= highestPosition && position <= 0) {
				if (others[0]) others.push(others[0]);
				if (highestBar) others[0] = highestBar;
				highestPosition = position;
				highestBar = section[0];
			} else {
				others.push(section[0]);
			}
		}
		// Hide all footer bars of "non-active" sections
		others.forEach(other => {
			if (other) other.classList.add('footer-bar--hidden');
		});
		// Show the footer bar of the "active" section
		if (highestBar) highestBar.classList.remove('footer-bar--hidden');
	}
	init() {
		window.addEventListener('scroll', () => this.onScroll());
	}
}