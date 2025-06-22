import Form from '../../framework/Form.js';
import {default as template} from './template.hbs?raw';
import {ErrorMessage, Field} from '../index.js';
import Component from '../../framework/Component.js';
import {USER_ACTION_FORM_CONFIG} from '../../utils/constants.js';
import {UserActionFormProps} from '../../utils/types';

export class UserActionForm extends Form {
	constructor({name, title, buttonText, onSubmit}: UserActionFormProps) {
		super({
			name,
			title,
			Fields: USER_ACTION_FORM_CONFIG.map(
				({block, label, inputAttributs}) => {
					const errorMessage = new ErrorMessage({
						text: '',
						isHide: true,
					});

					return new Field({
						block,
						label,
						id: inputAttributs.id,
						ErrorMessage: errorMessage,
						Input: new Component({
							tag: 'input',
							attr: {
								...inputAttributs,
							},
							events: {
								blur: (event: InputEvent) => {
									const input = event.target as HTMLInputElement;

									this.validateInput(input, errorMessage);
								},
							},
						}),
					});
				}
			),
			Button: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'button file-form__button',
				},
				content: buttonText,
			}),
		});

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(event, onSubmit, () => {
						this.lists.Fields.forEach((field) => {
							if (!(field instanceof Field)) {
								return;
							}

							const {errorMessage, input} = field.getFieldComponents();

							if (!errorMessage || !input) {
								return;
							}

							const inputElement = input.getContent();

							if (inputElement instanceof HTMLInputElement) {
								this.validateInput(inputElement, errorMessage);
							}
						});
					});
				},
			},
		});
	}

	render() {
		return template;
	}

	reset() {
		this.lists.Fields.forEach((field) => {
			if (!(field instanceof Field)) {
				return;
			}

			const {errorMessage} = field.getFieldComponents();

			if (errorMessage) {
				errorMessage.reset();
			}
		});

		super.reset();
	}
}
