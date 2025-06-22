import Form from '../../framework/Form';
import {default as template} from './template.hbs?raw';
import {ErrorMessage, Field} from '../index';
import Component from '../../framework/Component';
import {EDIT_PROFILE_FORM_CONFIG} from '../../utils/constants';
import Actions from '../../actions';
import withCurrentUser from "../../HOC/withCurrentUser";
import {CurrentUserType} from "../../utils/types";

class EditProfileForm extends Form {
	private actions: Actions = new Actions();

	constructor({currentUser}: { currentUser: CurrentUserType }) {
		if(!currentUser) {
			return;
		}

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
								value: currentUser[inputAttributs.name],
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
							this.actions.users.changeUserProfile(formData)
								.then(() => {
									this.read();
									this.actions.emit('showProfileActions');
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

		this.read();

		this.actions.on('enableEditProfileForm', this.edit);
		this.actions.on('disableEditProfileForm', this.read);
		this.actions.on('hideEditProfileForm', this.hide);
		this.actions.on('showEditProfileForm', this.show);
	}

	render() {
		return template;
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

export default withCurrentUser(EditProfileForm);
