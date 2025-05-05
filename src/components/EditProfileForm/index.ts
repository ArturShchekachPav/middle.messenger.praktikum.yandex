import Form from "../../framework/Form";
import { default as layout } from './EditProfileForm.hbs?raw';
import { Field } from "../index";
import Component from "../../framework/Component";
import {EDIT_PROFILE_FORM_CONFIG} from "../../utils/constants";

export class EditProfileForm extends Form {
	constructor({
		defaultValues,
		isEdit,
		isHide,
		onChangeProfileData
	}: {
		defaultValues: Record<string, unknown>,
		isEdit: boolean,
		isHide: boolean,
		onChangeProfileData: () => void
	}) {
		super({
			Fields: EDIT_PROFILE_FORM_CONFIG.map(({block, label, inputAttributs}) => {
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
							value: defaultValues[inputAttributs.name]
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
					class: 'button profile__form-button'
				},
				content: 'Cохранить'
			})
		});

		this.validateInput = this.validateInput.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						formData => {
							console.log(formData);
							onChangeProfileData()
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

		if(isHide) {
			this.hide();
		}

		if(isEdit) {
			this.edit();
		} else {
			this.read();
		}
	}

	render() {
		return layout;
	}

	edit() {
		this.lists.Fields.forEach(({children: {Input}}) => Input.removeAttributes(['disabled']));
		this.children.Button.show();
	}

	read() {
		this.lists.Fields.forEach(({children: {Input}}) => Input.setAttributes({disabled : true}));
		this.children.Button.hide();
	}
}
