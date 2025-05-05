import './Message.scss';
import { default as layout } from './Message.hbs?raw';
import Block from "../../framework/Block.js";

export class Message extends Block {
	constructor({src, addictedClass, source, status, time, text}: Record<string, string>) {
		super({src, addictedClass, source, status, time, text});
	}

	render() {
		return layout;
	}
}


