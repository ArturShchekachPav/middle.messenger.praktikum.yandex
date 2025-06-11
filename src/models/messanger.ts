import Controller from '../controllers/Controller';
import {CHATS_DATA} from '../utils/constants';
import {ChatActionProps, SendFileProps, SendMediaProps} from '../utils/types';
import HTTPTransport from '../utils/HTTTPTransport';

class Messanger {
	private controller: Controller;
	private httpTransport: HTTPTransport;
	private baseUrl: string;

	constructor() {
		this.controller = new Controller();
		this.sendMessage = this.sendMessage.bind(this);
		this.sendFile = this.sendFile.bind(this);
		this.sendMedia = this.sendMedia.bind(this);
		this.addChat = this.addChat.bind(this);
		this.removeChat = this.removeChat.bind(this);
		this.httpTransport = new HTTPTransport();
		this.baseUrl = 'ya-praktikum.tech/api/v2';
	}

	addChat(formData: ChatActionProps) {
		console.log(formData);
		this.controller.emit('chadAdded', CHATS_DATA);
	}

	removeChat(formData: ChatActionProps) {
		console.log(formData);
		this.controller.emit('chadRemoved', CHATS_DATA);
	}

	sendMessage(formData: { message: string }) {
		console.log(formData);
		this.controller.emit('messageSent', formData.message);
	}

	sendFile(formData: SendFileProps) {
		this.httpTransport.post(`${this.baseUrl}/resource`, {
			data: formData
		});

		console.log(formData);
		this.controller.emit('fileSent', formData);
	}

	sendMedia(formData: SendMediaProps) {
		this.httpTransport.post(`${this.baseUrl}/resource`, {
			data: formData
		});

		console.log(formData);
		this.controller.emit('mediaSent', formData);
	}

	sendLocation(formData: { location: unknown }) {
		console.log(formData);
		this.controller.emit('locationSent', formData);
	}

	getChatData(chatId: string) {
		console.log(chatId);
		this.controller.emit('chatDataGot', {});
	}
}

export default new Messanger();
