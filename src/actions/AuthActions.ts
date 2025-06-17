import Action from "./Action";
import {SignInArguments, SignUpArguments} from "../utils/types";
import AuthApi from "../api/AuthApi";

export default class AuthActions extends Action {
	private api: AuthApi = new AuthApi();

	public signUp(userData: SignUpArguments) {
		this.api.signUp(userData)
			.then(console.log)
			.catch(console.log)
	}

	public signIn(userData: SignInArguments) {
		this.api.signIn(userData)
			.then(console.log)
			.catch(console.log)
	}

	public logOut() {
		this.api.logOut()
			.then(console.log)
			.catch(console.log)
	}
}
