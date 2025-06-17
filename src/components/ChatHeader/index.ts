import {default as layout} from './ChatHeader.hbs?raw';
import Block from '../../framework/Block.js';
import {ChatActionsMenu} from '../index.js';
import Component from '../../framework/Component.js';
import Controller from '../../actions';

export class ChatHeader extends Block {
	private controller: Controller;

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

						this.controller.emit('openChatActionsMenu');
					},
				},
			}),
		});

		this.controller = new Controller();
	}

	render() {
		return layout;
	}
}
