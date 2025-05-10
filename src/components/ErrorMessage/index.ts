import Block from '../../framework/Block';
import {default as layout} from './ErrorMessage.hbs?raw';
import {ErrorMessageProps} from '../../utils/types';

export class ErrorMessage extends Block {
	constructor({text, isHide}: ErrorMessageProps) {
		super({
			text,
		});

		if (isHide) {
			this.hide();
		}
	}

	setText(text: string) {
		this.getContent().textContent = text;
	}

	render() {
		return layout;
	}

	reset() {
		this.hide();
		this.setText('');
	}

	enable(text: string) {
		this.show();
		this.setText(text);
	}
}
