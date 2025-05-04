import './ChatPreview.scss';
import { default as layout } from './ChatPreview.hbs?raw';
import Block from "../../framework/Block.js";

export class ChatPreview extends Block {
	constructor({unreadMessagesCount, lastMessage, lastTime, name, avatar, onClick}) {
		super({unreadMessagesCount, lastMessage, lastTime, name, avatar, events: {click: onClick}});
	}

	render() {
		return layout;
	}
}

