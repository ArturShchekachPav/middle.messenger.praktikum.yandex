export default class Validation {
	constructor(formElement, onInputValid, onInputInvalid, setCustomErrors, onSubmit) {
		this.form = formElement;
		this.onInputValid = onInputValid;
		this.onInputInvalid = onInputInvalid;
		this.setCustomErrors = setCustomErrors;
		this.inputs = this._getFormInputs();
		this.onSubmit = onSubmit;
	}

	_getFormInputs() {
		const formData = new FormData(this.form);

		let inputs = [];
		for (let [key] of formData) {
			inputs.push(this.form[key]);
		}

		return inputs;
	}

	enableValidation() {
		this.inputs.forEach(input => {
			input.addEventListener('blur', this.handleBlur);
		});

		this.form.addEventListener('submit', this.handleSumbit)
	}

	handleSumbit(event) {
		event.preventDefault();

		if(this.validateForm()) {
			this.onSubmit(this.getFormData(), event);
		}
	}

	getFormData() {
		const formData = new FormData(this.form);

		let formObj = {};
		for (let [key, value] of formData) {
			formObj[key] = value;
		}

		return formObj;
	}

	handleBlur(event) {
		this.validateInput(event.target);
	}

	validateInput(input) {
		if(this.setCustomErrors) {
			this.setCustomErrors();
		}

		if(input.validity.valid) {
			this.onInputValid(input);
		} else {
			this.onInputInvalid(input.validationMessage, input);
		}
	}

	validateForm() {
		this.inputs.forEach(input => this.validateInput(input));

		return this.form.checkValidity();
	}
};
