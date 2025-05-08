import Block from "./Block";
import Component from "./Component";

interface BlockProps {
	[key: string]: any;
}

export default class Form extends Block {
	constructor(propsWithChildren: BlockProps) {
		super(propsWithChildren);
	}

	validateInput(input: HTMLInputElement, errorMessage: Component) {
		if (input.validity.valid) {
			errorMessage.setProps({content: input.validationMessage, attr: {class: 'error-message'}});
		} else {
			errorMessage.setProps({content: input.validationMessage, attr: {class: 'error-message error-message_open'}});
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

		if ((this.getContent() as HTMLFormElement).checkValidity()) {
			onValidity(this.getFormData(), event);
		} else {
			onInvalid(event);
		}
	}
};
