import './styles.scss';
import { default as template } from './template.hbs?raw';
import Block from '../../framework/Block/Block';
import {
	ChangeAvatarPopup,
	CurrentUserAvatar,
	CurrentUserName,
	EditPasswordForm,
	EditProfileForm,
	ProfileActions,
} from '../../components/index.js';
import Component from '../../framework/Component';
import Actions from '../../actions';
import Router from '../../router/Router/Router';

const router = new Router();

export class SettingsPage extends Block {
	private actions: Actions = new Actions();
	private router: Router = router;

	constructor() {
		super({
			name: new CurrentUserName(),
			changeAvatarPopup: new ChangeAvatarPopup(),
			EditProfileForm: new EditProfileForm(),
			EditPasswordForm: new EditPasswordForm(),
			MessangerLink: new Component({
				tag: 'a',
				attr: {
					href: '/messanger',
					class: 'side-bar__back-button',
				},
				events: {
					click: (event: MouseEvent) => {
						event.preventDefault();

						this.router.go('/messanger');
					},
				},
			}),
			AvatarChangeButton: new CurrentUserAvatar({
				events: {
					click: () => {
						this.actions.emit('openEditAvatarPopup');
					},
				},
			}),
			ProfileActions: new ProfileActions(),
		});
	}

	render() {
		return template;
	}
}
