import Block from '../../framework/Block.js';
import { default as layout } from './login.hbs?raw';

export class LoginPage extends Block {
	constructor() {
		super({
			Field: new Field({}),
			Button: new Button({}),
			Link: new Link({})
		});
	}

	render() {
		return layout;
	}
}
