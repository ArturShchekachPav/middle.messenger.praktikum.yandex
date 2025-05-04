import Block from "./Block.js";

export default class Component extends Block {
	constructor(props) {
		super(props);
	}

	render() {
		return '<{{{tag}}}>{{{content}}}</{{{tag}}}>';
	}
}
