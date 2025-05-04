import Form from "../../framework/Form.js";
import { default as layout } from './EditProfileForm.hbs?raw';
import { Field } from "../index.js";
import Component from "../../framework/Component.js";
import {EDIT_PROFILE_FORM_CONFIG} from "../../utils/constants.js";

export class EditProfileForm extends Form {
	constructor({
		defaultValues,
		isEdit,
		isHide,
		onChangeProfileData
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

				inputAttributs.value = defaultValues[inputAttributs.name];

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
					class: 'button profile__form-button'
				},
				content: 'Cохранить'
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
							onChangeProfileData()
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
