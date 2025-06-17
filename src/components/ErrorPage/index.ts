import './ErrorPage.scss';
import {default as layout} from './ErrorPage.hbs?raw';
import Block from '../../framework/Block.js';
import Component from '../../framework/Component';
import Controller from '../../actions';

export class ErrorPage extends Block {
	private controller: Controller;

	constructor({error, message}: { error: string; message: string }) {
		super({
			error,
			message,
			Link: new Component({
				tag: 'a',
				attr: {
					class: 'error-page__link',
					href: '/messenger',
				},
				events: {
					click: (event: MouseEvent): void => {
						event.preventDefault();

						this.controller.emit('changePage', '/messenger');
					},
				},
				content: 'Назад к чатам',
			}),
		});

		this.controller = new Controller();
	}

	render() {
		return layout;
	}
}
