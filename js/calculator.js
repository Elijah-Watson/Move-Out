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
	updateCurrentSalesTax: function (postalCode, country) {
		var that = this;
		var data = '?country=USA&postalCode=' + encodeURIComponent(postalCode);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					that.current.salesTaxPercent = response.totalRate;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('GET', 'https://rest.avatax.com/api/v2/taxrates/bypostalcode' + data);
		httpRequest.setRequestHeader('Authorization', 'Basic MjAwMDExNDEwMjo0N0MxQ0UwRTNGRUFCMkE2');
		httpRequest.send();
	},
	updateFutureSalesTax: function (postalCode) {
		var that = this;
		var data = '?country=USA&postalCode=' + encodeURIComponent(postalCode);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					that.future.salesTaxPercent = response.totalRate;
				} else {
					console.log('error');
				}
			}
		};
		httpRequest.open('GET', 'https://rest.avatax.com/api/v2/taxrates/bypostalcode' + data);
		httpRequest.setRequestHeader('Authorization', 'Basic MjAwMDExNDEwMjo0N0MxQ0UwRTNGRUFCMkE2');
		httpRequest.send();
	},
	updateCurrentIncomeTax: function() {
		var that = this;
		var payRate = this.current.job.yearlyPay;
		var filingStatus = this.maritalStatus;
		var state = this.current.state;
		var data = 'pay_rate=' + encodeURIComponent(payRate) + '&filing_status=' + encodeURIComponent(filingStatus) + '&state=' + encodeURIComponent(state);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					var incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					that.current.incomeTaxValue = incomeTaxValue;
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
		var that = this;
		var payRate = this.current.job.yearlyPay;
		var filingStatus = this.maritalStatus;
		var state = this.future.state;
		var data = 'pay_rate=' + encodeURIComponent(payRate) + '&filing_status=' + encodeURIComponent(filingStatus) + '&state=' + encodeURIComponent(state);
		var httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = function () {
			if (httpRequest.readyState === XMLHttpRequest.DONE) {
				if (httpRequest.status === 200) {
					var response = JSON.parse(httpRequest.responseText);
					var incomeTaxValue = response.annual.federal.amount + response.annual.fica.amount;
					if (state !== 'TN' && state !== 'NH') { incomeTaxValue += response.annual.state.amount };
					that.future.incomeTaxValue = incomeTaxValue;
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
		var currentInputContainer = document.getElementById('current-input-container');
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

function calculateAll() {

}

(function onLoad() {
	var footerBar = new FooterBarAnimations();
	footerBar.init();
})();