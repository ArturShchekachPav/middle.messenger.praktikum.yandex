import EventBus from "../framework/EventBus";
import AuthActions from "./AuthActions";
import UsersActions from "./UsersActions";
import ChatsActions from "./ChatsActions";
import Store from "../store/Store";

export default class Actions extends EventBus {
	private static instance: Actions;
	public auth: AuthActions = new AuthActions();
	public users: UsersActions = new UsersActions();
	public chats: ChatsActions = new ChatsActions();
	private store: Store = new Store();

	constructor() {
		super();

		if (Actions.instance) {
			return Actions.instance;
		}

		Actions.instance = this;
	}

	public getUserAndChats() {
		return Promise.all([this.auth.getUserData(), this.chats.getChats()])
			.then(([userData, chats]) => {
				console.log(userData, chats);

				this.store.set(
					'currentUser',
					{
						...userData,
						display_name: userData.display_name ? userData.display_name : ''
					}
				);
				this.store.set('chats', chats);
				this.store.set('isLoggedIn', true);
				console.log(this.store.getState());
			})
			.catch(() => {
				this.store.set('isLoggedIn', false);
			})
	}
}

