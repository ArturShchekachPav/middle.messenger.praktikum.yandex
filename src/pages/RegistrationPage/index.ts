import Block from '../../framework/Block';
import {default as template} from './template.hbs?raw';
import './styles.scss';
import RegisterForm from '../../components/RegisterForm';

export class RegistrationPage extends Block {
	constructor() {
		super({
			RegisterForm: new RegisterForm(),
		});
	}

	render() {
		return template;
	}
}
