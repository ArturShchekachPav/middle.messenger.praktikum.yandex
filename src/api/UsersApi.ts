import Api from "./Api";
import {ChangeUserPasswordArguments, ChangeUserProfileArguments} from "../utils/types";

export default class UsersApi extends Api{
	constructor() {
		super('https://ya-praktikum.tech/api/v2/user');
	}

	public changeUserProfile(profileData: ChangeUserProfileArguments) {
		return this.http.put(
			`${this.baseUrl}/profile`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(profileData)
			}
		).then(this.checkResponse);
	}

	public changeUserAvatar(formData: FormData) {
		if(!formData.has('avatar')) {
			return;
		}

		return this.http.put(
			`${this.baseUrl}/profile/avatar`,
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
				body: formData
			}
		).then(this.checkResponse);
	}

	public changeUserPassword(passwordData: ChangeUserPasswordArguments) {
		return this.http.put(
			`${this.baseUrl}/password`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(passwordData)
			}
		).then(this.checkResponse);
	}

	public searchForUserByLogin(login: string) {
		return this.http.post(
			`${this.baseUrl}/password`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					login
				})
			}
		).then(this.checkResponse);
	}
}
