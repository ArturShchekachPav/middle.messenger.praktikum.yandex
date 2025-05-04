import Block from '../../framework/Block.js';
import { default as layout } from './login.hbs?raw';
import '../register/register.scss';

export class LoginPage extends Block {
	constructor({LoginForm}) {
		super({
			LoginForm
		});
	}

	render() {
		return layout;
	}
}
