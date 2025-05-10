import Block from "./Block";
import Component from "./Component";
import {ErrorMessage} from "../components";

interface BlockProps {
	[key: string]: any;
}

export default class Form extends Block {
	constructor(propsWithChildren: BlockProps) {
		super(propsWithChildren);
	}

	validateInput(input: HTMLInputElement, errorMessage: Component) {
		if (this.checkInputValidity(input)) {
			errorMessage.setProps({content: this.getValidationMessage(input), attr: {class: 'error-message'}});
		} else {
			errorMessage.setProps({content: this.getValidationMessage(input), attr: {class: 'error-message error-message_open'}});
		}
	}

	validateInputDuble(input: HTMLInputElement, errorMessage: ErrorMessage) {
		if (this.checkInputValidity(input)) {
			errorMessage.hide();
			errorMessage.setText('');
		} else {
			errorMessage.show();
			errorMessage.setText(this.getValidationMessage(input));
		}
	}

	getFormData() {
		const formData = new FormData(this.getContent() as HTMLFormElement);

		let formObj: Record<string, unknown> = {};
		for (let [key, value] of formData) {
			formObj[key] = value;
		}

		return formObj;
	}

	handleSumbit(event: SubmitEvent, onValidity: (formdata: Record<string, unknown>, event: SubmitEvent) => void, onInvalid: (event: SubmitEvent) => void) {
		event.preventDefault();

		if (this.checkFormValidity()) {
			onValidity(this.getFormData(), event);
		} else {
			onInvalid(event);
		}
	}

	handleSubmitDuble() {
		return (event) => {
			event.preventDefault();

			this.onSubmit(this.getFormData(), event);
		}
	}

	onSubmit(formData, event) {

	}

	reset() {
		this.getContent().reset();
	}

	checkInputValidity(input) {
		return input.validity.valid;
	}

	checkFormValidity() {
		return this.getContent().checkValidity();
	}

	setCustomInputError(input, message) {
		input.setCustomValidity(input, message);
	}

	resetCustomInputError(input) {
		input.setCustomValidity(input, message);
	}

	getValidationMessage(input) {
		return input.validationMessage;
	}
};
