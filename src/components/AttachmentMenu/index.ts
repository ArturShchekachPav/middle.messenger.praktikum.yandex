import {Menu, MenuItem} from "../index";
import Controller from "../../controllers";

export class AttachmentMenu extends Menu {
	private controller: Controller;

	constructor() {
		super({
			content: [
				new MenuItem({
					text: 'Фото или Видео',
					icon: '/media-icon.svg',
					events: {
						click: () => {
							this.close();

							this.controller.emit('openAddMediaPopup');
						}
					},
				}),
				new MenuItem({
					text: 'Файл',
					icon: '/file-menu-icon.svg',
					events: {
						click: () => {
							this.close();

							this.controller.emit('openAddFilePopup');
						}
					}
				}),
				new MenuItem({
					text: 'Локация',
					icon: '/location-icon.svg',
					events: {
						click: () => {
							this.close();
						}
					}
				})
			],
			isOpen: false,
			addClass: 'chat-window__menu chat-window__menu_form'
		});

		this.controller = new Controller();
		this.controller.on('openAttachmentMenu', this.open.bind(this));
	}
}
