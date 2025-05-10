import Block from '../../framework/Block';
import {ChatPreview} from '../ChatPreview';
import Controller from '../../controllers';
import {default as layout} from './ChatsList.hbs?raw';
import {ChatData} from '../../utils/types';

export class ChatsList extends Block {
	private controller: Controller;
	private filter: string;
	private chatsData: ChatData[];

	constructor(chatsData: ChatData[]) {
		super();

		this.filter = '';
		this.chatsData = chatsData;
		this.controller = new Controller();
		this.searchChats = this.searchChats.bind(this);
		this.updateChatList = this.updateChatList.bind(this);

		this.setProps({
			Chats: this.createChats(),
		});

		this.controller.on('searchChats', this.searchChats);
		this.controller.on('updateChatsList', this.updateChatList);
	}

	createChats() {
		return this.chatsData
			.filter(({name}) => name.toLowerCase().includes(this.filter))
			.map(({name, avatar, lastTime, lastMessage, unreadMessagesCount}) => {
				return new ChatPreview({
					name,
					avatar,
					lastTime,
					lastMessage,
					unreadMessagesCount,
				});
			});
	}

	searchChats(searchValue: string) {
		this.filter = searchValue;

		this.setProps({
			Chats: this.createChats(),
		});
	}

	updateChatList(chatsData: ChatData[]) {
		this.chatsData = chatsData;

		this.setProps({
			Chats: this.createChats(),
		});
	}

	override render() {
		return layout;
	}
}
