import Block from '../../framework/Block';
import { default as template } from './template.hbs?raw';

export class MenuItem extends Block {
	constructor({
		text,
		icon,
		events,
	}: {
		text: string;
		icon: string;
		events: Record<string, (event: Event) => void>;
	}) {
		super({
			text,
			icon,
			events,
		});
	}

	render() {
		return template;
	}
}
