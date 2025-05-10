import Block from "../../framework/Block";
import {default as layout} from './ProfileActionButton.hbs?raw';

export class ProfileActionButton extends Block {
	constructor({content, type, onClick}) {
		super({
			content,
			type,
			events: {
				click: onClick
			}
		});
	}

	render() {
		return layout;
	}
}
