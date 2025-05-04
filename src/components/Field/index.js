import { default as layout } from './Field.hbs?raw';
import Block from "../../framework/Block.js";

export class Field extends Block {
	constructor({block, label, id, ErrorMessage, Input}) {
		super({
			block,
			id: id,
			label,
			ErrorMessage: ErrorMessage,
			Input: Input,
		});
	}

	render() {
		return layout;
	}
}

