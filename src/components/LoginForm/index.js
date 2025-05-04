import Form from "../../framework/Form.js";
import { default as layout } from './LoginForm.hbs?raw';
import { Field } from "../index.js";
import Component from "../../framework/Component.js";
import {LOGIN_FORM_CONFIG} from "../../utils/constants.js";

export class LoginForm extends Form {
	constructor({onPageChange}) {
		super({
			Fields: LOGIN_FORM_CONFIG.map(({block, label, inputAttributs}) => {
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
				content: 'Войти'
			}),
			Link: new Component({
				tag: 'a',
				attr: {
					href: '/sing-up',
					class: 'auth-form__link'
				},
				content: 'Нет аккаунта',
				events: {
					click: event => {
						event.preventDefault();

						onPageChange('/sing-up');
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
}
