import Block from '../../framework/Block';
import { default as template } from './template.hbs?raw';
import { MenuProps } from '../../utils/types';

export class Menu extends Block {
	constructor({ content, isOpen, addClass }: MenuProps) {
		super({
			content,
			isOpen,
			addClass,
		});

		this._onOutsideClickClose = this._onOutsideClickClose.bind(this);
		this._escapeClose = this._escapeClose.bind(this);
	}

	render() {
		return template;
	}

	open() {
		this.setProps({ isOpen: true });

		document.addEventListener('keydown', this._escapeClose);
		document.addEventListener('click', this._onOutsideClickClose);
	}

	close() {
		this.setProps({ isOpen: false });

		document.removeEventListener('keydown', this._escapeClose);
		document.removeEventListener('click', this._onOutsideClickClose);
	}

	_escapeClose(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			this.close();
		}
	}

	_onOutsideClickClose({ target }: MouseEvent) {
		const menuElement = this.getContent();

		if (!(target instanceof HTMLElement)) {
			return;
		}

		if (!menuElement.contains(target) && menuElement !== target) {
			this.close();
		}
	}
}
