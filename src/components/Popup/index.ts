import Block from "../../framework/Block.js";
import {default as layout} from './Popup.hbs?raw';

export class Popup extends Block {
	constructor({content, isOpen}: { content: any, isOpen: boolean }) {
		super({
			isOpen,
			content,
			events: {
				click: ({currentTarget, target}: MouseEvent): void => {
					if (currentTarget === target) {
						this.close();
					}
				}
			}
		});

		this.escapeClose = this.escapeClose.bind(this);
	}

	render() {
		return layout;
	}

	open() {
		this.setProps({isOpen: true});

		document.addEventListener('keydown', this.escapeClose);
	}

	close() {
		this.setProps({isOpen: false});

		document.removeEventListener('keydown', this.escapeClose);
	}

	private escapeClose(e: KeyboardEvent): void {
		if (e.key === 'Escape') {
			this.close();
		}
	}
}
