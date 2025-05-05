import Block from "./Block";

interface BlockProps {
	[key: string]: any;
}

export default class Component extends Block {
	constructor(props: BlockProps) {
		super(props);
	}

	protected render() {
		return '<{{{tag}}}>{{{content}}}</{{{tag}}}>';
	}
}
