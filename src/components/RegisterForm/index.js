import Form from "../../framework/Form.js";
import { default as layout } from './RegisterForm.hbs?raw';
import { Field } from "../index.js";
import Component from "../../framework/Component.js";
import {REGISTER_FORM_CONFIG} from "../../utils/constants.js";

export class RegisterForm extends Form {
	constructor({onPageChange}) {
		super({
			Fields: REGISTER_FORM_CONFIG.map(({block, label, inputAttributs}) => {
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
					class: 'button'
				},
				content: 'Зарегистрироваться'
			}),
			Link: new Component({
				tag: 'a',
				attr: {
					href: '/sing-in',
					class: 'auth-form__link'
				},
				content: 'Войти',
				events: {
					click: event => {
						event.preventDefault();

						onPageChange('/sing-in');
					}
				}
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
							onPageChange('/');
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
		const { repeat_password, password } = this.getFormData();

		if(name === 'repeat_password' && value && repeat_password !== password ) {
			input.setCustomValidity('Пароли не совпадают');
		} else if(name === 'repeat_password') {
			input.setCustomValidity('');
		}
	}
}
