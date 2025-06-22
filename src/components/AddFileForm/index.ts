import {default as template} from './template.hbs?raw';
import Component from '../../framework/Component.js';
import Form from '../../framework/Form.js';
import {ErrorMessage} from '../ErrorMessage';
import {AddFileFormProps} from '../../utils/types';

export class AddFileForm extends Form {
	private readonly errorMessage: ErrorMessage;

	constructor({
								formName,
								inputName,
								buttonText,
								title,
								onSubmit,
							}: AddFileFormProps) {
		const errorMessage = new ErrorMessage({
			text: '',
			isHide: true,
		});

		super({
			formName,
			title,
			Input: new Component({
				tag: 'input',
				attr: {
					class: 'file-form__input',
					name: inputName,
					type: 'file',
					required: true,
					accept: 'image/*'
				},
				events: {
					change: (event: InputEvent) => {
						const inputElement = event.target as HTMLInputElement;

						if (inputElement.files) {
							this.children.FieldLabel.setProps({
								content: inputElement.files[0].name,
							});
						}

						const input = this.children.Input.getContent() as HTMLInputElement;

						this.validateInput(input, this.errorMessage);
					},
				},
			}),
			FieldLabel: new Component({
				tag: 'span',
				attr: {
					class: 'file-form__file-text',
				},
				content: 'Выбрать файл на компьютере',
			}),
			Button: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'button file-form__button',
				},
				content: buttonText,
			}),
			ErrorMessage: errorMessage,
		});

		this.errorMessage = errorMessage;

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(event, onSubmit, () => {
						const input = this.children.Input.getContent() as HTMLInputElement;

						this.validateInput(input, this.errorMessage);
					});
				},
			},
		});
	}

	render() {
		return template;
	}

	reset() {
		this.errorMessage.reset();

		this.children.FieldLabel.setProps({
			content: 'Выбрать файл на компьютере',
		});

		super.reset();
	}
}
