import {default as layout} from './ChatMessageForm.hbs?raw';
import {AttachmentMenu} from '../index.js';
import Component from '../../framework/Component.js';
import Form from '../../framework/Form.js';
import Controller from '../../actions';

export class ChatMessageForm extends Form {
	private controller: Controller;

	constructor() {
		super({
			Menu: new AttachmentMenu(),
			AddButton: new Component({
				tag: 'button',
				attr: {
					class: 'chat-window__file-button',
					type: 'button',
				},
				events: {
					click: (e: MouseEvent) => {
						e.stopPropagation();

						this.controller.emit('openAttachmentMenu');
					},
				},
			}),
			SubmitButton: new Component({
				tag: 'button',
				attr: {
					type: 'submit',
					class: 'chat-window__submit',
				},
			}),
			Input: new Component({
				tag: 'input',
				attr: {
					type: 'text',
					required: true,
					class: 'chat-window__message-input',
					name: 'message',
					placeholder: 'Сообщение',
				},
				events: {
					blur: () => {
						this.validateInput();
					},
				},
			}),
		});

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						(formData) => {
							this.controller.emit('sendMessage', formData);
							this.reset();
						},
						() => {
							this.validateInput();
						}
					);
				},
			},
		});

		this.controller = new Controller();
	}

	render() {
		return layout;
	}

	validateInput() {
		if (this.checkFormValidity()) {
			this.children.Input.setAttributes({placeholder: 'Сообщение'});
		} else {
			this.children.Input.setAttributes({
				placeholder: 'Введите сообщение для его отправки',
			});
		}
	}
}
