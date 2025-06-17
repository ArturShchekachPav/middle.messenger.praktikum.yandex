import Block from '../../framework/Block';
import {default as layout} from './login.hbs?raw';
import '../register/register.scss';
import {LoginForm} from '../../components';

export class LoginPage extends Block {
	constructor() {
		super({
			LoginForm: new LoginForm(),
		});
	}

	render() {
		return layout;
	}
}
