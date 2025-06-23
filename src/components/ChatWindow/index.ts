import Block from '../../framework/Block';
import Component from '../../framework/Component';
import {ChatHeader, ChatMessageForm, ChatMessages} from '../index';
import {default as template} from './template.hbs?raw';
import withCurrentChat from "../../HOC/withCurrentChat";
import Actions from "../../actions";
import {MessagesSocketProps} from "../../utils/types";

class ChatWindow extends Block {
	private actions: Actions = new Actions();

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

	setProps({currentChat}: {currentChat: null | MessagesSocketProps}) {
		if(currentChat) {
			this.actions.messages.startConnection(currentChat as MessagesSocketProps)

			super.setProps({
				content: [
					new ChatHeader(),
					new ChatMessages(),
					new ChatMessageForm(),
				]
			});
		}
	};

	render() {
		return template;
	}
}

export default withCurrentChat(ChatWindow);
