import Block from '../../framework/Block';
import { default as template } from './template.hbs?raw';
import { ProfileActionButtonProps } from '../../utils/types';

export class ProfileActionButton extends Block {
	constructor({ content, type, onClick }: ProfileActionButtonProps) {
		super({
			content,
			type,
			events: {
				click: onClick,
			},
		});
	}

	render() {
		return template;
	}
}
