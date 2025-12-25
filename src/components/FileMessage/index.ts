import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block/Block';
import { FileMessageType } from '../../utils/types';

export class FileMessage extends Block {
	constructor({ message }: { message: FileMessageType }) {
		super({
			...message,
			status: message.isOwn ? 'send' : '',
		});
	}

	render() {
		return template;
	}
}
