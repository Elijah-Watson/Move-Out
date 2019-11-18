// Each function takes in an input and checks to make sure it is valid
// If it is not, the input will be marked
// If it is, the input will be converted into the appropriate format for calculations and returned
// Additionally, the number format in the input is updated to a standard format
export function validateCurrencyInput(input) {
	let value = input.value;
	let result;
	if (!value) {
		result = null;
		input.classList.remove('invalid');
	} else {
		let regex = /^\$?(?:\d+|\d{1,3}(?:,\d{3})*)(?:.\d{1,2})?$/;
		let matches = value.match(regex);
		if (matches) {
			let match = matches[0];
			result = parseFloat(match.replace(/[^0-9.]/g, ''));
			input.value = result.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
			input.classList.remove('invalid');
		} else {
			result = null;
			input.classList.add('invalid');
		}
	}
	return result;
}

export function validateHoursInput(input) {
	let value = input.value;
	let result;
	if (!value) {
		result = null;
		input.classList.remove('invalid');
	} else {
		let regex = /^(?:1 ?(?:h|H|hour|Hour)?|\d+(?:.\d+)? ?(?:h|H|hours|Hours)?)$/;
		let matches = value.match(regex);
		if (matches) {
			let match = matches[0];
			result = parseFloat(match.replace(/[^0-9.]/g, ''));
			input.classList.remove('invalid');
		} else {
			result = null;
			input.classList.add('invalid');
		}
	}
	return result;
}

export function validateZipCode(input) {
	let value = input.value;
	let result;
	if (!value) {
		result = null;
		input.classList.remove('invalid');
	} else {
		let regex = /^\d{5}$/;
		let matches = value.match(regex);
		if (matches) {
			let match = matches[0];
			result = match;
			input.classList.remove('invalid');
		} else {
			result = null;
			input.classList.add('invalid');
		}
	}
	return result;
}