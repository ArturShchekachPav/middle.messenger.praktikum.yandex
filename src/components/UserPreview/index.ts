import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';

export class UserPreview extends Block {
	constructor({user, events}) {
		super({
			user,
			events
		});
	}

	render() {
		return template;
	}
}
