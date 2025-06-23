import './styles.scss';
import {default as template} from './template.hbs?raw';
import Block from '../../framework/Block.js';
import { MessageType } from '../../utils/types';

export class Message extends Block {
	constructor({message}: {message: MessageType}) {
		super(message);
	}

	render() {
		return template;
	}
}
