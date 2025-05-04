import { default as layout } from './notFoundPage.hbs?raw';
import Block from "../../framework/Block.js";
import { ErrorPage } from "../../components";

export class NotFoundPage extends Block {
	constructor() {
		super({
			ErrorPage: new ErrorPage({
				href: '/',
				error: '404',
				message: "Не туда попали",
				linkText: "Назад к чатам"
			})
		});
	}

	render() {
		return layout;
	}
}

