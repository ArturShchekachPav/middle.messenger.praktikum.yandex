import Action from "./Action";
import ChatsApi from "../api/ChatsApi";
import { GetChatsArguments } from "../utils/types"

export default class ChatsActions extends Action {
	private api: ChatsApi = new ChatsApi();

	public getChats(chatsQueryParams?: GetChatsArguments) {
		return this.api.getChats(chatsQueryParams);
	}

	public addChat(formDate: Record<string, unknown>) {
		if(typeof formDate.title === 'string') {
			return this.api.createChat(formDate.title)
				.then(({id}) => {

				});
		}

		return Promise.reject();
	}
}
