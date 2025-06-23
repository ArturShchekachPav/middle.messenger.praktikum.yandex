import Action from "./Action";
import ChatsApi from "../api/ChatsApi";
import { GetChatsArguments, UsersToChatParams } from "../utils/types";

export default class ChatsActions extends Action {
	private api: ChatsApi = new ChatsApi();

	public getChats(chatsQueryParams?: GetChatsArguments) {
		return this.api.getChats(chatsQueryParams);
	}

	public addChat(formDate: Record<string, unknown>) {
		if(typeof formDate.title === 'string') {
			return this.api.createChat(formDate.title)
				.then(() => this.getChats())
				.then(chats => this.store.set('chats', chats));
		}

		return Promise.reject();
	}

	public deleteChat(chatId: number) {
		return this.api.deleteChat(chatId)
			.then(() => this.getChats())
			.then(chats => this.store.set('chats', chats));
	}

	public addUsersToChat(params: UsersToChatParams) {
		return this.api.addUsersToChat(params);
	}

	public deleteUsersFromChat(params: UsersToChatParams) {
		return this.api.deleteUsersFromChat(params);
	}

	public getChatToken(chatId: number) {
		return this.api.getChatToken(chatId);
	}
}
