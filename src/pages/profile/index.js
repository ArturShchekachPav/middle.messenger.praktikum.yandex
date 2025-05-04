import './profile.scss';
import { default as layout } from './profile.hbs?raw';
import Block from "../../framework/Block.js";
import { EditPasswordForm, EditProfileForm } from "../../components";
import Component from "../../framework/Component.js";

export class ProfilePage extends Block {
	constructor({
		email,
		login,
		first_name,
		second_name,
		display_name,
		phone,
		avatar,
		onChangePage,
		changeAvatarPopup
	}) {
		super({
			name: first_name,
			EditProfileForm: new EditProfileForm({
				isEdit: false,
				isHide: false,
				defaultValues: {
					email,
					login,
					first_name,
					second_name,
					display_name,
					phone
				},
				onChangeProfileData: () => {
					this.onChangeProfileData();
				}
			}),
			EditPasswordForm: new EditPasswordForm({
				isHide: true,
				onChangePasswordData: () => {
					this.onChangePasswordData();
				}
			}),
			MessangerLink: new Component({
				tag: 'a',
				attr: {
					href: "/",
					class: "side-bar__back-button"
				},
				events: {
					click: event => {
						event.preventDefault();

						onChangePage('/');
					}
				}
			}),
			AvatarChangeButton: new Component({
				tag: 'button',
				attr: {
					type: "button",
					class: "profile__avatar"
				},
				content: new Component({
					tag: 'img',
					attr: {
						src: avatar,
						class: "profile__avatar-image",
						alt: "avatar"
					}
				}),
				events: {
					click: event => {
						changeAvatarPopup.open();
					}
				}
			}),
			ProfileActions: new Component({
				tag: 'div',
				attr: {
					class: 'profile__actions'
				},
				content: [
					new Component({
						tag: 'button',
						attr: {
							class: 'profile__button profile__button_change',
							type: 'button'
						},
						content: 'Изменить данные',
						events: {
							click: () => {
								this.onChangeProfileButtonClick();
							}
						}
					}),
					new Component({
						tag: 'button',
						attr: {
							class: 'profile__button profile__button_change',
							type: 'button'
						},
						content: 'Изменить пароль',
						events: {
							click: () => {
								this.onChangePasswordButtonClick();
							}
						}
					}),
					new Component({
						tag: 'button',
						attr: {
							class: 'profile__button profile__button_exit',
							type: 'button'
						},
						content: 'Выйти',
						events: {
							click: () => {
								onChangePage('/sing-in');
							}
						}
					})
				]
			})
		});

		this.onChangePasswordButtonClick = this.onChangePasswordButtonClick.bind(this);
		this.onChangeProfileButtonClick = this.onChangeProfileButtonClick.bind(this);
	}

	render() {
		return layout;
	}

	onChangeProfileButtonClick() {
		this.children.EditProfileForm.edit();

		this.children.ProfileActions.hide();
	}

	onChangePasswordButtonClick() {
		this.children.EditProfileForm.hide();
		this.children.ProfileActions.hide();

		this.children.EditPasswordForm.show();
	}

	onChangeProfileData() {
		this.children.EditProfileForm.read();

		this.children.ProfileActions.show();
	}

	onChangePasswordData() {
		this.children.EditProfileForm.show();
		this.children.ProfileActions.show();

		this.children.EditPasswordForm.hide();
	}
}
