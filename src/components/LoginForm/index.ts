import Form from '../../framework/Form.js';
import {default as template} from './template.hbs?raw';
import {ErrorMessage, Field} from '../index.js';
import Component from '../../framework/Component.js';
import {LOGIN_FORM_CONFIG} from '../../utils/constants.js';
import Actions from '../../actions';
import Router from "../../router/Router";

export class LoginForm extends Form {
	private actions: Actions = new Actions();
	private router: Router = new Router();

	constructor() {
		super({
			Fields: LOGIN_FORM_CONFIG.map(({block, label, inputAttributs}) => {
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
				content: 'Войти',
			}),
			Link: new Component({
				tag: 'a',
				attr: {
					href: '/sing-up',
					class: 'auth-form__link',
				},
				content: 'Нет аккаунта',
				events: {
					click: (event: Event) => {
						event.preventDefault();

						this.router.go('/sing-up')
					},
				},
			}),
		});

		this.validateInput = this.validateInput.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
							this.actions.auth.signIn(formData)
								.then(() => {
									return this.actions.getUserAndChats();
								})
								.catch(console.log);
						},
						() => {
							this.lists.Fields.forEach((field) => {
								if (!(field instanceof Field)) {
									return;
								}

								const {input, errorMessage} = field.getFieldComponents();

								if (!input || !errorMessage) {
									return;
								}

								const inputElement = input.getContent();

								if (inputElement instanceof HTMLInputElement) {
									this.validateInput(inputElement, errorMessage);
								}
							});
						}
					);
				},
			},
		});
	}

	render() {
		return template;
	}

	getValidationMessage(input: HTMLInputElement): string {
		if(input.title) {
			this.setCustomPatternValidationMessage(input, input.title);
		}

		return super.getValidationMessage(input);
	}
}
