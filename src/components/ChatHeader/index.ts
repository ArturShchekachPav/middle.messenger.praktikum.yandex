import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import {ChatActionsMenu} from '../index.js';
import Component from '../../framework/Component.js';
import Actions from '../../actions';

export class ChatHeader extends Block {
	private actions: Actions = new Actions();

	constructor({name, avatarSrc}: { name: string; avatarSrc: string }) {
		super({
			name,
			avatarSrc,
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
