import { default as template } from './template.hbs?raw';
import Form from '../../framework/Form';
import Component from '../../framework/Component.js';
import Actions from '../../actions';

export class ChatsSearchForm extends Form {
	private actions: Actions = new Actions();

	constructor() {
		super({
			SearchInput: new Component({
				tag: 'input',
				events: {
					input: (event: InputEvent) => {
						if (event.target instanceof HTMLInputElement) {
							this.actions.chats
								.searchChats(event.target.value)
								.catch(console.log);
						}
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

		this.reset = this.reset.bind(this);
		this.actions.on('clearSearchForm', this.reset);
	}

	render() {
		return template;
	}
}
