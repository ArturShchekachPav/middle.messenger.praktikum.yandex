import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block';
import { CurrentUserType } from '../../utils/types';

export class UserPreview extends Block {
	constructor({
		user,
		events,
	}: {
		user: CurrentUserType;
		events: Record<string, () => void>;
	}) {
		super({
			user,
			events,
			avatar: user.avatar
				? `https://ya-praktikum.tech/api/v2/resources${user.avatar}`
				: 'default-avatar.png',
		});
	}

	render() {
		return template;
	}
}
