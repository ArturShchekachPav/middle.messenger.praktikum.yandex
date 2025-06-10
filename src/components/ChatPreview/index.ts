import './ChatPreview.scss';
import {default as layout} from './ChatPreview.hbs?raw';
import Block from '../../framework/Block.js';
import Controllers from '../../controllers';
import {ChatPreviewProps} from '../../utils/types';

export class ChatPreview extends Block {
	private controller: Controllers;

	constructor({
								unreadMessagesCount,
								lastMessage,
								lastTime,
								name,
								avatar,
							}: ChatPreviewProps) {
		super({
			unreadMessagesCount,
			lastMessage,
			lastTime,
			name,
			avatar,
			events: {
				click: () => {
					this.controller.emit('setCurrentChat', {name, avatar});
				},
			},
		});

		this.controller = new Controllers();
	}

	render() {
		return layout;
	}
}
