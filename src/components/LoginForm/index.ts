import Form from '../../framework/Form.js';
import {default as layout} from './LoginForm.hbs?raw';
import {ErrorMessage, Field} from '../index.js';
import Component from '../../framework/Component.js';
import {LOGIN_FORM_CONFIG} from '../../utils/constants.js';
import Controller from '../../controllers';

export class LoginForm extends Form {
	private controller: Controller;

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

						this.controller.emit('changePage', '/sing-up');
					},
				},
			}),
		});

		this.validateInput = this.validateInput.bind(this);

		this.controller = new Controller();

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
							this.controller.emit('login', formData);
						},
						() => {
							this.lists.Fields.forEach(
								({children: {ErrorMessage, Input}}) => {
									this.validateInput(Input.getContent(), ErrorMessage);
								}
							);
						}
					);
				},
			},
		});
	}

	render() {
		return layout;
	}
}
