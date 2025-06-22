import Block from '../../framework/Block';
import {default as template} from './login.hbs?raw';
import '../RegistrationPage/styles.scss';
import {LoginForm} from '../../components';

export class LoginPage extends Block {
	constructor() {
		super({
			LoginForm: new LoginForm(),
		});
	}

	render() {
		return template;
	}
}
