import './styles.scss';
import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block';
import Component from '../../framework/Component';
import Router from '../../router/Router';

export class ErrorPage extends Block {
	private router: Router = new Router();

	constructor({ error, message }: { error: string; message: string }) {
		super({
			error,
			message,
			Link: new Component({
				tag: 'a',
				attr: {
					class: 'error-page__link',
					href: '/messanger',
				},
				events: {
					click: (event: MouseEvent): void => {
						event.preventDefault();

						this.router.go('/messanger');
					},
				},
				content: 'Назад к чатам',
			}),
		});
	}

	render() {
		return template;
	}
}
