import './styles.scss';
import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block/Block';
import { ChatType } from '../../utils/types';
import Actions from '../../actions';
import { formatDate } from '../../utils/utils';

export class ChatPreview extends Block {
	private actions: Actions = new Actions();

	constructor(chat: ChatType) {
		const state = new Actions().getAppState().currentUser;

		if (!state) {
			return;
		}

		super({
			unreadMessagesCount: chat.unread_count,
			lastMessageAuthor: chat.last_message
				? chat.last_message.user.first_name
				: null,
			lastMessage: chat.last_message
				? chat.last_message.content
				: 'Нет сообщений',
			lastTime: chat.last_message
				? formatDate(new Date(chat.last_message.time), true)
				: '',
			name: chat.title,
			avatar: chat.avatar
				? `https://ya-praktikum.tech/api/v2/resources${chat.avatar}`
				: 'default-avatar.png',
			events: {
				click: () => {
					this.actions.setCurrentChat(chat).catch(console.log);
				},
			},
		});
	}

	render() {
		return template;
	}
}
