import {Menu, MenuItem} from "../index";
import Controller from "../../controllers";

export class ChatActionsMenu extends Menu {
	private controller: Controller;

	constructor() {
		super({
			content: [
				new MenuItem({
					text: 'Добавить пользователя',
					icon: '/add-icon.svg',
					events: {
						click: () => {
							this.close();

							this.controller.emit('openAddUserPopup');
						}
					}
				}),
				new MenuItem({
					text: 'Удалить пользователя',
					icon: '/delete-icon.svg',
					events: {
						click: () => {
							this.close();

							this.controller.emit('openRemoveUserPopup');
						}
					}
				})
			],
			isOpen: false,
			addClass: 'chat-window__menu chat-window__menu_header'
		});

		this.controller = new Controller();
		this.controller.on('openChatActionsMenu', this.open.bind(this));
	}
}
