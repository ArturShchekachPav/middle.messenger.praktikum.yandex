import Controller from '../controllers/Controller';
import {CHATS_DATA} from '../utils/constants';
import {ChangeAvatarProps, ChangePasswordProps, RegisterProps, UserData,} from '../utils/types';
import HTTPTransport from '../utils/HTTTPTransport';

class User {
	private controller: Controller;
	private httpTransport: HTTPTransport;
	private baseUrl: string;

	constructor() {
		this.controller = new Controller();
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.logout = this.logout.bind(this);
		this.editUserData = this.editUserData.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeAvatar = this.changeAvatar.bind(this);
		this.httpTransport = new HTTPTransport();
		this.baseUrl = 'ya-praktikum.tech/api/v2';
	}

	login(formData: { login: string; password: string }) {
		console.log(formData);

		this.httpTransport.post(`${this.baseUrl}/auth/signin`, {
			data: formData
		}).then(() => {
			this.httpTransport.get(`${this.baseUrl}/auth/user`)
		});

		const userData = {
			...formData,
			email: 'pochta@yandex.ru',
			first_name: 'Иван',
			second_name: 'Иванов',
			display_name: 'Иван',
			phone: '+79099673030',
			avatar: '/default-avatar.png',
		};

		this.controller.emit('loggedIn', {
			userData,
			chats: CHATS_DATA,
		});
	}

	register(formData: RegisterProps) {
		console.log(formData);

		this.httpTransport.post(`${this.baseUrl}/auth/signup`, {
			data: formData
		}).then(() => {
			this.httpTransport.get(`${this.baseUrl}/auth/user`)
		});

		const userData = {
			...formData,
			display_name: formData.login,
			avatar: '/default-avatar.png',
		};

		this.controller.emit('loggedIn', {
			userData,
			chats: CHATS_DATA,
		});
	}

	logout() {
		this.controller.emit('loggedOut', true);

		this.httpTransport.post(`${this.baseUrl}/auth/logout`);
	}

	editUserData(formData: UserData) {
		console.log(formData);

		this.httpTransport.put(`${this.baseUrl}/user/profile`, {
			data: formData
		});

		const userData = {
			...formData,
		};
		this.controller.emit('userDataEdited', userData);
	}

	changeAvatar(formData: ChangeAvatarProps) {
		console.log(formData);

		this.httpTransport.put(`${this.baseUrl}/user/profile/avatar`, {
			data: formData
		});

		const avatar = '/default-avatar.png';
		this.controller.emit('avatarChanged', avatar);
	}

	changePassword(formData: ChangePasswordProps) {
		console.log(formData);

		this.httpTransport.put(`${this.baseUrl}/user/password`, {
			data: formData
		});

		this.controller.emit('passwordChanged', formData);
	}
}

export default new User();
