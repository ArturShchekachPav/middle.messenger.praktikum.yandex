import Block from '../../framework/Block';
import { default as layout } from './login.hbs?raw';
import '../register/register.scss';
import {LoginForm} from "../../components";

export class LoginPage extends Block {
	constructor({LoginForm}: {LoginForm: LoginForm}) {
		super({
			LoginForm
		});
	}

	render() {
		return layout;
	}
}
