import { default as layout } from './serverErrorPage.hbs?raw';
import Block from "../../framework/Block.js";
import { ErrorPage } from "../../components";

export class ServerErrorPage extends Block {
	constructor() {
		super({
			ErrorPage: new ErrorPage({
				href: '/',
				error: '500',
				message: "Мы уже фиксим",
				linkText: "Назад к чатам"
			})
		});
	}

	render() {
		return layout;
	}
}

