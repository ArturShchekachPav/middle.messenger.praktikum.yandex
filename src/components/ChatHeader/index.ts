import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block';
import { ChatActionsMenu } from '../index';
import Component from '../../framework/Component';
import Actions from '../../actions';
import withCurrentChatData from '../../HOC/withCurrentChatData';

class ChatHeader extends Block {
	private actions: Actions = new Actions();

	constructor() {
		super();
	}

	setProps({ name, avatar }: { name: string; avatar: string | null }) {
		if (name) {
			super.setProps({
				name,
				avatar: new Component({
					tag: 'img',
					attr: {
						src: avatar
							? `https://ya-praktikum.tech/api/v2/resources${avatar}`
							: 'default-avatar.png',
						class: 'chat-window__avatar',
						alt: 'avatar-chat',
					},
					events: {
						click: () => {
							this.actions.emit('openEditChatAvatarPopup');
						},
					},
				}),
				Menu: new ChatActionsMenu(),
				OptionsButton: new Component({
					tag: 'button',
					attr: {
						class: 'chat-window__options-button',
					},
					events: {
						click: (e: MouseEvent) => {
							e.stopPropagation();

							this.actions.emit('openChatActionsMenu');
						},
					},
				}),
			});
		}
	}

	render() {
		return template;
	}
}

export default withCurrentChatData(ChatHeader);
