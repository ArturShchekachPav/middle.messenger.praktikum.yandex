import Form from '../../framework/Form.js';
import { default as template } from './template.hbs?raw';
import { ErrorMessage, Field, UsersList } from '../index.js';
import Component from '../../framework/Component.js';
import { UserActionFormProps } from '../../utils/types';

export class UserActionForm extends Form {
	constructor({
		name,
		title,
		onSubmit,
		onInput,
		Users,
		fieldsConfig,
	}: UserActionFormProps) {
		super({
			name,
			title,
			Fields: fieldsConfig.map(({ block, label, inputAttributs }) => {
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
							input: (event: InputEvent) => {
								const input = event.target;

								if (!(input instanceof HTMLInputElement)) {
									return;
								}

								onInput(input.value);
							},
							blur: (event: InputEvent) => {
								const input = event.target as HTMLInputElement;

								this.validateInput(input, errorMessage);
							},
						},
					}),
				});
			}),
			Users,
		});

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(event, onSubmit, () => {
						this.lists.Fields.forEach((field) => {
							if (!(field instanceof Field)) {
								return;
							}

							const { errorMessage, input } = field.getFieldComponents();

							if (!errorMessage || !input) {
								return;
							}

							const inputElement = input.getContent();

							if (inputElement instanceof HTMLInputElement) {
								this.validateInput(inputElement, errorMessage);
							}
						});
					});
				},
			},
		});
	}

	render() {
		return template;
	}

	reset() {
		this.lists.Fields.forEach((field) => {
			if (!(field instanceof Field)) {
				return;
			}

			const { errorMessage } = field.getFieldComponents();

			if (errorMessage) {
				errorMessage.reset();
			}
		});

		const users = this.children.Users;

		if (users instanceof UsersList) {
			users.setProps({ users: [], onClick: () => {} });
		}

		super.reset();
	}
}
