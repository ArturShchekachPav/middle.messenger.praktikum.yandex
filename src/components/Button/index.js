import './Button.scss';
import { default as layout } from './Button.hbs?raw';
import Block from "../../framework/Block.js";

export class Button extends Block {
	constructor({text}) {
		super({
			text
		});
	}

	render() {
		return layout;
	}
}

