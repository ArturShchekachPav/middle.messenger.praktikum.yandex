import Block from "../../framework/Block";
import {default as layout} from './ErrorMessage.hbs?raw';

export class ErrorMessage extends Block {
	constructor({text}) {
		super({
			text
		});
	}

	setText(text) {
		this.getContent().textContent = text;
	}

	render() {
		return layout;
	}
}
