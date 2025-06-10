import Form from '../../framework/Form';
import {default as layout} from './EditProfileForm.hbs?raw';
import {ErrorMessage, Field} from '../index';
import Component from '../../framework/Component';
import {EDIT_PROFILE_FORM_CONFIG} from '../../utils/constants';
import Controller from '../../controllers';

export class EditProfileForm extends Form {
	private controller: Controller;

	constructor({defaultValues}: { defaultValues: Record<string, unknown> }) {
		super({
			Fields: EDIT_PROFILE_FORM_CONFIG.map(
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
								value: defaultValues[inputAttributs.name],
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

		this.edit = this.edit.bind(this);
		this.read = this.read.bind(this);
		this.hide = this.hide.bind(this);
		this.show = this.show.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
							this.controller.emit('editUserData', formData);
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

		this.read();

		this.controller = new Controller();
		this.controller.on('enableEditProfileForm', this.edit);
		this.controller.on('disableEditProfileForm', this.read);
		this.controller.on('hideEditProfileForm', this.hide);
		this.controller.on('showEditProfileForm', this.show);
	}

	render() {
		return layout;
	}

	edit() {
		this.lists.Fields.forEach((field) => {
			if (!(field instanceof Field)) {
				return;
			}

			const {input} = field.getFieldComponents();

			if (!input) {
				return;
			}

			input.removeAttributes(['disabled']);
		});
		this.children.Button.show();
	}

	read() {
		this.lists.Fields.forEach((field) => {
			if (!(field instanceof Field)) {
				return;
			}

			const {input} = field.getFieldComponents();

			if (!input) {
				return;
			}

			input.setAttributes({disabled: true});
		});
		this.children.Button.hide();
	}
}
