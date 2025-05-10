import Controller from "../controllers/Controller";
import {CHATS_DATA} from "../utils/constants";

class User {
	private controller: Controller;

	constructor() {
		this.controller = new Controller();
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);
		this.editUserData = this.editUserData.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeAvatar = this.changeAvatar.bind(this);
	}

	login(formData) {
		console.log(formData);
		const userData = {
			...formData,
			email: 'pochta@yandex.ru',
			first_name: 'Иван',
			second_name: 'Иванов',
			display_name: 'Иван',
			phone: '+79099673030',
			avatar: '/default-avatar.png',
		};

		this.controller.emit(
			'loggedIn',
			{
				userData,
				chats: CHATS_DATA
			}
		);
	}

	register(formData) {
		console.log(formData);
		const userData = {
			...formData,
			display_name: formData.login,
			avatar: '/default-avatar.png',
		};

		this.controller.emit(
			'loggedIn',
			{
				userData,
				chats: CHATS_DATA
			}
		);
	}

	logout() {
		this.controller.emit('loggedOut', true);
	}

	editUserData(formData) {
		console.log(formData);
		const userData = {
			...formData
		};
		this.controller.emit('userDataEdited', userData);
	}

	changeAvatar(formData) {
		console.log(formData);
		const avatar = '/default-avatar.png';
		this.controller.emit('avatarChanged', avatar);
	}

	changePassword(formData) {
		console.log(formData)
		this.controller.emit('passwordChanged', formData);
	}
}

export default new User();
