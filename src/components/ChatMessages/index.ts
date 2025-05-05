import {default as layout} from './ChatMessages.hbs?raw';
import Block from "../../framework/Block.js";
import { Message } from "../index.js";
import Component from "../../framework/Component.js";

export class ChatMessages extends Block {
	constructor({dataMessages}: {dataMessages: Array<Record<string, any>>}) {
		super({
			dataMessages: dataMessages.length,
			content: dataMessages.map(dataMessagesItem => {
				if(dataMessagesItem.type === 'date') {
					return new Component({
						tag: 'p',
						attr: {
							class: 'chat__date'
						},
						content: dataMessagesItem.date
					});
				}

				return new Component({
					tag: 'div',
					attr: {
						class: `chat__block chat__block_source_${dataMessagesItem.source}`
					},
					content: dataMessagesItem.messages.map((messageData: Record<string, string>) => new Message({
						source: dataMessagesItem.source,
						time: messageData.time,
						status: messageData.status,
						text: messageData.text,
						src: messageData.src,
						addictedClass: 'chat__message'
					}))
				});
			})
		});
	}

	render() {
		return layout;
	}
}
