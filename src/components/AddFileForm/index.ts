import {default as layout} from './AddFileForm.hbs?raw';
import Component from "../../framework/Component.js";
import Form from "../../framework/Form.js";

type AddFileFormProps = {
	formName: string,
	inputName: string,
	buttonText: string,
	title: string,
	onSuccessAction: () => void
}

export class AddFileForm extends Form {
	constructor({formName, inputName, buttonText, title, onSuccessAction}: AddFileFormProps) {
		super({
			formName,
			title,
			Input: new Component({
				tag: 'input',
				attr: {
					class: 'file-form__input',
					name: inputName,
					type: 'file',
					required: true
				},
				events: {
					change: (event: InputEvent) => {
						const inputElement = event.target as HTMLInputElement;

						if (inputElement.files) {
							this.children.FieldLabel.setProps({content: inputElement.files[0].name});
						}

						const input = this.children.Input.getContent() as HTMLInputElement;
						let errorMessage = this.children.ErrorMessage;

						if (errorMessage instanceof Component) {
							this.validateInput(input, errorMessage);
						}
					}
				}
			}),
			FieldLabel: new Component({
				tag: 'span',
				attr: {
					class: 'file-form__file-text'
				},
				content: 'Выбрать файл на компьютере'
			}),
			Button: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'button file-form__button'
				},
				content: buttonText
			}),
			ErrorMessage: new Component({
				tag: 'span',
				attr: {
					class: 'error-message'
				},
				content: '',
			})
		});

		this.validateInput = this.validateInput.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						formData => {
							console.log(formData);
							onSuccessAction();
							(this.getContent() as HTMLFormElement).reset();
						},
						() => {
							const input = this.children.Input.getContent() as HTMLInputElement;
							const errorMessage = this.children.ErrorMessage;

							if (errorMessage instanceof Component) {
								this.validateInput(input, errorMessage);
							}
						}
					)
				}
			}
		});
	}

	render() {
		return layout;
	}
}
