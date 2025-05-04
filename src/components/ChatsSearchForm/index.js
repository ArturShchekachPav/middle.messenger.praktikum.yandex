import { default as layout } from './ChatsSearchForm.hbs?raw';
import Block from "../../framework/Block.js";
import Component from "../../framework/Component.js";

export class ChatsSearchForm extends Block {
	constructor({onChange}) {
		super({
			SearchInput: new Component({
				tag: 'input',
				events: {
					input: onChange
				},
				attr: {
					class: "messanger__search-input",
					name: "search",
					placeholder: " ",
					type: "text"
				}
			})
		});
	}

	render() {
		return layout;
	}
}
