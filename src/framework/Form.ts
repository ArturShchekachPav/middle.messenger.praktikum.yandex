import Block from './Block';
import {ErrorMessage} from '../components';
import {BlockPropsWithChildren} from '../utils/types';

export default class Form extends Block {
	constructor(propsWithChildren: BlockPropsWithChildren) {
		super(propsWithChildren);
	}

	validateInput(input: HTMLInputElement, errorMessage: ErrorMessage) {
		if (this.checkInputValidity(input)) {
			errorMessage.reset();
		} else {
			errorMessage.enable(this.getValidationMessage(input));
		}
	}

	getFormData() {
		const formData = new FormData(this.getContent() as HTMLFormElement);

		const formObj: Record<string, unknown> = {};
		for (const [key, value] of formData) {
			formObj[key] = value;
		}

		return formObj;
	}

	handleSumbit(
		event: SubmitEvent,
		onValidity: (formdata: Record<string, unknown>, event: SubmitEvent) => void,
		onInvalid: (event: SubmitEvent) => void
	) {
		event.preventDefault();

		if (this.checkFormValidity()) {
			onValidity(this.getFormData(), event);
		} else {
			onInvalid(event);
		}
	}

	reset() {
		this.getContent().reset();
	}

	checkInputValidity(input: HTMLInputElement) {
		return input.validity.valid;
	}

	checkFormValidity() {
		return this.getContent().checkValidity();
	}

	getValidationMessage(input: HTMLInputElement) {
		return input.validationMessage;
	}

	getContent(): HTMLFormElement {
		return super.getContent() as HTMLFormElement;
	}
}
