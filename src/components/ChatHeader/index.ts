import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import {ChatActionsMenu} from '../index.js';
import Component from '../../framework/Component.js';
import Actions from '../../actions';
import withCurrentChatData from '../../HOC/withCurrentChatData';

class ChatHeader extends Block {
	private actions: Actions = new Actions();

	constructor({name, avatar}: { name: string; avatar: string | null }) {
		super({
			name,
			avatar: avatar ? `https://ya-praktikum.tech/api/v2/resources${avatar}` : 'default-avatar.png',
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

	render() {
		return template;
	}
}

export default withCurrentChatData(ChatHeader);
