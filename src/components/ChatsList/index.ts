import Block from '../../framework/Block';
import { default as template } from './template.hbs?raw';
import { ChatType } from '../../utils/types';
import withChats from '../../HOC/withChats';
import { ChatPreview } from '../ChatPreview';

class ChatsList extends Block {
	constructor({ chats }: { chats: ChatType[] }) {
		super({
			Chats: chats.map((chat) => new ChatPreview(chat)),
		});
	}

	setProps({ chats }: { chats: ChatType[] }) {
		super.setProps({
			Chats: chats.map((chat) => new ChatPreview(chat)),
		});
	}

	render() {
		return template;
	}
}

export default withChats(ChatsList);
