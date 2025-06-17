import Api from "./Api";
import {SignInArguments, SignUpArguments} from "../utils/types";

export default class AuthApi extends Api{
	constructor() {
		super('https://ya-praktikum.tech/api/v2/auth');
	}

	public signUp(userData: SignUpArguments) {
		return this.http.post(
			`${this.baseUrl}/signup`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify(userData)
			}
		).then(this.checkResponse);
	}

	public signIn(userData: SignInArguments) {
		return this.http.post(
			`${this.baseUrl}/signin`,
			{
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify(userData)
			}
		).then(this.checkResponse);
	}

	public getUserData() {
		return this.http.get(`${this.baseUrl}/user`, {withCredentials: true}).then(this.checkResponse);
	}

	public logOut() {
		return this.http.post(`${this.baseUrl}/logout`, {withCredentials: true}).then(this.checkResponse);
	}
}
