import Block from '../../framework/Block';
import {default as template} from './template.hbs?raw';
import {ProfileActionButton} from '../index';
import Actions from '../../actions';

export class ProfileActions extends Block {
	private actions: Actions = new Actions();

	constructor() {
		super({
			ActionButtons: [
				new ProfileActionButton({
					content: 'Изменить данные',
					type: 'change',
					onClick: () => {
						this.actions.emit('enableEditProfileForm');

						this.hide();
					},
				}),
				new ProfileActionButton({
					content: 'Изменить пароль',
					type: 'change',
					onClick: () => {
						this.actions.emit('hideEditProfileForm');
						this.hide();

						this.actions.emit('showEditPasswordForm');
					},
				}),
				new ProfileActionButton({
					content: 'Выйти',
					type: 'exit',
					onClick: () => {
						this.actions.auth.logOut();
					},
				}),
			],
		});

		this.show = this.show.bind(this);

		this.actions.on('showProfileActions', this.show);
	}

	render() {
		return template;
	}
}
