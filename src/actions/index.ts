import EventBus from "../framework/EventBus";
import AuthActions from "./AuthActions";
import UsersActions from "./UsersActions";
import ChatsActions from "./ChatsActions";

export default class Actions extends EventBus {
	private static instance: Actions;
	public auth: AuthActions = new AuthActions();
	public users: UsersActions = new UsersActions();
	public chats: ChatsActions = new ChatsActions();

	constructor() {
		super();

		if (Actions.instance) {
			return Actions.instance;
		}

		Actions.instance = this;
	}
}

