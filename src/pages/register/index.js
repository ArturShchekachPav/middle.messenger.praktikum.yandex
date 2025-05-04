import Block from '../../framework/Block.js';
import { default as layout } from './register.hbs?raw';
import '../register/register.scss';

export class RegistrationPage extends Block {
	constructor({RegisterForm}) {
		super({
			RegisterForm
		});
	}

	render() {
		return layout;
	}
}
