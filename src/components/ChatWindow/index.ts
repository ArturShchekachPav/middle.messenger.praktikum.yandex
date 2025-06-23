import Block from '../../framework/Block';
import Component from '../../framework/Component';
import {ChatHeader, ChatMessageForm, ChatMessages} from '../index';
import {default as template} from './template.hbs?raw';
import withIsHaveCurrentChat from '../../HOC/withIsHaveCurrentChat';

class ChatWindow extends Block {
	constructor() {
		super({
			content: [
				new Component({
					tag: 'p',
					attr: {
						class: 'chat-window__default-message',
					},
					content: 'Выберите чат чтобы отправить сообщение',
				}),
			],
		});
	}

	setProps() {
		super.setProps({
			content: [
				new ChatHeader(),
				new ChatMessages(),
				new ChatMessageForm(),
			]
		});
	};

	render() {
		return template;
	}
}

export default withIsHaveCurrentChat(ChatWindow);
