import './styles.scss';
import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block.js';
import { TextMessageType } from '../../utils/types';

export class TextMessage extends Block {
	constructor({ message }: { message: TextMessageType }) {
		super({
			...message,
			status: message.isOwn ? 'send' : '',
		});
	}

	render() {
		return template;
	}
}
