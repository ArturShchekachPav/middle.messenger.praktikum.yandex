import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import {TextMessage} from '../index.js';
import {MessageType} from '../../utils/types';
import withMessages from '../../HOC/withMessages';
import {FileMessage} from "../FileMessage";
import {addDatesInMessages, checkPosition, throttle} from "../../utils/utils";
import Component from "../../framework/Component";

class ChatMessages extends Block {
	constructor() {
		super({
			events: {
				scroll: throttle(checkPosition, 500)
			}
		});
	}

	setProps({messages}: {messages: MessageType[]}) {

		if(messages) {
			super.setProps({
				messagesCount: messages.length,
				messages: addDatesInMessages(messages).map(message => {
					switch (message.type) {
						case 'date': {
							return new Component({
								tag: 'p',
								attr: {
									class: 'chat__date',
								},
								content: message.content,
							});
						}
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
	}

	render() {
		return template;
	}
}

export default withMessages(ChatMessages);
