import Form from '../../framework/Form.js';
import {default as layout} from './RegisterForm.hbs?raw';
import {ErrorMessage, Field} from '../index.js';
import Component from '../../framework/Component.js';
import {REGISTER_FORM_CONFIG} from '../../utils/constants.js';
import Actions from '../../actions';
import Router from "../../router/Router";

export class RegisterForm extends Form {
	private controller: Actions = new Actions();
	private router: Router = new Router();

	constructor() {
		super({
			Fields: REGISTER_FORM_CONFIG.map(({block, label, inputAttributs}) => {
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
			}),
			Button: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'button',
				},
				content: 'Зарегистрироваться',
			}),
			Link: new Component({
				tag: 'a',
				attr: {
					href: '/',
					class: 'auth-form__link',
				},
				content: 'Войти',
				events: {
					click: (event: MouseEvent) => {
						event.preventDefault();

						this.router.go('/');
					},
				},
			}),
		});

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
							this.controller.emit('register', formData);
						},
						() => {
						}
					);
				},
			},
		});
	}

	render() {
		return layout;
	}

	validateInput(input: HTMLInputElement, errorMessage: ErrorMessage) {
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

	checkFormValidity() {
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

		return super.checkFormValidity();
	}
}
