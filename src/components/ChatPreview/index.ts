import './ChatPreview.scss';
import {default as layout} from './ChatPreview.hbs?raw';
import Block from "../../framework/Block.js";
import Controllers from "../../controllers";

type ChatPreviewType = {
	unreadMessagesCount: string,
	lastMessage: string,
	lastTime: string,
	name: string,
	avatar: string
}

export class ChatPreview extends Block {
	constructor({unreadMessagesCount, lastMessage, lastTime, name, avatar}: ChatPreviewType) {
		super({
			unreadMessagesCount,
			lastMessage,
			lastTime,
			name,
			avatar,
			events: {
				click: () => {
					this.controller.emit('setCurrentChat', {name, avatar});
				}
			}
		});

		this.controller = new Controllers();
	}

	render() {
		return layout;
	}
}

