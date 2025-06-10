import Block from '../../framework/Block';
import Component from '../../framework/Component';
import {ChatHeader, ChatMessageForm, ChatMessages} from '../index';
import {MESSAGES_DATA} from '../../utils/constants';
import Controller from '../../controllers';
import {default as layout} from './ChatWindow.hbs?raw';

export class ChatWindow extends Block {
	private controller: Controller;

	constructor() {
		super({
			content: [
				new Component({
					tag: 'p',
					attr: {
						class: 'chat-window__default-message',
					},
					content: 'Выберите чат чтобы отправить сообщение',
				}),
			],
		});

		this.controller = new Controller();
		this.controller.on('setCurrentChat', this.setCurrentChat.bind(this));
		this.controller.on('messageSent', this.handleMessageSend.bind(this));
		this.controller.on('fileSent', this.handleFileSend.bind(this));
		this.controller.on('mediaSent', this.handleMediaSend.bind(this));
	}

	setCurrentChat({name, avatar}: Record<string, string>) {
		this.setProps({
			content: [
				new ChatHeader({
					name,
					avatarSrc: avatar,
				}),
				new ChatMessages({
					dataMessages: MESSAGES_DATA,
				}),
				new ChatMessageForm(),
			],
		});
	}

	render() {
		return layout;
	}

	handleMessageSend() {
	}

	handleFileSend() {
	}

	handleMediaSend() {
	}
}
