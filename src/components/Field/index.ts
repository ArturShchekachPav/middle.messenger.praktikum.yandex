import { default as layout } from './Field.hbs?raw';
import Block from "../../framework/Block.js";
import Component from "../../framework/Component";

export class Field extends Block {
	constructor({block, label, id, ErrorMessage, Input}: {
		block: string,
		label: string,
		id: string,
		ErrorMessage: Component,
		Input: Component
	}) {
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

