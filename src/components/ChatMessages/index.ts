import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import {TextMessage} from '../index.js';
import {MessageType} from '../../utils/types';
import withMessages from '../../HOC/withMessages';
import {FileMessage} from "../FileMessage";

class ChatMessages extends Block {
	constructor({messages}: {messages: MessageType[]}) {
		super({
			messagesCount: messages.length,
			messages: messages.map(message => {
				switch (message.type) {
					case 'file': {
						return new FileMessage({message});
					}
					case 'message': {
						return new TextMessage({message});
					}
				}
			}),
		});
	}

	render() {
		return template;
	}
}

export default withMessages(ChatMessages);
