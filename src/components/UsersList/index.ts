import Block from '../../framework/Block';
import { default as template } from './template.hbs?raw';
import { CurrentUserType } from '../../utils/types';
import { UserPreview } from '../UserPreview';

export class UsersList extends Block {
	constructor({
		users,
		onClick,
	}: {
		users: CurrentUserType[];
		onClick: (user: CurrentUserType) => void;
	}) {
		super({
			Users: users.map(
				(user) =>
					new UserPreview({
						user,
						events: {
							click: () => onClick(user),
						},
					})
			),
		});
	}

	setProps({
		users,
		onClick,
	}: {
		users: CurrentUserType[];
		onClick: (user: CurrentUserType) => void;
	}) {
		super.setProps({
			Users: users.map(
				(user) =>
					new UserPreview({
						user,
						events: {
							click: () => onClick(user),
						},
					})
			),
		});
	}

	render() {
		return template;
	}
}
