import {default as layout} from './ChatMessageForm.hbs?raw';
import {AttachmentMenu} from "../index.js"
import Component from "../../framework/Component.js";
import Form from "../../framework/Form.js";
import Controller from "../../controllers";

export class ChatMessageForm extends Form {
	constructor() {
		super({
			Menu: new AttachmentMenu(),
			AddButton: new Component({
				tag: 'button',
				attr: {
					class: "chat-window__file-button",
					type: "button",
				},
				events: {
					click: (e: MouseEvent) => {
						e.stopPropagation();

						this.controller.emit('openAttachmentMenu');
					}
				}
			}),
			SubmitButton: new Component({
				tag: 'button',
				attr: {
					type: "submit",
					class: "chat-window__submit"
				}
			}),
			Input: new Component({
				tag: 'input',
				attr: {
					type: 'text',
					required: true,
					class: 'chat-window__message-input',
					name: 'message',
					placeholder: 'Сообщение'
				},
				events: {
					blur: () => {
						this.validateInput();
					}
				}
			})
		});

		this.validateInput = this.validateInput.bind(this);

		this.setProps({
			events: {
				submit: (event: SubmitEvent) => {
					this.handleSumbit(
						event,
						formData => {
							this.controller.emit('sendMessage', formData)
							this.reset();
						},
						() => {
							this.validateInput();
						}
					)
				}
			}
		});

		this.controller = new Controller();
	}

	render() {
		return layout;
	}

	validateInput() {
		if ((this.getContent() as HTMLFormElement).checkValidity()) {
			if (this.children.Input instanceof Component) {
				this.children.Input.setAttributes({placeholder: 'Сообщение'});
			}
		} else {
			this.children.Input.setAttributes({placeholder: 'Введите сообщение для его отправки'});
		}
	}
}
