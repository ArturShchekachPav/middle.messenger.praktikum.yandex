import Form from "../../framework/Form.js";
import {default as layout} from './UserActionForm.hbs?raw';
import {Field} from "../index.js";
import Component from "../../framework/Component.js";
import {USER_ACTION_FORM_CONFIG} from "../../utils/constants.js";

export class UserActionForm extends Form {
	constructor({name, title, buttonText, onSuccessAction}: {
		name: string,
		title: string,
		buttonText: string,
		onSuccessAction: () => void
	}) {
		super({
			name,
			title,
			Fields: USER_ACTION_FORM_CONFIG.map(({block, label, inputAttributs}) => {
				const errorMessage = new Component({
					tag: 'span',
					attr: {
						class: 'error-message'
					},
					content: '',
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
							}
						}
					})
				})
			}),
			Button: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'button file-form__button'
				},
				content: buttonText
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
							this.lists.Fields.forEach(({children: {ErrorMessage, Input}}) => {
								this.validateInput(Input.getContent(), ErrorMessage);
							});
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
