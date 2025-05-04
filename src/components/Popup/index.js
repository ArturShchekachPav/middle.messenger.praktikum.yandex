import Block from "../../framework/Block.js";
import { default as layout } from './Popup.hbs?raw';

export class Popup extends Block {
	constructor({content, isOpen}) {
		super({
			isOpen,
			content,
			events: {
				click: ({currentTarget, target}) => {
					if(currentTarget === target) {
						this.close();
					}
				}
			}
		});

		this._handleEscClose = this._escapeClose.bind(this);
	}

	render() {
		return layout;
	}

	open() {
		this.setProps({isOpen: true});

		document.addEventListener('keydown', this._handleEscClose);
	}

	close() {
		this.setProps({isOpen: false});

		document.removeEventListener('keydown', this._handleEscClose);
	}

	_escapeClose(e) {
		if (e.key === 'Escape') {
			this.close();
		}
	}
}
