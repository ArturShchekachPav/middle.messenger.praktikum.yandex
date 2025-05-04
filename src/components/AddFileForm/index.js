import { default as layout } from './AddFileForm.hbs?raw';
import Component from "../../framework/Component.js";
import Form from "../../framework/Form.js";

export class AddFileForm extends Form {
	constructor({formName, inputName, buttonText, title, onSuccessAction}) {
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
					blur: event => {
						const fileName = event.target.files[0].name;

						this.children.FieldLabel.setProps({content: fileName});

						const input = this.children.Input.getContent();
						const errorMessage = this.children.ErrorMessage;

						this.onInputBlur(input, errorMessage);
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

		this.onInputBlur = this.onInputBlur.bind(this);

		this.setProps({
			events: {
				submit: event => {
					this.handleSumbit(
						event,
						formData => {
							console.log(formData);
							onSuccessAction();
							this.getContent().reset();
						},
						() => {
							const input = this.children.Input.getContent();
							const errorMessage = this.children.ErrorMessage;

							this.onInputBlur(input, errorMessage);
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
