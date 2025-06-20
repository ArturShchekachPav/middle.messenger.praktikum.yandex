import './profile.scss';
import {default as layout} from './profile.hbs?raw';
import Block from '../../framework/Block';
import {EditPasswordForm, EditProfileForm, ProfileActions,} from '../../components/index.js';
import Component from '../../framework/Component';
import Actions from '../../actions';
import Router from "../../router/Router";

export class ProfilePage extends Block {
	private actions: Actions = new Actions();
	private router: Router = new Router;

	constructor({
								email,
								login,
								first_name,
								second_name,
								display_name,
								phone,
								avatar,
							}: {
		email: string;
		login: string;
		first_name: string;
		second_name: string;
		display_name: string;
		phone: string;
		avatar: string;
	}) {
		super({
			name: first_name,
			EditProfileForm: new EditProfileForm({
				defaultValues: {
					email,
					login,
					first_name,
					second_name,
					display_name,
					phone,
				},
			}),
			EditPasswordForm: new EditPasswordForm(),
			MessangerLink: new Component({
				tag: 'a',
				attr: {
					href: '/messenger',
					class: 'side-bar__back-button',
				},
				events: {
					click: (event: MouseEvent) => {
						event.preventDefault();

						this.router.go('/messanger');
					},
				},
			}),
			AvatarChangeButton: new Component({
				tag: 'button',
				attr: {
					type: 'button',
					class: 'profile__avatar',
				},
				content: new Component({
					tag: 'img',
					attr: {
						src: avatar,
						class: 'profile__avatar-image',
						alt: 'avatar',
					},
				}),
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
		return layout;
	}
}
