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
		let data = '?country=USA&postalCode=' + encodeURIComponent(postalCode);
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					this.data.current.salesTaxPercent = response.totalRate;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('GET', 'https://rest.avatax.com/api/v2/taxrates/bypostalcode' + data);
		httpRequest.setRequestHeader('Authorization', 'Basic MjAwMDExNDEwMjo0N0MxQ0UwRTNGRUFCMkE2');
		httpRequest.send();
	}
	updateFutureSalesTax() {
		let postalCode = this.data.future.zipCode;
		let data = '?country=USA&postalCode=' + encodeURIComponent(postalCode);
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					this.data.future.salesTaxPercent = response.totalRate;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('GET', 'https://rest.avatax.com/api/v2/taxrates/bypostalcode' + data);
		httpRequest.setRequestHeader('Authorization', 'Basic MjAwMDExNDEwMjo0N0MxQ0UwRTNGRUFCMkE2');
		httpRequest.send();
	}
	updateCurrentIncomeTax() {
		let payRate = this.data.current.job.yearlyPay;
		let filingStatus = this.data.maritalStatus;
		let state = this.data.current.state;
		let data = 'pay_rate=' + encodeURIComponent(payRate) + '&filing_status=' + encodeURIComponent(filingStatus) + '&state=' + encodeURIComponent(state);
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					let incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					this.data.current.incomeTaxValue = incomeTaxValue;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('POST', 'https://taxee.io/api/v2/calculate/2019');
		httpRequest.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVjNjE4YjkxNjcxZGY0NzhhMjU3MTk4MSIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU0OTg5NjU5M30.EJV8dbX-nohirPMxSK4aOaLDNj5cVsDWlLYucMgvu7Y');
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		httpRequest.send(data);
	}
	updateFutureIncomeTax() {
		let payRate = this.data.future.job.yearlyPay;
		let filingStatus = this.data.maritalStatus;
		let state = this.data.future.state;
		let data = 'pay_rate=' + encodeURIComponent(payRate) + '&filing_status=' + encodeURIComponent(filingStatus) + '&state=' + encodeURIComponent(state);
		let httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					let response = JSON.parse(httpRequest.responseText);
					let incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					this.data.future.incomeTaxValue = incomeTaxValue;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('POST', 'https://taxee.io/api/v2/calculate/2019');
		httpRequest.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVjNjE4YjkxNjcxZGY0NzhhMjU3MTk4MSIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU0OTg5NjU5M30.EJV8dbX-nohirPMxSK4aOaLDNj5cVsDWlLYucMgvu7Y');
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		httpRequest.send(data);
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
		let adjustedWindowHeight = windowHeight - this.sections[0][0].offsetHeight;
		let previousSection = null;
		for (let i = 0; i < this.sections.length; i++) {
			let previousSectionPosition = previousSection ? previousSection[1].getBoundingClientRect().top : 0;
			let currentSection = this.sections[i];
			let currentSectionPosition = currentSection[1] ? currentSection[1].getBoundingClientRect().top : adjustedWindowHeight;
			if (currentSection[0]) currentSection[0].classList.add('footer-bar--hidden');
			if (previousSectionPosition - adjustedWindowHeight < 0 && currentSectionPosition - adjustedWindowHeight >= 0) {
				if (previousSection[0]) previousSection[0].classList.remove('footer-bar--hidden');
			}
			previousSection = currentSection;
		}
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
		valueInput.type = 'text';
		valueInput.placeholder = '$00,000.00';
		valueInput.classList.add('dynamic-table-row-value');
		removeButton.classList.add('dynamic-table-remove', 'circle-button');
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
			tableRow.remove();
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

		// This triggers the previously set up event listener once in case select value is preserved
		// There may be a better way to do this...
		let e = new Event('change', { 'bubbles': true });
		this.jobInputSection.querySelector('select').dispatchEvent(e);
	}
}

function calculateAll() {

}

(function onLoad() {
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