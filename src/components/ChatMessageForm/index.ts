import { default as layout } from './ChatMessageForm.hbs?raw';
import { Menu, MenuItem } from "../index.js"
import Component from "../../framework/Component.js";
import Form from "../../framework/Form.js";

export class ChatMessageForm extends Form {
	constructor({onAddMediaButtonClick, onAddFileButtonClick}: Record<string, () => void>) {
		super({
			Menu: new Menu({
				content: [
					new MenuItem({
						text: 'Фото или Видео',
						icon: '/media-icon.svg',
						events: {
							click: () => {
								this.children.Menu.close()
								onAddMediaButtonClick();
							}
						},
					}),
					new MenuItem({
						text: 'Файл',
						icon: '/file-menu-icon.svg',
						events: {
							click: () => {
								this.children.Menu.close()
								onAddFileButtonClick();
							}
						}
					}),
					new MenuItem({
						text: 'Локация',
						icon: '/location-icon.svg'
					})
				],
				isOpen: false,
				addClass: 'chat-window__menu chat-window__menu_form'
			}),
			AddButton: new Component({
				tag: 'button',
				attr: {
					class: "chat-window__file-button",
					type: "button",
				},
				events: {
					click: (e) => {
						e.stopPropagation();
						this.children.Menu.open()
					}
				}
			}),
			SubmitButton: new Component({
				tag: 'button',
				attr: {
					type:"submit",
					class:"chat-window__submit"
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
				submit: event => {
					this.handleSumbit(
						event,
						formData => {
							console.log(formData);
							this.getContent().reset();
						},
						() => {
							this.validateInput();
						}
					)
				}
			}
		});
	}

	render() {
		return layout;
	}

	validateInput(input, errorMessage) {
		if(this.getContent().checkValidity()) {
			this.children.Input.setAttributes({placeholder: 'Сообщение'});
		} else {
			this.children.Input.setAttributes({placeholder: 'Введите сообщение для его отправки'});
		}
	}
}
