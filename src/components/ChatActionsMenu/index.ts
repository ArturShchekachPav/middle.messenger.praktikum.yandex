import {Menu, MenuItem} from '../index';
import Actions from '../../actions';
import withCurrentChatId from "../../HOC/withCurrentChatId";

class ChatActionsMenu extends Menu {
	private actions: Actions = new Actions();

	constructor() {
		super({
			content: [
				new MenuItem({
					text: 'Добавить пользователя',
					icon: '/add-icon.svg',
					events: {
						click: () => {
							this.close();

							this.actions.emit('openAddUserPopup');
						},
					},
				}),
				new MenuItem({
					text: 'Удалить пользователя',
					icon: '/delete-icon.svg',
					events: {
						click: () => {
							this.close();

							this.actions.emit('openRemoveUserPopup');
						},
					},
				}),
				new MenuItem({
					text: 'Удалить чат',
					icon: '/delete-icon.svg',
					events: {
						click: () => {
							const chatId = this.actions.getAppState().currentChat?.id;

							if(chatId) {
								this.actions.chats.deleteChat(chatId);
							}

							this.close();
						},
					},
				}),
			],
			isOpen: false,
			addClass: 'chat-window__menu chat-window__menu_header',
		});

		this.actions.on('openChatActionsMenu', this.open.bind(this));
	}
}

export default withCurrentChatId(ChatActionsMenu);
