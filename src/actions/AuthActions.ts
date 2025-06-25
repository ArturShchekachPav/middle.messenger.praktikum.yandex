import Action from "./Action";
import {SignInArguments, SignUpArguments} from "../utils/types";
import AuthApi from "../api/AuthApi";
import {matchesStructure} from "../utils/utils";

export default class AuthActions extends Action {
	private api: AuthApi = new AuthApi();

	public signUp(userData: Record<string, unknown>) {
		if(matchesStructure<SignUpArguments>(userData, {
			first_name: 'string',
			second_name: 'string',
			login: 'string',
			email: 'string',
			password: 'string',
			phone: 'string',
		})) {
			return this.api.signUp(userData);
		} else {
			return Promise.reject();
		}
	}

	public signIn(userData: Record<string, unknown>) {
		if(matchesStructure<SignInArguments>(userData, {
			login: 'string',
			password: 'string'
		})) {
			return this.api.signIn(userData);
		} else {
			return Promise.reject({reason: 'Переданы неверные данные'});
		}
	}

	public getUserData() {
		return this.api.getUserData();
	}

	public logOut() {
		this.api.logOut()
			.then(() => {
				this.store.set('isLoggedIn', false);
				this.store.set('currentUser', null);
				this.store.set('chats', []);
				this.store.set('currentChat', null);
			})
			.catch(console.log)
	}
}
