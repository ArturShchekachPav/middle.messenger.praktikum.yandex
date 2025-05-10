import Block from "../../framework/Block";
import {ChatPreview} from "../ChatPreview";
import Controller from "../../controllers";
import {default as layout} from './ChatsList.hbs?raw';

export class ChatsList extends Block {
	constructor(chatsData) {
		super();

		this.filter = '';
		this.chatsData = chatsData;
		this.controller = new Controller();
		this.searchChats = this.searchChats.bind(this);
		this.updateChatList = this.updateChatList.bind(this);

		this.setProps({
			Chats: this.createChats()
		})

		this.controller.on('searchChats', this.searchChats);
		this.controller.on('updateChatsList', this.updateChatList);
	}

	createChats() {
		return this.chatsData.filter(({name}) => name.toLowerCase().includes(this.filter)).map(({name, avatar, lastTime, lastMessage, unreadMessagesCount}) => {
				return new ChatPreview({
					name: name,
					avatar: avatar,
					lastTime: lastTime,
					lastMessage: lastMessage,
					unreadMessagesCount: unreadMessagesCount
				});
			}
		);
	}

	searchChats(searchValue) {
		this.filter = searchValue;

		this.setProps({
			Chats: this.createChats()
		})
	}

	updateChatList(chatsData) {
		this.chatsData = chatsData;

		this.setProps({
			Chats: this.createChats()
		})
	}

	override render() {
		return layout;
	}
}
