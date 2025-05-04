import Block from "./Block.js";

export default class Form extends Block {
	constructor(propsWithChildren) {
		super(propsWithChildren);
	}

	onInputBlur(input, errorMessage) {
		if(input.validity.valid) {
			errorMessage.setProps({content: input.validationMessage, attr: {class: 'error-message'}});
		} else {
			errorMessage.setProps({content: input.validationMessage, attr: {class: 'error-message error-message_open'}});
		}
	}

	getFormData() {
		const formData = new FormData(this.getContent());

		let formObj = {};
		for (let [key, value] of formData) {
			formObj[key] = value;
		}

		return formObj;
	}

	handleSumbit(event, onValidity, onInvalid) {
		event.preventDefault();

		if(this.getContent().checkValidity()) {
			onValidity(this.getFormData(), event);
		} else {
			onInvalid(event);
		}
	}
};
