import Controller from "../controllers/Controller";
import {CHATS_DATA} from "../utils/constants";

class Messanger {
	private controller: Controller;

	constructor() {
		this.controller = new Controller();
		this.sendMessage = this.sendMessage.bind(this);
		this.sendFile = this.sendFile.bind(this);
		this.sendMedia = this.sendMedia.bind(this);
		this.addChat = this.addChat.bind(this);
		this.removeChat = this.removeChat.bind(this);
	}

	addChat(formData) {
		console.log(formData);
		this.controller.emit('chadAdded', CHATS_DATA);
	}

	removeChat(formData) {
		console.log(formData);
		this.controller.emit('chadRemoved', CHATS_DATA);
	}

	sendMessage(formData) {
		console.log(formData);
		this.controller.emit('messageSent', formData.message);
	}

	sendFile(formData) {
		console.log(formData);
		this.controller.emit('fileSent', formData);
	}

	sendMedia(formData) {
		console.log(formData);
		this.controller.emit('mediaSent', formData);
	}

	sendLocation(formData) {
		this.controller.emit('locationSent', formData);
	}

	getChatData(chatId) {
		const chatData = {};
		this.controller.emit('locationSent', chatData);
	}
}

export default new Messanger();
