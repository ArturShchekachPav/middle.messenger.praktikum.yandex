import Block from '../../framework/Block';
import {default as template} from './template.hbs?raw';
import {CurrentUserType} from '../../utils/types';
import {UserPreview} from "../UserPreview";
import Actions from "../../actions";

export class UsersList extends Block {
	private actions: Actions = new Actions();

	constructor({users}: { users: UserPreview[] }) {
		super({
			Users: users.map(user => new UserPreview({user, events: {
				click: () => {
					this.actions.emit('userPreviewClicked', user);
				}
				}}))
		});
	}

	setProps({users}: {users: CurrentUserType[]}) {
		super.setProps({
			Users: users.map(user => new UserPreview({user, events: {
					click: () => {
						this.actions.emit('userPreviewClicked', user);
					}
				}}))
		});
	}

	render() {
		return template;
	}
}
