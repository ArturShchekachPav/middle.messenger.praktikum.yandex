import {default as layout} from './Field.hbs?raw';
import Block from '../../framework/Block.js';
import {FieldProps} from '../../utils/types';

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
}
