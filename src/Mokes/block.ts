import Block from "../framework/Block/Block";

export class TestBlock extends Block {
	render() {
		return '<div>Content</div>';
	}

	getId() {
		return this._id;
	}
}

export class TestBlockWithContent extends Block {
	render() {
		return '<div>{{{Content}}}</div>';
	}
}

export const mockHandler = jest.fn();

export const attributes = { id: 'id', class: 'class' };
