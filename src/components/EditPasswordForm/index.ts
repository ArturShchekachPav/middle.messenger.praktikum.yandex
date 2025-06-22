import Form from '../../framework/Form.js';
import {default as template} from './template.hbs?raw';
import {ErrorMessage, Field} from '../index.js';
import Component from '../../framework/Component.js';
import {EDIT_PASSWORD_FORM_CONFIG} from '../../utils/constants.js';
import Actions from '../../actions';

export class EditPasswordForm extends Form {
	private actions: Actions;

	constructor() {
		super({
			Fields: EDIT_PASSWORD_FORM_CONFIG.map(
				({block, label, inputAttributs}) => {
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
				}
			),
			Button: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'button profile__form-button',
				},
				content: 'Cохранить',
			}),
		});

		this.show = this.show.bind(this);
		this.hide = this.hide.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
							this.actions.users.changeUserPassword(formData)
								.then(() => {
									this.actions.emit('showEditProfileForm');
									this.actions.emit('showProfileActions');
									this.actions.emit('hideEditPasswordForm');

									this.reset();
								})
								.catch(console.log);
						},
						() => {
						}
					);
				},
			},
		});

		this.hide();

		this.actions = new Actions();
		this.actions.on('showEditPasswordForm', this.show);
		this.actions.on('hideEditPasswordForm', this.hide);
	}

	render() {
		return template;
	}

	validateInput(input: HTMLInputElement, errorMessage: ErrorMessage) {
		this.validateConfirmPassword(input);

		super.validateInput(input, errorMessage);
	}

	validateConfirmPassword(input: HTMLInputElement) {
		const {value, name} = input;
		const {repeat_password, newPassword} = this.getFormData();

		if (
			name === 'repeat_password' &&
			value &&
			repeat_password !== newPassword
		) {
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

			const {input, errorMessage} = field.getFieldComponents();

			if (!input || !errorMessage) {
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
