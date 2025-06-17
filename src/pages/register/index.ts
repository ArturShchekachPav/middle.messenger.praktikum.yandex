import Block from '../../framework/Block';
import {default as layout} from './register.hbs?raw';
import '../register/register.scss';
import {RegisterForm} from '../../components/RegisterForm';

export class RegistrationPage extends Block {
	constructor() {
		super({
			RegisterForm: new RegisterForm(),
		});
	}

	render() {
		return layout;
	}
}
