import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import {Message} from '../index.js';
import {MessageType} from '../../utils/types';
import withMessages from '../../HOC/withMessages';

class ChatMessages extends Block {
	constructor({messages}: {messages: MessageType[]}) {
		super({
			messages: messages.map(message => new Message({message: message})),
		});
	}

	render() {
		return template;
	}
}

export default withMessages(ChatMessages);