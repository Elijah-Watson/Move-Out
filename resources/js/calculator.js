import '../css/main.css';
import { StickyNavBar } from './components/sticky-nav-bar';
import { SectionalFooterBar } from './components/sectional-footer-bar';

const inputValues = {
	maritalStatus: null,
	finances: [],
	oneTimeExpenses: [],
	current: {
		location: {
			state: null,
			zipCode: null
		},
		job: {
			monthlySalary: null
		},
		monthlyExpenses: []
	},
	future: {
		location: {
			state: null,
			zipCode: null
		},
		job: {
			monthlySalary: null
		},
		monthlyExpenses: []
	}
}

const taxes = {
	current: {
		salesTaxPercent: null,
		incomeTaxAmount: null
	},
	future: {
		salesTaxPercent: null,
		incomeTaxAmount: null
	}
}

async function calculateAll() {
	console.log(inputValues);
	console.log(taxes);
}

function validateCurrencyInput(input) {
	let value = input.value;
	let result;
	if (!value) {
		result = 0;
		input.classList.remove('invalid');
	} else {
		let regex = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:.\d{1,2})?$/;
		let matches = value.match(regex);
		if (matches) {
			let match = matches[0];
			result = parseFloat(match.replace(/[^0-9\.]/g, ''));
			input.classList.remove('invalid');
		} else {
			result = 0;
			input.classList.add('invalid');
		}
	}
	return result;
}

function validateHoursInput(input) {
	let value = input.value;
	let result;
	if (!value) {
		result = 0;
		input.classList.remove('invalid');
	} else {
		let regex = /^(?:1 ?(?:h|H|hour|Hour)?|\d+(?:.\d+)? ?(?:h|H|hours|Hours)?)$/;
		let matches = value.match(regex);
		if (matches) {
			let match = matches[0];
			result = parseFloat(match.replace(/[^0-9\.]/g, ''));
			input.classList.remove('invalid');
		} else {
			result = 0;
			input.classList.add('invalid');
		}
	}
	return result;
}

function validateZipCode(input) {
	let value = input.value;
	let result;
	if (!value) {
		result = 0;
		input.classList.remove('invalid');
	} else {
		let regex = /^\d{5}$/;
		let matches = value.match(regex);
		if (matches) {
			let match = matches[0];
			result = match;
			input.classList.remove('invalid');
		} else {
			result = 0;
			input.classList.add('invalid');
		}
	}
	return result;
}

async function getSalesTax(postalCode) {
	const response = await fetch('/.netlify/functions/sales-tax', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"country": "USA",
			"postalCode": postalCode
		}),
	});
	const json = await response.json();
	return json.totalRate;
}

async function getIncomeTax(payRate, filingStatus, state) {
	const response = await fetch('/.netlify/functions/income-tax', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			"pay_rate": payRate,
			"filing_status": filingStatus,
			"state": state
		}),
	});
	const json = await response.json();
	let incomeTaxValue = json.annual.federal.amount + json.annual.fica.amount;
	if (state !== 'TN' && state !== 'NH') {
		incomeTaxValue += json.annual.state.amount;
	}
	;
	return incomeTaxValue;
}

function dynamicTableClickHandler(e) {
	if (e.target.classList.contains('dynamic-table-add')) {
		addDynamicTableRow(e);
		return false;
	}
	if (e.target.classList.contains('dynamic-table-remove')) {
		removeDynamicTableRow(e);
		return true;
	}
}

function addDynamicTableRow(e) {
	let table = e.currentTarget;
	let tableBody = table.querySelector('.dynamic-table-body');
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

function removeDynamicTableRow(e) {
	let removeButton = e.target;
	let tableRow = removeButton.parentNode;
	let table = e.currentTarget;
	let tableBody = table.querySelector('.dynamic-table-body');
	let tableRows = tableBody.querySelectorAll('.dynamic-table-row');
	if (tableRows.length < 2) {
		let tableRowInputs = tableRow.querySelectorAll('input');
		for (let i = 0; i < tableRowInputs.length; i++) {
			tableRowInputs[i].value = '';
			tableRowInputs[i].dispatchEvent(new Event('change'));
		}
	} else {
		tableRow.parentNode.removeChild(tableRow);
	}
}

function getDynamicTableValues(section) {
	let dTRows = [...section.getElementsByClassName('dynamic-table-row')];
	let dTValueInputs = dTRows.map(dTRow => dTRow.querySelector('.dynamic-table-row-value'));
	let validatedDTValueInputs = dTValueInputs.map(validateCurrencyInput);
	return validatedDTValueInputs;
}

function setDynamicTableEventListeners(section, setter) {
	section.querySelector('.dynamic-table').addEventListener('click', e => {
		if (dynamicTableClickHandler(e)) {
			setter(getDynamicTableValues(section));
			calculateAll();
		}
	});
	section.querySelector('.dynamic-table').addEventListener('change', e => {
		setter(getDynamicTableValues(section));
		calculateAll();
	});
}

function setJobSectionMode(mode, section) {
	let hoursQuestion = section.querySelector('.job-input-section-question-hours');
	let wageQuestion = section.querySelector('.job-input-section-question-wage');
	let wageQuestionModeText = wageQuestion.querySelector('.job-input-section-mode');
	switch (mode) {
		case 'hourly':
			hoursQuestion.classList.remove('disabled');
			wageQuestionModeText.innerText = 'hour';
			break;
		case 'weekly':
			hoursQuestion.classList.add('disabled');
			wageQuestionModeText.innerText = 'week';
			break;
		case 'monthly':
			hoursQuestion.classList.add('disabled');
			wageQuestionModeText.innerText = 'month';
			break;
		case 'yearly':
			hoursQuestion.classList.add('disabled');
			wageQuestionModeText.innerText = 'year';
			break;
		default:
			// set proper error message
			console.log('error');
			break;
	}
}

function calculateMonthlySalary(mode, wageInput, hoursInput) {
	const weeksPerMonth = 4.348214;
	let validatedWage = validateCurrencyInput(wageInput);
	let validatedHours = validateHoursInput(hoursInput);
	let result;
	switch (mode) {
		case 'hourly':
			result = validatedWage * validatedHours * weeksPerMonth;
			break;
		case 'weekly':
			result = validatedWage * weeksPerMonth;
			break;
		case 'monthly':
			result = validatedWage;
			break;
		case 'yearly':
			result = validatedWage / 12;
			break;
		default:
			result = 0;
			console.log('error');
			break;
	}
	return result;
}

function setJobSectionEventListeners(section, setter) {
	section.addEventListener('change', e => {
		let mode = section.querySelector('.income-type-select').value;
		if (e.target && e.target.classList.contains('income-type-select')) {
			setJobSectionMode(mode, section);
		}
		let wageInput = section.querySelector('.job-input-section-question-wage input');
		let hoursInput = section.querySelector('.job-input-section-question-hours input');
		let monthlySalary = calculateMonthlySalary(mode, wageInput, hoursInput);
		setter(monthlySalary);
		calculateAll();
	});
}

function setPersonalInfoSectionEventListeners(section, maritalStatusSetter, currentStateSetter, currentZipCodeSetter, futureStateSetter, futureZipCodeSetter) {
	let maritalStatusSelect = section.querySelector('.marital-status-select');
	maritalStatusSelect.addEventListener('change', e => {
		maritalStatusSetter(e.target.value);
		calculateAll();
	});

	let currentSection = section.querySelector('#current-location');
	let currentStateSelect = currentSection.querySelector('.state-select');
	currentStateSelect.addEventListener('change', e => {
		currentStateSetter(e.target.value);
		calculateAll();
	});
	let currentZipCodeInput = currentSection.querySelector('.zip-code-input');
	currentZipCodeInput.addEventListener('change', e => {
		let validatedValue = validateZipCode(e.target);
		currentZipCodeSetter(validatedValue);
		calculateAll();
	});

	let futureSection = section.querySelector('#future-location');
	let futureStateSelect = futureSection.querySelector('.state-select');
	futureStateSelect.addEventListener('change', e => {
		futureStateSetter(e.target.value);
		calculateAll();
	});
	let futureZipCodeInput = futureSection.querySelector('.zip-code-input');
	futureZipCodeInput.addEventListener('change', e => {
		let validatedValue = validateZipCode(e.target);
		futureZipCodeSetter(validatedValue);
		calculateAll();
	});
}

async function setSalesTaxes() {
	let currentSalesTax = getSalesTax(inputValues.current.location.zipCode)
		.then(data => data)
		.catch(error => console.error(error));

	let futureSalesTax = getSalesTax(inputValues.future.location.zipCode)
		.then(data => data)
		.catch(error => console.error(error));	

	taxes.current.salesTaxPercent = await currentSalesTax;
	taxes.future.salesTaxPercent = await futureSalesTax;
}

async function setIncomeTaxes() {
	let currentIncomeTax = getIncomeTax(inputValues.current.job.monthlySalary*12, inputValues.maritalStatus, inputValues.current.location.state)
		.then(data => data/12)
		.catch(error => console.error(error));
	
	let futureIncomeTax = getIncomeTax(inputValues.future.job.monthlySalary*12, inputValues.maritalStatus, inputValues.future.location.state)
		.then(data => data/12)
		.catch(error => console.error(error));

	taxes.current.incomeTaxAmount = await currentIncomeTax;
	taxes.future.incomeTaxAmount = await futureIncomeTax;
}

function initializeCalculator() {
	let cJobSection = document.getElementById('current-job');
	let cMode = cJobSection.querySelector('.income-type-select').value;
	setJobSectionMode(cMode, cJobSection);

	let fJobSection = document.getElementById('future-job');
	let fMode = fJobSection.querySelector('.income-type-select').value;
	setJobSectionMode(fMode, fJobSection);
}

function initializeGlobals() {
	let personalInfoSection = document.getElementById('personal-info');
	inputValues.maritalStatus = personalInfoSection.querySelector('.marital-status-select').value;
	let currentSection = personalInfoSection.querySelector('#current-location');
	inputValues.current.location.state = currentSection.querySelector('.state-select').value;
	inputValues.current.location.zipCode = validateZipCode(currentSection.querySelector('.zip-code-input'));
	let futureSection = personalInfoSection.querySelector('#future-location');
	inputValues.future.location.state = futureSection.querySelector('.state-select').value;
	inputValues.future.location.zipCode = validateZipCode(futureSection.querySelector('.zip-code-input'));

	let financeSection = document.getElementById('finances');
	inputValues.finances = getDynamicTableValues(financeSection);

	let cJobSection = document.getElementById('current-job');
	let cMode = cJobSection.querySelector('.income-type-select').value;
	let cWageInput = cJobSection.querySelector('.job-input-section-question-wage input');
	let cHoursInput = cJobSection.querySelector('.job-input-section-question-hours input');
	inputValues.current.job.monthlySalary = calculateMonthlySalary(cMode, cWageInput, cHoursInput);
	
	let cMonthlyExpensesSection = document.getElementById('current-monthly-expenses');
	inputValues.current.monthlyExpenses = getDynamicTableValues(cMonthlyExpensesSection);

	let oneTimeExpensesSection = document.getElementById('one-time-expenses');
	inputValues.oneTimeExpenses = getDynamicTableValues(oneTimeExpensesSection);

	let fJobSection = document.getElementById('future-job');
	let fMode = fJobSection.querySelector('.income-type-select').value;
	let fWageInput = fJobSection.querySelector('.job-input-section-question-wage input');
	let fHoursInput = fJobSection.querySelector('.job-input-section-question-hours input');
	inputValues.future.job.monthlySalary = calculateMonthlySalary(fMode, fWageInput, fHoursInput);

	let fMonthlyExpensesSection = document.getElementById('future-monthly-expenses');
	inputValues.future.monthlyExpenses = getDynamicTableValues(fMonthlyExpensesSection);
	
	setSalesTaxes();
	setIncomeTaxes();
}

(function onLoad() {
	let navBar = new StickyNavBar(document.querySelector('.site-nav'));
	navBar.init();

	let currentFooterBar = document.getElementById('current-footer-bar');
	let currentInputContainer = document.getElementById('current-input-container');
	let futureFooterBar = document.getElementById('future-footer-bar');
	let futureInputContainer = document.getElementById('future-input-container');
	let outputContainer = document.querySelector('.output-container');
	let footerBar = new SectionalFooterBar([currentFooterBar, currentInputContainer], [futureFooterBar, futureInputContainer], [null, outputContainer]);
	footerBar.init();

	initializeCalculator();
	initializeGlobals();
	calculateAll();

	let personalInfoSection = document.getElementById('personal-info');
	setPersonalInfoSectionEventListeners(personalInfoSection, 
		value => inputValues.maritalStatus = value,
		value => inputValues.current.location.state = value,
		value => inputValues.current.location.zipCode = value,
		value => inputValues.future.location.state = value,
		value => inputValues.future.location.zipCode = value
		);

	let financeSection = document.getElementById('finances');
	setDynamicTableEventListeners(financeSection, value => inputValues.finances = value);

	let cJobSection = document.getElementById('current-job');
	setJobSectionEventListeners(cJobSection, value => inputValues.current.job.monthlySalary = value);

	let cMonthlyExpensesSection = document.getElementById('current-monthly-expenses');
	setDynamicTableEventListeners(cMonthlyExpensesSection, value => inputValues.current.monthlyExpenses = value);

	let oneTimeExpensesSection = document.getElementById('one-time-expenses');
	setDynamicTableEventListeners(oneTimeExpensesSection, value => inputValues.oneTimeExpenses = value);

	let fJobSection = document.getElementById('future-job');
	setJobSectionEventListeners(fJobSection, value => inputValues.future.job.monthlySalary = value);

	let fMonthlyExpensesSection = document.getElementById('future-monthly-expenses');
	setDynamicTableEventListeners(fMonthlyExpensesSection, value => inputValues.future.monthlyExpenses = value);
})();