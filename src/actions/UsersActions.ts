import Action from "./Action";
import UsersApi from "../api/UsersApi";
import {ChangeUserPasswordArguments, ChangeUserProfileArguments, CurrentUserType} from "../utils/types";
import {matchesStructure} from "../utils/utils";

export default class UsersActions extends Action {
	private api: UsersApi = new UsersApi();

	public changeUserAvatar(formData: FormData) {
		this.api.changeUserAvatar(formData)
			.then((userData: CurrentUserType) => this.store.set('currentUser.avatar', userData.avatar))
			.catch(console.log);
	}

	public changeUserProfile(profileData: Record<string, unknown>) {
		if(matchesStructure<ChangeUserProfileArguments>(
			profileData,
			{
				first_name: 'string',
				second_name: 'string',
				email: 'string',
				phone: 'string',
				display_name: 'string',
				login: 'string'
			}
		)) {
			return this.api.changeUserProfile(profileData)
				.then(userData => this.store.set('currentUser', userData));
		}

		return Promise.reject();
	}

	public changeUserPassword(passwordData: Record<string, unknown>) {
		if(matchesStructure<ChangeUserPasswordArguments>(
			passwordData,
			{
				oldPassword: 'string',
				newPassword: 'string'
			}
		)) {
			return this.api.changeUserPassword(passwordData);
		}

		return Promise.reject();
	}

	public searchForUserByLogin(login: string) {
		return this.api.searchForUserByLogin(login);
	}
}
