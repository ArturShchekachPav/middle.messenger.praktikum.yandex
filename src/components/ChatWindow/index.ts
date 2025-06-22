import Block from '../../framework/Block';
import Component from '../../framework/Component';
import {ChatHeader, ChatMessageForm, ChatMessages} from '../index';
import {MESSAGES_DATA} from '../../utils/constants';
import Actions from '../../actions';
import {default as template} from './template.hbs?raw';

export class ChatWindow extends Block {
	private actions: Actions;

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

		this.actions = new Actions();
		this.actions.on('setCurrentChat', this.setCurrentChat.bind(this));
		this.actions.on('messageSent', this.handleMessageSend.bind(this));
		this.actions.on('fileSent', this.handleFileSend.bind(this));
		this.actions.on('mediaSent', this.handleMediaSend.bind(this));
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
		return template;
	}

	handleMessageSend() {
	}

	handleFileSend() {
	}

	handleMediaSend() {
	}
}
