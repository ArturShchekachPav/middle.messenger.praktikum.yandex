import Block from './Block';
import {BlockPropsWithChildren} from '../utils/types';

export default class Component extends Block {
	constructor(props: BlockPropsWithChildren) {
		super(props);
	}

	protected render() {
		return '<{{{tag}}}>{{{content}}}</{{{tag}}}>';
	}
}
