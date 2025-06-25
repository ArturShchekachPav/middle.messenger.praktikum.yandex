import Block from '../../framework/Block.js';
import { default as template } from './template.hbs?raw';
import { PopupProps } from '../../utils/types';

export class Popup extends Block {
	constructor({ content, isOpen }: PopupProps) {
		super({
			isOpen,
			content,
			events: {
				click: ({ currentTarget, target }: MouseEvent): void => {
					if (currentTarget === target) {
						this.close();
					}
				},
			},
		});

		this.escapeClose = this.escapeClose.bind(this);
	}

	render() {
		return template;
	}

	open() {
		this.setProps({ isOpen: true });

		document.addEventListener('keydown', this.escapeClose);
	}

	close() {
		this.setProps({ isOpen: false });

		document.removeEventListener('keydown', this.escapeClose);
	}

	private escapeClose(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			this.close();
		}
	}
}
