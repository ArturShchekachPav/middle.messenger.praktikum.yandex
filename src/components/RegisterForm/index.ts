import Form from "../../framework/Form.js";
import {default as layout} from './RegisterForm.hbs?raw';
import {Field} from "../index.js";
import Component from "../../framework/Component.js";
import {REGISTER_FORM_CONFIG} from "../../utils/constants.js";
import Controller from "../../controllers";

export class RegisterForm extends Form {
	constructor() {
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
					click: (event: MouseEvent) => {
						event.preventDefault();

						this.controller.emit('changePage', '/sing-in');
					}
				}
			})
		});

		this.controller = new Controller();

		this.validateInput = this.validateInput.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						formData => {
							this.controller.emit('register', formData);
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

	validateInput(input: HTMLInputElement, errorMessage: Component) {
		this.validateConfirmPassword(input);

		super.validateInput(input, errorMessage);
	}

	validateConfirmPassword(input: HTMLInputElement) {
		const {value, name} = input;
		const {repeat_password, password} = this.getFormData();

		if (name === 'repeat_password' && value && repeat_password !== password) {
			input.setCustomValidity('Пароли не совпадают');
		} else if (name === 'repeat_password') {
			input.setCustomValidity('');
		}
	}
}
