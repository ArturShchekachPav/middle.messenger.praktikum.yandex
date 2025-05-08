import {default as layout} from './notFoundPage.hbs?raw';
import Block from "../../framework/Block";
import {ErrorPage} from "../../components/index.js";

export class NotFoundPage extends Block {
	constructor({onChangePage}: { onChangePage: (page: string) => void }) {
		super({
			ErrorPage: new ErrorPage({
				href: '/',
				error: '404',
				message: "Не туда попали",
				linkText: "Назад к чатам",
				onChangePage: onChangePage
			})
		});
	}

	render() {
		return layout;
	}
}

