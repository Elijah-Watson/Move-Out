import 'normalize.css';
import '../css/main.css';
import { validateCurrencyInput, validateHoursInput, validateZipCode } from './utils/validation';
import { StickyNavBar } from './components/sticky-nav-bar';
import { SectionalFooterBar } from './components/sectional-footer-bar';
import { PopupBubble } from './components/popup-bubble';
import { CloseableBox } from './components/closeable-box';

// Object that contains all user input and some calculated values
const inputValues = {
	maritalStatus: null,
	finances: [],
	debts: [],
	oneTimeExpenses: [],
	current: {
		location: {
			state: null,
			zipCode: null
		},
		job: {
			mode: null,
			wage: null,
			hours: null,
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
			mode: null,
			wage: null,
			hours: null,
			monthlySalary: null
		},
		monthlyExpenses: []
	}
};

// Object that stores tax rates to reduce API calls
const taxes = {
	current: {
		salesTaxPercent: null,
		incomeTaxAmount: null
	},
	future: {
		salesTaxPercent: null,
		incomeTaxAmount: null
	}
};

// This section is used for setting the output values
function setTotalNeeded(value) {
	if (!value || isNaN(value) || value < 0) value = 0;
	[...document.querySelectorAll('.total-needed')].forEach(parent => {
		let elementValue = parent.querySelector('.output-section-value');
		let formattedValue = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		elementValue.innerText = formattedValue;
	});
}

function setSurplus(value) {
	if (!value || isNaN(value)) value = 0;
	[...document.querySelectorAll('.surplus')].forEach(parent => {
		let elementLabel = parent.querySelector('.output-section-label');
		let elementValue = parent.querySelector('.output-section-value');
		if (value < 0) {
			elementLabel.innerText = 'Defecit: ';
			elementValue.classList.remove('green-text');
			elementValue.classList.add('red-text');
		} else {
			elementLabel.innerText = 'Surplus: ';
			elementValue.classList.remove('red-text');
			elementValue.classList.add('green-text');
		}
		let formattedValue = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		elementValue.innerText = formattedValue;
	});
}

function setMoveOutDate(daysFromNow) {
	if (!daysFromNow || isNaN(daysFromNow)) daysFromNow = 0;
	if (daysFromNow === Infinity || daysFromNow < 0) {
		[...document.querySelectorAll('.move-out-date')].forEach(parent => {
			let elementValue = parent.querySelector('.output-section-value');
			elementValue.innerText = '∞';
		});
	} else {
		[...document.querySelectorAll('.move-out-date')].forEach(parent => {
			let elementValue = parent.querySelector('.output-section-value');
			let today = new Date();
			let moveOutDate = new Date(new Date().setDate(today.getDate() + daysFromNow));
			elementValue.innerText = moveOutDate.toLocaleDateString('en-US', { dateStyle: 'short' });
		});
	}
}

function setMonthlyExpenses(value) {
	if (!value || isNaN(value) || value < 0) value = 0;
	[...document.querySelectorAll('.monthly-expenses')].forEach(parent => {
		let elementValue = parent.querySelector('.output-section-value');
		let formattedValue = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		elementValue.innerText = formattedValue;
	});
}

function setMonthlySurplus(value) {
	if (!value || isNaN(value)) value = 0;
	[...document.querySelectorAll('.monthly-surplus')].forEach(parent => {
		let elementLabel = parent.querySelector('.output-section-label');
		let elementValue = parent.querySelector('.output-section-value');
		if (value < 0) {
			elementLabel.innerText = 'Monthly Defecit: ';
			elementValue.classList.remove('green-text');
			elementValue.classList.add('red-text');
		} else {
			elementLabel.innerText = 'Monthly Surplus: ';
			elementValue.classList.remove('red-text');
			elementValue.classList.add('green-text');
		}
		let formattedValue = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		elementValue.innerText = formattedValue;
	});
}

function setMonthlyIncome(value) {
	if (!value || isNaN(value) || value < 0) value = 0;
	[...document.querySelectorAll('.monthly-income')].forEach(parent => {
		let elementValue = parent.querySelector('.output-section-value');
		let formattedValue = value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
		elementValue.innerText = formattedValue;
	});
}

// The main calculations take place here
// The two global objects are used for the calculations
function calculateAll() {
	const averageDaysPerMonth = 30.44;

	let fMEBeforeTax = inputValues.future.monthlyExpenses.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0);
	let fME = fMEBeforeTax * (1 + taxes.future.salesTaxPercent);

	let fMIBeforeTax = inputValues.future.job.monthlySalary;
	let fMI = fMIBeforeTax - taxes.future.incomeTaxAmount;

	let fMS = fMI - fME;

	let cMEBeforeTax = inputValues.current.monthlyExpenses.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0);
	let cME = cMEBeforeTax * (1 + taxes.current.salesTaxPercent);

	let cMIBeforeTax = inputValues.current.job.monthlySalary;
	let cMI = cMIBeforeTax - taxes.current.incomeTaxAmount;

	let cMS = cMI - cME;

	let oTEBeforeTax = inputValues.oneTimeExpenses.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0);
	let oTE = oTEBeforeTax * (1 + taxes.future.salesTaxPercent);

	let totalNeeded = oTE;

	let finances = inputValues.finances.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0);
	let debts = inputValues.debts.reduce((accumulator, currentValue) => accumulator + currentValue[1], 0);
	let combinedAssets = finances - debts;

	let surplus = combinedAssets - totalNeeded;
	let daysToTarget = surplus >= 0 ? 0 : surplus / cMS * averageDaysPerMonth * -1;

	setTotalNeeded(totalNeeded);
	setSurplus(surplus);
	setMoveOutDate(daysToTarget);
	setMonthlyExpenses(fME);
	setMonthlySurplus(fMS);
	setMonthlyIncome(fMI);

	localStorage.setItem('inputValues', JSON.stringify(inputValues));
}

// This section contains the actual API calls
// Each function takes the POST data as params and returns the relevant data
async function getSalesTax(postalCode) {
	if (!postalCode) return 0;
	const response = await fetch('/.netlify/functions/sales-tax', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'country': 'USA',
			'postalCode': postalCode
		}),
	});
	const json = await response.json();
	return json.totalRate;
}

async function getIncomeTax(payRate, filingStatus, state) {
	if (!payRate) return 0;
	const response = await fetch('/.netlify/functions/income-tax', {
		method: 'POST',
		mode: 'cors',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'pay_rate': payRate,
			'filing_status': filingStatus,
			'state': state
		}),
	});
	const json = await response.json();
	let incomeTaxValue = json.annual.federal.amount + json.annual.fica.amount;
	if (state !== 'TN' && state !== 'NH') {
		incomeTaxValue += json.annual.state.amount;
	}
	return incomeTaxValue;
}

// This section contains the functions for interacting with the dynamic tables
function setDynamicTableEventListeners(section, setter) {
	section.querySelector('.dynamic-table').addEventListener('click', e => {
		if (dynamicTableClickHandler(e)) {
			setter(getDynamicTableValues(section));
			calculateAll();
		}
	});
	section.querySelector('.dynamic-table').addEventListener('change', () => {
		setter(getDynamicTableValues(section));
		calculateAll();
	});
	section.querySelector('.dynamic-table').addEventListener('keyup', e => {
		if (e.keyCode === 13) {
			e.target.blur();
		}
	});
}

function dynamicTableClickHandler(e) {
	if (e.target.classList.contains('dynamic-table-add')) {
		addDynamicTableRow(e.currentTarget);
		return false;
	}
	if (e.target.classList.contains('dynamic-table-remove')) {
		removeDynamicTableRow(e.currentTarget, e.target.parentNode);
		return true;
	}
}

function addDynamicTableRow(table) {
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

function removeDynamicTableRow(table, tableRow) {
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

// Retrieves all data from a dynamic table, creates an array of name/value arrays, then validates values
function getDynamicTableValues(section) {
	let dTRows = [...section.getElementsByClassName('dynamic-table-row')];
	let dTValueInputs = dTRows.map(dTRow => [dTRow.querySelector('.dynamic-table-row-label'), dTRow.querySelector('.dynamic-table-row-value')]);
	let validatedDTValueInputs = dTValueInputs.map(dTValueInput => [dTValueInput[0].value, validateCurrencyInput(dTValueInput[1])]);
	return validatedDTValueInputs;
}

// Changes the inputs in the job sections depending on selected mode
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
		// The mode should always be set, but if something goes wrong, default to yearly salary mode
		hoursQuestion.classList.add('disabled');
		wageQuestionModeText.innerText = 'year';
		break;
	}
}

// Convert job salary info to monthly value
function calculateMonthlySalary(mode, wage, hours) {
	const weeksPerMonth = 4.348214;
	let result;
	switch (mode) {
	case 'hourly':
		result = wage * hours * weeksPerMonth;
		break;
	case 'weekly':
		result = wage * weeksPerMonth;
		break;
	case 'monthly':
		result = wage;
		break;
	case 'yearly':
		result = wage / 12;
		break;
	default:
		// The mode should always be set, but if something goes wrong, set monthly salary to 0 and log error
		result = 0;
		console.error('error');
		break;
	}
	return result;
}

// Watches for changes to inputs in the job sections and updates global variables using setters if values change
function setJobSectionEventListeners(section, modeSetter, wageSetter, hoursSetter, monthlySalarySetter) {
	section.addEventListener('change', e => {
		let mode = section.querySelector('.income-type-select').value;
		modeSetter(mode);
		if (e.target && e.target.classList.contains('income-type-select')) {
			setJobSectionMode(mode, section);
		}
		let wageInput = section.querySelector('.job-input-section-question-wage input');
		let validatedWage = validateCurrencyInput(wageInput);
		wageSetter(validatedWage);
		let hoursInput = section.querySelector('.job-input-section-question-hours input');
		let validatedHours = validateHoursInput(hoursInput);
		hoursSetter(validatedHours);
		let monthlySalary = calculateMonthlySalary(mode, validatedWage, validatedHours);
		monthlySalarySetter(monthlySalary);
		setIncomeTaxes()
			.then(calculateAll);
	});
	section.addEventListener('keyup', e => {
		if (e.keyCode === 13) {
			e.target.blur();
		}
	});
}

// Watches for changes to inputs in the personal info section and updates global variables using setters if values change
function setPersonalInfoSectionEventListeners(section, maritalStatusSetter, currentStateSetter, currentZipCodeSetter, futureStateSetter, futureZipCodeSetter) {
	let maritalStatusSelect = section.querySelector('.marital-status-select');
	maritalStatusSelect.addEventListener('change', e => {
		maritalStatusSetter(e.target.value);
		setIncomeTaxes()
			.then(calculateAll);
	});

	let currentSection = section.querySelector('#current-location');
	let currentStateSelect = currentSection.querySelector('.state-select');
	currentStateSelect.addEventListener('change', e => {
		currentStateSetter(e.target.value);
		setIncomeTaxes()
			.then(calculateAll);
	});
	let currentZipCodeInput = currentSection.querySelector('.zip-code-input');
	currentZipCodeInput.addEventListener('change', e => {
		let validatedValue = validateZipCode(e.target);
		currentZipCodeSetter(validatedValue);
		setSalesTaxes()
			.then(calculateAll);
	});

	let futureSection = section.querySelector('#future-location');
	let futureStateSelect = futureSection.querySelector('.state-select');
	futureStateSelect.addEventListener('change', e => {
		futureStateSetter(e.target.value);
		setIncomeTaxes()
			.then(calculateAll);
	});
	let futureZipCodeInput = futureSection.querySelector('.zip-code-input');
	futureZipCodeInput.addEventListener('change', e => {
		let validatedValue = validateZipCode(e.target);
		futureZipCodeSetter(validatedValue);
		setSalesTaxes()
			.then(calculateAll);
	});

	section.addEventListener('keyup', e => {
		if (e.keyCode === 13) {
			e.target.blur();
		}
	});
}

// These fuctions use the API call functions to retrieve tax data, check for errors, and then save the data to the global tax object
async function setSalesTaxes() {
	let currentSalesTax = getSalesTax(inputValues.current.location.zipCode)
		.then(data => data)
		.catch(error => console.error(error));

	let futureSalesTax = getSalesTax(inputValues.future.location.zipCode)
		.then(data => data)
		.catch(error => console.error(error));

	taxes.current.salesTaxPercent = await currentSalesTax || 0;
	taxes.future.salesTaxPercent = await futureSalesTax || 0;

	return taxes;
}

async function setIncomeTaxes() {
	let currentIncomeTax = getIncomeTax(inputValues.current.job.monthlySalary * 12, inputValues.maritalStatus, inputValues.current.location.state)
		.then(data => data / 12)
		.catch(error => console.error(error));

	let futureIncomeTax = getIncomeTax(inputValues.future.job.monthlySalary * 12, inputValues.maritalStatus, inputValues.future.location.state)
		.then(data => data / 12)
		.catch(error => console.error(error));

	taxes.current.incomeTaxAmount = await currentIncomeTax || 0;
	taxes.future.incomeTaxAmount = await futureIncomeTax || 0;

	return taxes;
}

// Ensures that the job sections load properly
function initializeCalculator() {
	let cJobSection = document.getElementById('current-job');
	let cMode = cJobSection.querySelector('.income-type-select').value;
	setJobSectionMode(cMode, cJobSection);

	let fJobSection = document.getElementById('future-job');
	let fMode = fJobSection.querySelector('.income-type-select').value;
	setJobSectionMode(fMode, fJobSection);
}

// Checks to see if local storage of previous input values exists
// If it does not (or it does not match the expected structure), it exits
// If it does, it fills in those values on the page
function initializeLocalStorage() {
	let tempInputValues = JSON.parse(localStorage.getItem('inputValues'));
	if (!tempInputValues) return;
	let tempKeys = Object.keys(tempInputValues).sort();
	let globalKeys = Object.keys(inputValues).sort();
	if (!tempInputValues || JSON.stringify(tempKeys) !== JSON.stringify(globalKeys)) {
		localStorage.removeItem('inputValues');
		return;
	}

	let personalInfoSection = document.getElementById('personal-info');
	personalInfoSection.querySelector('.marital-status-select').value = tempInputValues.maritalStatus;
	let currentSection = personalInfoSection.querySelector('#current-location');
	currentSection.querySelector('.state-select').value = tempInputValues.current.location.state;
	currentSection.querySelector('.zip-code-input').value = tempInputValues.current.location.zipCode;
	let futureSection = personalInfoSection.querySelector('#future-location');
	futureSection.querySelector('.state-select').value = tempInputValues.future.location.state;
	futureSection.querySelector('.zip-code-input').value = tempInputValues.future.location.zipCode;

	let financeSection = document.getElementById('finances');
	let financeSectionTable = financeSection.querySelector('.dynamic-table');
	dynamicTableHelper(financeSectionTable, tempInputValues.finances);

	let debtSection = document.getElementById('debts');
	let debtSectionTable = debtSection.querySelector('.dynamic-table');
	dynamicTableHelper(debtSectionTable, tempInputValues.debts);

	let cJobSection = document.getElementById('current-job');
	cJobSection.querySelector('.income-type-select').value = tempInputValues.current.job.mode;
	cJobSection.querySelector('.job-input-section-question-wage input').value = tempInputValues.current.job.wage;
	cJobSection.querySelector('.job-input-section-question-hours input').value = tempInputValues.current.job.hours;

	let cMonthlyExpensesSection = document.getElementById('current-monthly-expenses');
	let cMonthlyExpensesSectionTable = cMonthlyExpensesSection.querySelector('.dynamic-table');
	dynamicTableHelper(cMonthlyExpensesSectionTable, tempInputValues.current.monthlyExpenses);

	let oneTimeExpensesSection = document.getElementById('one-time-expenses');
	let oneTimeExpensesSectionTable = oneTimeExpensesSection.querySelector('.dynamic-table');
	dynamicTableHelper(oneTimeExpensesSectionTable, tempInputValues.oneTimeExpenses);

	let fJobSection = document.getElementById('future-job');
	fJobSection.querySelector('.income-type-select').value = tempInputValues.future.job.mode;
	fJobSection.querySelector('.job-input-section-question-wage input').value = tempInputValues.future.job.wage;
	fJobSection.querySelector('.job-input-section-question-hours input').value = tempInputValues.future.job.hours;

	let fMonthlyExpensesSection = document.getElementById('future-monthly-expenses');
	let fMonthlyExpensesSectionTable = fMonthlyExpensesSection.querySelector('.dynamic-table');
	dynamicTableHelper(fMonthlyExpensesSectionTable, tempInputValues.future.monthlyExpenses);

	// Adds entries to a dynamic table by creating rows and then setting the values
	function dynamicTableHelper(table, values) {
		let tableRows = table.querySelectorAll('.dynamic-table-row');
		for (let i = 0; i < values.length; i++) {
			if (!tableRows[i]) {
				addDynamicTableRow(table);
				tableRows = table.querySelectorAll('.dynamic-table-row');
			}
			tableRows[i].querySelector('.dynamic-table-row-label').value = values[i][0];
			tableRows[i].querySelector('.dynamic-table-row-value').value = values[i][1];
		}
	}
}

// Adds initial data to the global variables
async function initializeGlobals() {
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
	let debtSection = document.getElementById('debts');
	inputValues.debts = getDynamicTableValues(debtSection);

	let cJobSection = document.getElementById('current-job');
	let cMode = cJobSection.querySelector('.income-type-select').value;
	inputValues.current.job.mode = cMode;
	let cWageInput = cJobSection.querySelector('.job-input-section-question-wage input');
	let cValidatedWage = validateCurrencyInput(cWageInput);
	inputValues.current.job.wage = cValidatedWage;
	let cHoursInput = cJobSection.querySelector('.job-input-section-question-hours input');
	let cValidatedHours = validateHoursInput(cHoursInput);
	inputValues.current.job.hours = cValidatedHours;
	inputValues.current.job.monthlySalary = calculateMonthlySalary(cMode, cValidatedWage, cValidatedHours);

	let cMonthlyExpensesSection = document.getElementById('current-monthly-expenses');
	inputValues.current.monthlyExpenses = getDynamicTableValues(cMonthlyExpensesSection);

	let oneTimeExpensesSection = document.getElementById('one-time-expenses');
	inputValues.oneTimeExpenses = getDynamicTableValues(oneTimeExpensesSection);

	let fJobSection = document.getElementById('future-job');
	let fMode = fJobSection.querySelector('.income-type-select').value;
	inputValues.future.job.mode = fMode;
	let fWageInput = fJobSection.querySelector('.job-input-section-question-wage input');
	let fValidatedWage = validateCurrencyInput(fWageInput);
	inputValues.future.job.wage = fValidatedWage;
	let fHoursInput = fJobSection.querySelector('.job-input-section-question-hours input');
	let fValidatedHours = validateHoursInput(fHoursInput);
	inputValues.future.job.hours = fValidatedHours;
	inputValues.future.job.monthlySalary = calculateMonthlySalary(fMode, fValidatedWage, fValidatedHours);

	let fMonthlyExpensesSection = document.getElementById('future-monthly-expenses');
	inputValues.future.monthlyExpenses = getDynamicTableValues(fMonthlyExpensesSection);

	await setSalesTaxes();
	await setIncomeTaxes();

	return inputValues, taxes;
}

// Initialize components, initialize calculator, set up event listeners
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

	let firstPopup = document.querySelector('.popup.first-popup');
	let firstPopupObject = new PopupBubble(firstPopup);
	firstPopupObject.init();

	let popups = [...document.querySelectorAll('.popup:not(.first-popup)')];
	let popupObjects = popups.map(popup => new PopupBubble(popup));
	popupObjects.forEach(popupObject => popupObject.init());

	// This is used to dynamically set the "viewport padding" so that the popups aren't hidden behind the header or nav bar
	function setPopupsViewportPadding(firstPopupObject, popupObjects) {
		let siteHeader = document.querySelector('.site-header');
		let siteHeaderHeight = siteHeader.offsetHeight;
		let navBar = document.querySelector('.site-nav');
		let navBarHeight = navBar.offsetHeight;
		let navBarBottom = siteHeaderHeight + navBarHeight;
		let navBarStickyHeight = navBar.classList.contains('sticky') ? navBarHeight : 0;
		firstPopupObject.setViewportPadding({ top: navBarBottom, right: 25, bottom: 0, left: 25 });
		popupObjects.forEach(popupObject => popupObject.setViewportPadding({ top: navBarStickyHeight, right: 25, bottom: 0, left: 25 }));
	}

	setPopupsViewportPadding(firstPopupObject, popupObjects);

	window.addEventListener('resize', () => {
		setPopupsViewportPadding(firstPopupObject, popupObjects);
	});

	let closeableBox = new CloseableBox(document.querySelector('.instructions'), document.querySelector('.instructions .close-button'));
	closeableBox.init();

	initializeCalculator();
	initializeLocalStorage();
	initializeGlobals()
		.then(calculateAll);

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

	let debtSection = document.getElementById('debts');
	setDynamicTableEventListeners(debtSection, value => inputValues.debts = value);

	let cJobSection = document.getElementById('current-job');
	setJobSectionEventListeners(cJobSection,
		value => inputValues.current.job.mode = value,
		value => inputValues.current.job.wage = value,
		value => inputValues.current.job.hours = value,
		value => inputValues.current.job.monthlySalary = value);

	let cMonthlyExpensesSection = document.getElementById('current-monthly-expenses');
	setDynamicTableEventListeners(cMonthlyExpensesSection, value => inputValues.current.monthlyExpenses = value);

	let oneTimeExpensesSection = document.getElementById('one-time-expenses');
	setDynamicTableEventListeners(oneTimeExpensesSection, value => inputValues.oneTimeExpenses = value);

	let fJobSection = document.getElementById('future-job');
	setJobSectionEventListeners(fJobSection,
		value => inputValues.future.job.mode = value,
		value => inputValues.future.job.wage = value,
		value => inputValues.future.job.hours = value,
		value => inputValues.future.job.monthlySalary = value);

	let fMonthlyExpensesSection = document.getElementById('future-monthly-expenses');
	setDynamicTableEventListeners(fMonthlyExpensesSection, value => inputValues.future.monthlyExpenses = value);
})();