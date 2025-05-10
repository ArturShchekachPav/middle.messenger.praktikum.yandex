import Form from "../../framework/Form.js";
import {default as layout} from './EditPasswordForm.hbs?raw';
import {Field} from "../index.js";
import Component from "../../framework/Component.js";
import {EDIT_PASSWORD_FORM_CONFIG} from "../../utils/constants.js";
import Controller from "../../controllers";

export class EditPasswordForm extends Form {
	constructor() {
		super({
			Fields: EDIT_PASSWORD_FORM_CONFIG.map(({block, label, inputAttributs}) => {
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
					class: 'button profile__form-button'
				},
				content: 'Cохранить'
			}),
		});

		this.validateInput = this.validateInput.bind(this);
		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						formData => {
							this.controller.emit('changePassword', formData);
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

		this.hide();

		this.controller = new Controller();
		this.controller.on('showEditPasswordForm', this.show);
		this.controller.on('hideEditPasswordForm', this.hide);
	}

	render() {
		return layout;
	}

	validateInput(input: HTMLInputElement, errorMessage: Component) {
		this.validateConfirmPassword(input);

		super.validateInput(input, errorMessage);
	}

	validateConfirmPassword(input: HTMLInputElement) {
		const {value, name} = input;
		const {repeat_password, newPassword} = this.getFormData();

		if (name === 'repeat_password' && value && repeat_password !== newPassword) {
			input.setCustomValidity('Пароли не совпадают');
		} else if (name === 'repeat_password') {
			input.setCustomValidity('');
		}
	}
}
