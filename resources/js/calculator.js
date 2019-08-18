import '../css/main.css';
import { StickyNavBar } from './components/sticky-nav-bar';

class User {
	constructor() {
		this.data = {
			maritalStatus: null,
			finances: [],
			oneTimeExpenses: [],
			current: {
				state: null,
				zipCode: null,
				salesTaxPercent: null,
				job: {
					weeklyPay: null,
					monthlyPay: null,
					yearlyPay: null
				},
				incomeTaxValue: null,
				monthlyExpenses: []
			},
			future: {
				state: null,
				zipCode: null,
				salesTaxPercent: null,
				job: {
					weeklyPay: null,
					monthlyPay: null,
					yearlyPay: null
				},
				incomeTaxValue: null,
				monthlyExpenses: []
			}
		}
	}

	updateCurrentSalesTax() {
		let postalCode = this.data.current.zipCode;
		let data = {
			"country": "USA",
			"postalCode": postalCode
		};
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					this.data.current.salesTaxPercent = response.totalRate;
				} else {
					console.log(JSON.parse(httpRequest.responseText));
				}
			}
		};
		httpRequest.open('POST', '/.netlify/functions/sales-tax');
		httpRequest.setRequestHeader('Content-type', 'application/json');
		httpRequest.send(JSON.stringify(data));
	}
	updateFutureSalesTax() {
		let postalCode = this.data.future.zipCode;
		let data = {
			"country": "USA",
			"postalCode": postalCode
		};
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					this.data.future.salesTaxPercent = response.totalRate;
				} else {
					console.log(JSON.parse(httpRequest.responseText));
				}
			}
		};
		httpRequest.open('POST', '/.netlify/functions/sales-tax');
		httpRequest.setRequestHeader('Content-type', 'application/json');
		httpRequest.send(JSON.stringify(data));
	}
	updateCurrentIncomeTax() {
		let payRate = this.data.current.job.yearlyPay;
		let filingStatus = this.data.maritalStatus;
		let state = this.data.current.state;
		let data = {
			"pay_rate": payRate,
			"filing_status": filingStatus,
			"state": state
		};
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					let incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					this.data.current.incomeTaxValue = incomeTaxValue;
				} else {
					console.log(JSON.parse(httpRequest.responseText));
				}
			}
		};
		httpRequest.open('POST', '/.netlify/functions/income-tax');
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		httpRequest.send(JSON.stringify(data));
	}
	updateFutureIncomeTax() {
		let payRate = this.data.future.job.yearlyPay;
		let filingStatus = this.data.maritalStatus;
		let state = this.data.future.state;
		let data = {
			"pay_rate": payRate,
			"filing_status": filingStatus,
			"state": state
		};
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					let incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					this.data.future.incomeTaxValue = incomeTaxValue;
				} else {
					console.log(JSON.parse(httpRequest.responseText));
				}
			}
		};
		httpRequest.open('POST', '/.netlify/functions/income-tax');
		httpRequest.setRequestHeader('Content-Type', 'application/json');
		httpRequest.send(JSON.stringify(data));
	}
	init() {
		let personalInfoSection = document.querySelector('#personal-info');
		personalInfoSection.addEventListener('change', (e) => {
			if (e.target && (e.target.nodeName === 'SELECT' || e.target.nodeName === 'INPUT')) {
				console.log('Personal Info');
			}
		});

		let otherInputSections = document.querySelectorAll('.input-section:not(#personal-info)');
		otherInputSections.forEach((element) => {
			element.addEventListener('change', (e) => {
				if (e.target && (e.target.nodeName === 'SELECT' || e.target.nodeName === 'INPUT')) {
					console.log('Other Info - Input');
				}
			});
			element.addEventListener('click', (e) => {
				if (e.target && (e.target.classList.contains('dynamic-table-add') || e.target.classList.contains('dynamic-table-remove'))) {
					console.log('Other Info - Button');
				}
			});
		});
	}
}

class FooterBarAnimations {
	constructor(...args) {
		this.sections = [...args];
	}

	animate() {
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
		window.addEventListener('scroll', () => this.animate());
	}
}

class DynamicTableActions {
	constructor(dynamicTable) {
		this.dynamicTable = dynamicTable;
	}

	addDynamicTableRow(e) {
		let tableBody = this.dynamicTable.querySelector('.dynamic-table-body');
		let tableRow = document.createElement('div');
		let labelInput = document.createElement('input');
		let valueInput = document.createElement('input');
		let removeButton = document.createElement('div');
		tableRow.classList.add('dynamic-table-row');
		labelInput.type = 'text';
		labelInput.placeholder = 'Name';
		labelInput.classList.add('dynamic-table-row-label');
		labelInput.classList.add('label-input');
		valueInput.type = 'text';
		valueInput.placeholder = '$00,000.00';
		valueInput.classList.add('dynamic-table-row-value');
		valueInput.classList.add('currency-input');
		removeButton.classList.add('dynamic-table-remove');
		removeButton.classList.add('circle-button');
		tableRow.appendChild(labelInput);
		tableRow.appendChild(valueInput);
		tableRow.appendChild(removeButton);
		tableBody.appendChild(tableRow);
	}

	removeDynamicTableRow(e) {
		let removeButton = e.target;
		let tableRow = removeButton.parentNode;
		let tableBody = this.dynamicTable.querySelector('.dynamic-table-body');
		let tableRows = tableBody.querySelectorAll('.dynamic-table-row');
		if (tableRows.length < 2) {
			let tableRowInputs = tableRow.querySelectorAll('input');
			for (let i = 0; i < tableRowInputs.length; i++) {
				tableRowInputs[i].value = '';
			}
		} else {
			// May need to clear values first to trigger event listener
			tableRow.parentNode.removeChild(tableRow);
		}
	}

	init() {
		this.dynamicTable.addEventListener('click', (e) => {
			if (e.target && e.target.classList.contains('dynamic-table-remove')) {
				this.removeDynamicTableRow(e);
			} else if (e.target && e.target.classList.contains('dynamic-table-add')) {
				this.addDynamicTableRow(e);
			}
		});
	}
}

class JobInputSectionActions {
	constructor(jobInputSection) {
		this.jobInputSection = jobInputSection;
	}

	determineMode(e) {
		let hoursQuestion = this.jobInputSection.querySelector('.job-input-section-question-hours');
		let wageQuestion = this.jobInputSection.querySelector('.job-input-section-question-wage');
		let wageQuestionText = wageQuestion.querySelector('.input-question-text');
		let mode = e.target.value;
		switch (mode) {
			case 'hourly':
				hoursQuestion.classList.remove('disabled');
				wageQuestionText.innerText = 'How much do you plan to make every hour?';
				break;
			case 'weekly':
				hoursQuestion.classList.add('disabled');
				wageQuestionText.innerText = 'How much do you plan to make every week?';
				break;
			case 'monthly':
				hoursQuestion.classList.add('disabled');
				wageQuestionText.innerText = 'How much do you plan to make every month?';
				break;
			case 'yearly':
				hoursQuestion.classList.add('disabled');
				wageQuestionText.innerText = 'How much do you plan to make every year?';
				break;
			default:
				// set proper error message
				console.log('error');
				break;
		}
	}

	init() {
		this.jobInputSection.addEventListener('change', (e) => {
			if (e.target && e.target.nodeName === 'SELECT') {
				this.determineMode(e);
			}
		});

		// Find a way to deal with saved input data and page reloads
	}
}

function calculateAll() {

}

(function onLoad() {
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();

	let currentFooterBar = document.getElementById('current-footer-bar');
	let currentInputContainer = document.getElementById('current-input-container');
	let futureFooterBar = document.getElementById('future-footer-bar');
	let futureInputContainer = document.getElementById('future-input-container');
	let outputContainer = document.querySelector('.output-container');
	let footerBar = new FooterBarAnimations([currentFooterBar, currentInputContainer], [futureFooterBar, futureInputContainer], [null, outputContainer]);
	footerBar.init();

	let dynamicTables = [];
	let dynamicTableElements = document.querySelectorAll('.dynamic-table');
	dynamicTableElements.forEach((dynamicTableElement) => {
		let temp = new DynamicTableActions(dynamicTableElement);
		temp.init();
		dynamicTables.push(temp);
	});

	let jobInputSections = [];
	let jobInputSectionElements = document.querySelectorAll('.job-input-section');
	jobInputSectionElements.forEach((jobInputSectionElement) => {
		let temp = new JobInputSectionActions(jobInputSectionElement);
		temp.init();
		jobInputSections.push(temp);
	});

	let user = new User();
	user.init();
})();