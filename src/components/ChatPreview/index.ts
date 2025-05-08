import './ChatPreview.scss';
import {default as layout} from './ChatPreview.hbs?raw';
import Block from "../../framework/Block.js";

type ChatPreviewType = {
	unreadMessagesCount: string,
	lastMessage: string,
	lastTime: string,
	name: string,
	avatar: string,
	onClick: () => void
}

export class ChatPreview extends Block {
	constructor({unreadMessagesCount, lastMessage, lastTime, name, avatar, onClick}: ChatPreviewType) {
		super({unreadMessagesCount, lastMessage, lastTime, name, avatar, events: {click: onClick}});
	}

	render() {
		return layout;
	}
}

