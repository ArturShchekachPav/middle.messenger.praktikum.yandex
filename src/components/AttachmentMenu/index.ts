import {Menu, MenuItem} from '../index';
import Actions from '../../actions';

export class AttachmentMenu extends Menu {
	private actions: Actions = new Actions();

	constructor() {
		super({
			content: [
				new MenuItem({
					text: 'Фото или Видео',
					icon: '/media-icon.svg',
					events: {
						click: () => {
							this.close();

							this.actions.emit('openAddMediaPopup');
						},
					},
				}),
			],
			isOpen: false,
			addClass: 'chat-window__menu chat-window__menu_form',
		});

		this.actions.on('openAttachmentMenu', this.open.bind(this));
	}
}
