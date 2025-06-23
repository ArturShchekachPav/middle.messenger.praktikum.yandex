import Store from "../store/Store";
import {MessagesSocketProps, MessageType} from "../utils/types";

export default class MessagesWebSocket {
    private webSocket: WebSocket;
    private ping?: number;
    private store: Store = new Store();

    constructor({
        userId,
        chatId,
        token
    }: MessagesSocketProps) {
        this.webSocket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

        this.setEventListeners();
    }

    public sendMessage(message: string) {
        this.webSocket.send(
            JSON.stringify({
                content: message,
                type: 'message',
            })
        );
    }

    public sendFile(fileId: number) {
        this.webSocket.send(
            JSON.stringify({
                content: String(fileId),
                type: 'file',
            })
        );
    }

    private enablePing() {
        this.ping = setInterval(() => {
            this.webSocket.send(JSON.stringify({ type: 'ping' }));
        }, 1000);
    }

    private disablePing() {
				if(this.ping) {
					clearInterval(this.ping);
				}
    }

		public getOldMessages(count: number) {
			this.webSocket.send(
				JSON.stringify({
					content: String(count),
					type: 'get old',
				})
			);
		}

	 private prepareMessages(messages: MessageType[]) {
			const currentUserId = this.store.getState().currentUser?.id;

			if(!currentUserId) {
				return messages;
			}

			return messages.map(message => ({...message, isOwn: String(currentUserId) === message.user_id }));
	 }

    private setEventListeners() {
        this.webSocket.addEventListener('open', () => {
					this.enablePing();
					this.getOldMessages(0);
				});

        this.webSocket.addEventListener('close', () => {
            this.disablePing();
            this.store.set('currentChat.messages', []);
        });

        this.webSocket.addEventListener('message', event => {
            let messages = JSON.parse(event.data);

						if(!messages || messages.type === 'pong') {
							return;
						}

						messages = Array.isArray(messages) ? messages : [messages];

						let stateMessages = this.store.getState().currentChat?.messages;

						stateMessages = stateMessages ? stateMessages : [];

						this.store.set('currentChat.messages', this.prepareMessages([...stateMessages, ...messages]));
        });

        this.webSocket.addEventListener('error', console.log);
    }
}
