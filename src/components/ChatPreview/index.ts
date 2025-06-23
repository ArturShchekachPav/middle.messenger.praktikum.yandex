import './styles.scss';
import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import {ChatType} from '../../utils/types';
import Actions from '../../actions';

export class ChatPreview extends Block {
	private actions: Actions = new Actions();

	constructor(chat: ChatType) {
		super({
			unreadMessagesCount: chat.unread_count,
			lastMessage: chat.last_message ? chat.last_message.content : 'Нет сообщений',
			lastTime: chat.last_message ? chat.last_message.time : '',
			name: chat.title,
			avatar: chat.avatar ? `https://ya-praktikum.tech/api/v2/resources${chat.avatar}` : 'default-avatar.png',
			events: {
				click: () => {
					this.actions.setCurrentChat(chat)
						.catch(console.log);
				},
			},
		});
	}

	render() {
		return template;
	}
}
