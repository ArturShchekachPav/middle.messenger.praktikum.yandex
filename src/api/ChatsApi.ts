import Api from './Api';
import { queryString } from '../utils/utils';
import {
	UsersToChatParams,
	ChatsUsersQueryParams,
	GetChatsArguments,
	CurrentUserType,
	ChatType,
} from '../utils/types';

export default class ChatsApi extends Api {
	constructor() {
		super('https://ya-praktikum.tech/api/v2/chats');
	}

	public getChats(chatsQueryParams: GetChatsArguments = {}) {
		return this.http
			.get(`${this.baseUrl}${queryString(chatsQueryParams)}`, {
				withCredentials: true,
			})
			.then(this.checkResponse)
			.then(this.parseResponse);
	}

	public createChat(title: string) {
		return this.http
			.post(`${this.baseUrl}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify({
					title,
				}),
			})
			.then(this.checkResponse)
			.then(this.parseResponse<{ id: number }>);
	}

	public deleteChat(chatId: number) {
		return this.http
			.delete(`${this.baseUrl}`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify({
					chatId,
				}),
			})
			.then(this.checkResponse);
	}

	public getChatSentFiles(chatId: number) {
		return this.http
			.get(`${this.baseUrl}/${chatId}/files`)
			.then(this.checkResponse);
	}

	public getArchivedChats(chatsQueryParams: GetChatsArguments = {}) {
		return this.http
			.get(`${this.baseUrl}/archive${queryString(chatsQueryParams)}`)
			.then(this.checkResponse);
	}

	public archiveChatById(chatId: number) {
		return this.http
			.post(`${this.baseUrl}/archive`, {
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chatId,
				}),
			})
			.then(this.checkResponse);
	}

	public unarchiveChatById(chatId: number) {
		return this.http
			.post(`${this.baseUrl}/unarchive`, {
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					chatId,
				}),
			})
			.then(this.checkResponse);
	}

	public getCommonChatsWithCurrentChatUser(chatId: number) {
		return this.http
			.get(`${this.baseUrl}/${chatId}/common`)
			.then(this.checkResponse);
	}

	public getChatUsers(
		chatId: number,
		chatsUsersQueryParams: ChatsUsersQueryParams = {}
	) {
		return this.http
			.get(
				`${this.baseUrl}/${chatId}/users${queryString(chatsUsersQueryParams)}`,
				{
					withCredentials: true,
				}
			)
			.then(this.checkResponse)
			.then(this.parseResponse<CurrentUserType[]>);
	}

	public getNewMessagesCount(chatId: number) {
		return this.http
			.get(`${this.baseUrl}/new/${chatId}`)
			.then(this.checkResponse);
	}

	public uploadChatAvatar(formData: FormData) {
		if (!formData.has('avatar') || !formData.has('chatId')) {
			return Promise.reject();
		}

		return this.http
			.put(`${this.baseUrl}/avatar`, {
				withCredentials: true,
				body: formData,
			})
			.then(this.checkResponse)
			.then(this.parseResponse<ChatType>);
	}

	public addUsersToChat(params: UsersToChatParams) {
		return this.http
			.put(`${this.baseUrl}/users`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify(params),
			})
			.then(this.checkResponse);
	}

	public deleteUsersFromChat(params: UsersToChatParams) {
		return this.http
			.delete(`${this.baseUrl}/users`, {
				headers: {
					'Content-Type': 'application/json',
				},
				withCredentials: true,
				body: JSON.stringify(params),
			})
			.then(this.checkResponse);
	}

	public getChatToken(chatId: number) {
		return this.http
			.post(`${this.baseUrl}/token/${chatId}`, {
				withCredentials: true,
			})
			.then(this.checkResponse)
			.then(this.parseResponse<{ token: number }>);
	}
}
