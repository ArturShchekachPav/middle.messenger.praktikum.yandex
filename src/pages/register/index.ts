import Block from '../../framework/Block';
import {default as layout} from './register.hbs?raw';
import '../register/register.scss';
import {RegisterForm} from "../../components/RegisterForm";

export class RegistrationPage extends Block {
	constructor({RegisterForm}: { RegisterForm: RegisterForm }) {
		super({
			RegisterForm
		});
	}

	render() {
		return layout;
	}
}
