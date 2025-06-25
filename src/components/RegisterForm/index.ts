import Form from '../../framework/Form.js';
import {default as template} from './template.hbs?raw';
import {ErrorMessage, Field} from '../index.js';
import Component from '../../framework/Component.js';
import {REGISTER_FORM_CONFIG} from '../../utils/constants.js';
import Actions from '../../actions';
import Router from "../../router/Router";

const formErrorMessage = new ErrorMessage({
	text: '',
	isHide: true,
});

formErrorMessage.setAttributes({
	style: 'text-align: center; width: 100%; margin-top: 12px;'
});

export default class RegisterForm extends Form {
	private actions: Actions = new Actions();
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
								formErrorMessage.reset();

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
			FormErrorMessage: formErrorMessage
		});

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
								this.actions.auth.signUp(formData)
									.then(() => {
										return this.actions.getUserAndChats();
									})
									.catch(({reason}) => {
										if(typeof reason === 'string') {
											formErrorMessage.enable(reason);
										}
									});
						},
						() => {
						}
					);
				},
			},
		});
	}

	render() {
		return template;
	}

	validateInput(input: HTMLInputElement, errorMessage: ErrorMessage) {
		this.setValidationsMessages(input);

		super.validateInput(input, errorMessage);
	}

	setValidationsMessages(input: HTMLInputElement) {
		const {value, name} = input;
		const {repeat_password, password} = this.getFormData();

		if(input.validity.patternMismatch && input.title) {
			input.setCustomValidity(input.title);
		} else if (name === 'repeat_password' && value && repeat_password !== password) {
			input.setCustomValidity('Пароли не совпадают');
		} else {
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
