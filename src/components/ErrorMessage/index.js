import Block from "../../framework/Block.js";
import { default as layout } from './ErrorMessage.hbs?raw';

export class ErrorMessage extends Block {
	constructor({content}) {
		super({
			content
		});
	}

	render() {
		return layout;
	}
}

