import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import Component from '../../framework/Component.js';
import Actions from '../../actions';

export class ChatsSearchForm extends Block {
	private actions: Actions = new Actions();

	constructor() {
		super({
			SearchInput: new Component({
				tag: 'input',
				events: {
					input: (event: InputEvent) => {
						this.actions.chats.getChats
					},
				},
				attr: {
					class: 'messanger__search-input',
					name: 'search',
					placeholder: ' ',
					type: 'text',
				},
			}),
		});
	}

	render() {
		return template;
	}
}
