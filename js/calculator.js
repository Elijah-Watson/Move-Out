var userData = {
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
		monthlyExpenses: [],
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
		monthlyExpenses: [],
	},
	updateCurrentSalesTax: function () {
		var postalCode = this.current.zipCode;
		var data = '?country=USA&postalCode=' + encodeURIComponent(postalCode);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					this.current.salesTaxPercent = response.totalRate;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('GET', 'https://rest.avatax.com/api/v2/taxrates/bypostalcode' + data);
		httpRequest.setRequestHeader('Authorization', 'Basic MjAwMDExNDEwMjo0N0MxQ0UwRTNGRUFCMkE2');
		httpRequest.send();
	},
	updateFutureSalesTax: function () {
		var postalCode = this.future.zipCode;
		var data = '?country=USA&postalCode=' + encodeURIComponent(postalCode);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					this.future.salesTaxPercent = response.totalRate;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('GET', 'https://rest.avatax.com/api/v2/taxrates/bypostalcode' + data);
		httpRequest.setRequestHeader('Authorization', 'Basic MjAwMDExNDEwMjo0N0MxQ0UwRTNGRUFCMkE2');
		httpRequest.send();
	},
	updateCurrentIncomeTax: function () {
		var payRate = this.current.job.yearlyPay;
		var filingStatus = this.maritalStatus;
		var state = this.current.state;
		var data = 'pay_rate=' + encodeURIComponent(payRate) + '&filing_status=' + encodeURIComponent(filingStatus) + '&state=' + encodeURIComponent(state);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					var incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					this.current.incomeTaxValue = incomeTaxValue;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('POST', 'https://taxee.io/api/v2/calculate/2019');
		httpRequest.setRequestHeader('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBUElfS0VZX01BTkFHRVIiLCJodHRwOi8vdGF4ZWUuaW8vdXNlcl9pZCI6IjVjNjE4YjkxNjcxZGY0NzhhMjU3MTk4MSIsImh0dHA6Ly90YXhlZS5pby9zY29wZXMiOlsiYXBpIl0sImlhdCI6MTU0OTg5NjU5M30.EJV8dbX-nohirPMxSK4aOaLDNj5cVsDWlLYucMgvu7Y');
		httpRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
		httpRequest.send(data);
	},
	updateFutureIncomeTax: function () {
		var payRate = this.future.job.yearlyPay;
		var filingStatus = this.maritalStatus;
		var state = this.future.state;
		var data = 'pay_rate=' + encodeURIComponent(payRate) + '&filing_status=' + encodeURIComponent(filingStatus) + '&state=' + encodeURIComponent(state);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					var incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					this.future.incomeTaxValue = incomeTaxValue;
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
}

function FooterBarAnimations() {
	this.animate = function () {
		var currentFooterBar = document.getElementById('current-footer-bar');
		var futureFooterBar = document.getElementById('future-footer-bar');
		var futureInputContainer = document.getElementById('future-input-container');
		var outputContainer = document.querySelector('.output-container');
		var windowHeight = window.innerHeight;
		var adjustedWindowHeight = windowHeight - currentFooterBar.offsetHeight;

		var outputContainerPositionFromTop = outputContainer.getBoundingClientRect().top;
		var futureInputContainerPositionFromTop = futureInputContainer.getBoundingClientRect().top;

		if (futureInputContainerPositionFromTop - adjustedWindowHeight >= 0) {
			currentFooterBar.classList.remove('footer-bar--hidden');
			futureFooterBar.classList.add('footer-bar--hidden');
		} else if (futureInputContainerPositionFromTop - adjustedWindowHeight <= 0 && outputContainerPositionFromTop - adjustedWindowHeight >= 0) {
			currentFooterBar.classList.add('footer-bar--hidden');
			futureFooterBar.classList.remove('footer-bar--hidden');
		} else if (outputContainerPositionFromTop - adjustedWindowHeight <= 0) {
			futureFooterBar.classList.add('footer-bar--hidden');
			currentFooterBar.classList.add('footer-bar--hidden');
		}
	}

	this.init = function () {
		window.addEventListener('scroll', this.animate);
	}
}

function DynamicTableActions() {
	this.addDynamicTableRow = function (e) {
		var addButton = e.target;
		var dynamicTable = addButton.parentNode;
		var tableBody = dynamicTable.querySelector('.dynamic-table-body');
		var tableRow = document.createElement('div');
		var labelInput = document.createElement('input');
		var valueInput = document.createElement('input');
		var removeButton = document.createElement('div');
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

	this.removeDynamicTableRow = function (e) {
		var removeButton = e.target;
		var tableRow = removeButton.parentNode;
		var tableBody = tableRow.parentNode;
		var tableRows = tableBody.querySelectorAll('.dynamic-table-row');
		if (tableRows.length < 2) {
			var tableRowInputs = tableRow.querySelectorAll('input');
			for (var i = 0; i < tableRowInputs.length; i++) {
				tableRowInputs[i].value = '';
			}
		} else {
			tableRow.remove();
			// May need to clear values first to trigger event listener
		}
	}

	this.init = function () {
		var dynamicTables = document.querySelectorAll('.dynamic-table');
		for (var i = 0; i < dynamicTables.length; i++) {
			dynamicTables[i].addEventListener('click', (e) => {
				if (e.target && e.target.classList.contains('dynamic-table-remove')) {
					this.removeDynamicTableRow(e);
				}
			});
		}
		var addButtons = document.querySelectorAll('.dynamic-table-add');
		for (var i = 0; i < addButtons.length; i++) {
			addButtons[i].addEventListener('click', this.addDynamicTableRow);
		}
	}
}

function JobInputSectionActions() {
	this.determineMode = function (e) {
		var jobInputSection = e.currentTarget;
		var hoursQuestion = jobInputSection.querySelector('.job-input-section-question-hours');
		var wageQuestion = jobInputSection.querySelector('.job-input-section-question-wage');
		var wageQuestionText = wageQuestion.querySelector('.input-question-text');
		var mode = e.target.value;
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

	this.init = function () {
		var jobInputSections = document.querySelectorAll('.job-input-section');
		for (var i = 0; i < jobInputSections.length; i++) {
			jobInputSections[i].addEventListener('change', (e) => {
				if (e.target && e.target.nodeName === 'SELECT') {
					this.determineMode(e);
				}
			});

			// This triggers the previously set up event listener once in case select value is preserved
			// There may be a better way to do this...
			var e = new Event('change', { 'bubbles': true });
			jobInputSections[i].querySelector('select').dispatchEvent(e);
		}
	}
}

function calculateAll() {

}

(function onLoad() {
	var footerBar = new FooterBarAnimations();
	footerBar.init();
	var dynamicTables = new DynamicTableActions();
	dynamicTables.init();
	var jobInputSections = new JobInputSectionActions();
	jobInputSections.init();
})();