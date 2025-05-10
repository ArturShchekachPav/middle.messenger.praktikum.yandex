import {default as layout} from './ChatsSearchForm.hbs?raw';
import Block from "../../framework/Block.js";
import Component from "../../framework/Component.js";
import Controllers from "../../controllers";

export class ChatsSearchForm extends Block {
	constructor() {
		super({
			SearchInput: new Component({
				tag: 'input',
				events: {
					input: event => {
						this.controller.emit('searchChats', event.target.value.toLowerCase());
					}
				},
				attr: {
					class: "messanger__search-input",
					name: "search",
					placeholder: " ",
					type: "text"
				}
			})
		});

		this.controller = new Controllers();
	}

	render() {
		return layout;
	}
}
