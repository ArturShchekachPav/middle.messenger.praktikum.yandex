import './ErrorPage.scss';
import { default as layout } from './ErrorPage.hbs?raw';
import Block from "../../framework/Block.js";
import { Link } from "../index.js";

export class ErrorPage extends Block {
	constructor(props) {
		super({
			...props,
			Link: new Link({
				class: "error-page__link",
				...props.link
			})
		});
	}

	render() {
		return layout;
	}
}

