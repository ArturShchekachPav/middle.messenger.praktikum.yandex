import Block from './Block';

export default class Component extends Block {
	constructor(props: Record<string, unknown>) {
		super(props);
	}

	protected render() {
		return '<{{{tag}}}>{{{content}}}</{{{tag}}}>';
	}
}
