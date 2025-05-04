import Form from "../../framework/Form.js";
import { default as layout } from './EditPasswordForm.hbs?raw';
import { Field } from "../index.js";
import Component from "../../framework/Component.js";
import {EDIT_PASSWORD_FORM_CONFIG} from "../../utils/constants.js";

export class EditPasswordForm extends Form {
	constructor({isHide, onChangePasswordData}) {
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
							blur: ({target: input}) => {
								this.onInputBlur(input, errorMessage);
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

		this.onInputBlur = this.onInputBlur.bind(this);

		this.setProps({
			events: {
				submit: event => {
					this.handleSumbit(
						event,
						formData => {
							console.log(formData);
							onChangePasswordData();
						},
						() => {
							this.lists.Fields.forEach(({children: {ErrorMessage, Input}}) => {
								this.onInputBlur(Input.getContent(), ErrorMessage);
							});
						}
					)
				}
			}
		});

		if(isHide) {
			this.hide();
		}
	}

	render() {
		return layout;
	}

	onInputBlur(input, errorMessage) {
		this.validateConfirmPassword(input);

		super.onInputBlur(input, errorMessage);
	}

	validateConfirmPassword(input) {
		const { value, name } = input;
		const { repeat_password, newPassword } = this.getFormData();

		if(name === 'repeat_password' && value && repeat_password !== newPassword ) {
			input.setCustomValidity('Пароли не совпадают');
		} else if(name === 'repeat_password') {
			input.setCustomValidity('');
		}
	}
}
