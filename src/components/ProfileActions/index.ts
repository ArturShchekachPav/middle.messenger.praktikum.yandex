import Block from "../../framework/Block";
import {default as layout} from './ProfileActions.hbs?raw';
import {ProfileActionButton} from "../index";
import Controller from "../../controllers";

export class ProfileActions extends Block {
	constructor() {
		super({
			ActionButtons: [
				new ProfileActionButton({
					content: 'Изменить данные',
					type: 'change',
					onClick: () => {
						this.controller.emit('enableEditProfileForm');

						this.hide();
					}
				}),
				new ProfileActionButton({
					content: 'Изменить пароль',
					type: 'change',
					onClick: () => {
						this.controller.emit('hideEditProfileForm');
						this.hide();

						this.controller.emit('showEditPasswordForm');
					}
				}),
				new ProfileActionButton({
					content: 'Выйти',
					type: 'exit',
					onClick: () => {
						this.controller.emit('logout');
					}
				})
			]
		});

		this.show = this.show.bind(this);

		this.controller = new Controller();
		this.controller.on('showProfileActions', this.show);
	}

	render() {
		return layout;
	}
}
