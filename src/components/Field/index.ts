import {default as layout} from './Field.hbs?raw';
import Block from '../../framework/Block.js';
import {FieldProps} from '../../utils/types';
import Component from '../../framework/Component';
import {ErrorMessage} from '../ErrorMessage';

export class Field extends Block {
	constructor({block, label, id, ErrorMessage, Input}: FieldProps) {
		super({
			block,
			id,
			label,
			ErrorMessage,
			Input,
		});
	}

	render() {
		return layout;
	}

	getFieldComponents() {
		const input = this.children.Input;
		const errorMessage = this.children.ErrorMessage;

		if (!(input instanceof Component && errorMessage instanceof ErrorMessage)) {
			return {input: null, errorMessage: null};
		}

		return {input, errorMessage};
	}
}
