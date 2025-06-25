import Api from './Api';
import {
	ChangeUserPasswordArguments,
	ChangeUserProfileArguments,
	CurrentUserType,
} from '../utils/types';

export default class UsersApi extends Api {
	constructor() {
		super('https://ya-praktikum.tech/api/v2/user');
	}

	public changeUserProfile(profileData: ChangeUserProfileArguments) {
		return this.http
			.put(`${this.baseUrl}/profile`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify(profileData),
			})
			.then(this.checkResponse)
			.then(this.parseResponse<CurrentUserType>);
	}

	public changeUserAvatar(formData: FormData) {
		if (!formData.has('avatar')) {
			return Promise.reject();
		}

		return this.http
			.put(`${this.baseUrl}/profile/avatar`, {
				withCredentials: true,
				body: formData,
			})
			.then(this.checkResponse)
			.then(this.parseResponse<CurrentUserType>);
	}

	public changeUserPassword(passwordData: ChangeUserPasswordArguments) {
		return this.http
			.put(`${this.baseUrl}/password`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify(passwordData),
			})
			.then(this.checkResponse);
	}

	public searchForUserByLogin(login: string) {
		return this.http
			.post(`${this.baseUrl}/search`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify({
					login,
				}),
			})
			.then(this.checkResponse)
			.then(this.parseResponse<CurrentUserType[]>);
	}
}
