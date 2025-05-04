import { default as layout } from './Link.hbs?raw';
import Block from "../../framework/Block.js";

export class Link extends Block {
	constructor(props) {
		super(props);
	}

	render() {
		return layout;
	}
}

