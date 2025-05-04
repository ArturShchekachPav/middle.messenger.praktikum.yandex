import Block from "../../framework/Block.js";
import { default as layout } from './Menu.hbs?raw';

export class Menu extends Block {
	constructor({content, isOpen, addClass}) {
		super({
			content,
			isOpen,
			addClass
		});

		this._onOutsideClickClose = this._onOutsideClickClose.bind(this);
		this._escapeClose = this._escapeClose.bind(this);
	}

	render() {
		return layout;
	}

	open() {
		this.setProps({isOpen: true});

		document.addEventListener('keydown', this._escapeClose);
		document.addEventListener('click', this._onOutsideClickClose);
	}

	close() {
		this.setProps({isOpen: false});

		document.removeEventListener('keydown', this._escapeClose);
		document.removeEventListener('click', this._onOutsideClickClose);
	}

	_escapeClose(e) {
		if (e.key === 'Escape') {
			this.close();
		}
	}

	_onOutsideClickClose({target}) {
		const menuElement = this.getContent();

		if (!menuElement.contains(target) && menuElement !== target) {
			this.close()
		}
	}
}
