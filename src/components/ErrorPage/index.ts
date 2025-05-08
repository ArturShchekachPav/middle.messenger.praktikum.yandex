import './ErrorPage.scss';
import {default as layout} from './ErrorPage.hbs?raw';
import Block from "../../framework/Block.js";
import Component from "../../framework/Component";

export class ErrorPage extends Block {
	constructor({href, error, message, linkText, onChangePage}: {
		href: string,
		error: string,
		message: string,
		linkText: string,
		onChangePage: (page: string) => void
	}) {
		super({
			error,
			message,
			Link: new Component({
				tag: 'a',
				attr: {
					class: "error-page__link",
					href: href
				},
				events: {
					click: (event: MouseEvent): void => {
						event.preventDefault();

						onChangePage(href);
					}
				},
				content: linkText
			})
		});
	}

	render() {
		return layout;
	}
}

