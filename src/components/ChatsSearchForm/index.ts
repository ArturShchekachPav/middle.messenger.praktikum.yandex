import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import Component from '../../framework/Component.js';
import Actionss from '../../actions';

export class ChatsSearchForm extends Block {
	private actions: Actionss;

	constructor() {
		super({
			SearchInput: new Component({
				tag: 'input',
				events: {
					input: (event: InputEvent) => {
						this.actions.emit(
							'searchChats',
							(event.target as HTMLInputElement).value.toLowerCase()
						);
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

		this.actions = new Actionss();
	}

	render() {
		return template;
	}
}
