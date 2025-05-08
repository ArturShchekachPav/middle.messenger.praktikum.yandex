import {default as layout} from './ChatHeader.hbs?raw';
import Block from "../../framework/Block.js";
import {Menu, MenuItem} from "../index.js";
import Component from "../../framework/Component.js";

export class ChatHeader extends Block {
	constructor({name, avatarSrc, onAddUserButtonClick, onRemoveUserButtonClick}: {
		name: string,
		avatarSrc: string,
		onAddUserButtonClick: () => void,
		onRemoveUserButtonClick: () => void
	}) {
		super({
			name,
			avatarSrc,
			Menu: new Menu({
				content: [
					new MenuItem({
						text: 'Добавить пользователя',
						icon: '/add-icon.svg',
						events: {
							click: () => {
								if (this.children.Menu instanceof Menu) {
									this.children.Menu.close();
								}

								onAddUserButtonClick();
							}
						}
					}),
					new MenuItem({
						text: 'Удалить пользователя',
						icon: '/delete-icon.svg',
						events: {
							click: () => {
								if (this.children.Menu instanceof Menu) {
									this.children.Menu.close();
								}

								onRemoveUserButtonClick();
							}
						}
					})
				],
				isOpen: false,
				addClass: 'chat-window__menu chat-window__menu_header'
			}),
			OptionsButton: new Component({
				tag: 'button',
				attr: {
					class: "chat-window__options-button"
				},
				events: {
					click: (e: MouseEvent) => {
						e.stopPropagation();

						if (this.children.Menu instanceof Menu) {
							this.children.Menu.open();
						}
					}
				}
			})
		});
	}

	render() {
		return layout;
	}
}
