import Action from './Action';
import MessagesWebSocket from '../api/MessagesWebSocket';
import { MessagesSocketProps } from '../utils/types';

export default class MessagesActions extends Action {
	private webSocket?: MessagesWebSocket;

	public startConnection(params: MessagesSocketProps) {
		this.webSocket = new MessagesWebSocket(params);
	}

	public getOldMessages(count: number) {
		this.webSocket?.getOldMessages(count);
	}

	public sendMessage(message: string) {
		this.webSocket?.sendMessage(message);
	}

	public sendFile(fileId: number) {
		this.webSocket?.sendFile(fileId);
	}
}
