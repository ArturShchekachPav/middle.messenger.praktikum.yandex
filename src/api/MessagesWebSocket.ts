import Store from "../store/Store";

export default class MessagesWebSocket {
    private webSocket: WebSocket;
    private ping?: number;
    private store: Store = new Store();

    constructor({
        userId,
        chatId,
        token
    }: {
        userId: number;
        chatId: number;
        token: number;
    }) {
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
        clearInterval(this.ping);
    }

    private setEventListeners() {
        this.webSocket.addEventListener('open', this.enablePing);

        this.webSocket.addEventListener('close', () => {
            this.disablePing;
            this.store.set('currentChat.messages', []);
        });

        this.webSocket.addEventListener('message', event => {
            const messages = JSON.parse(event.data);
            const stateMessages = this.store.getState().currentChat?.messages;

            if(Array.isArray(stateMessages)) {
                this.store.set('currentChat.messages', [...stateMessages, ...messages]);
            }
        });

        this.webSocket.addEventListener('error', console.log);
    }

    public getOldMessages(count: number) {
        this.webSocket.send(
            JSON.stringify({
                content: String(count),
                type: 'get old',
            })
        );
    }
}