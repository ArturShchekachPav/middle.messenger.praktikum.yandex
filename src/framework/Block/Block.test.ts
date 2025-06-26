/**
 * @jest-environment jsdom
 */

import {
	attributes,
	mockHandler,
	TestBlock,
	TestBlockWithContent,
} from '../../Mokes/block';

describe('Block', () => {
	let block: TestBlock;

	beforeEach(() => {
		block = new TestBlock();
	});

	it('should generate id', () => {
		expect(block.getId).toBeDefined();
	});

	it('should generate unique id', () => {
		const block2 = new TestBlock();
		expect(block.getId()).not.toBe(block2.getId());
	});

	it('should set props', () => {
		const newProps = { testProp: 'value' };

		block.setProps(newProps);
		expect(block.props).toEqual(expect.objectContaining(newProps));
	});

	it('should handle childrenBlocks in props', () => {
		const childBlock = new TestBlock();

		block.setProps({ child: childBlock });
		expect(block.children.child).toBe(childBlock);
	});

	it('should handle listsOfBlocks in props', () => {
		const listItems = [new TestBlock(), new TestBlock()];

		block.setProps({ items: listItems });
		expect(block.lists.items).toEqual(listItems);
	});

	it('should handle events in initial props', () => {
		const anotherBlock = new TestBlock({ events: { click: mockHandler } });
		const element = anotherBlock.getContent();

		element.dispatchEvent(new Event('click'));

		expect(mockHandler).toHaveBeenCalled();
	});

	it('should hide element', () => {
		const content = block.getContent();

		block.hide();
		expect(content.style.display).toBe('none');
	});

	it('should show element', () => {
		const content = block.getContent();

		block.hide();
		block.show();

		expect(content.style.display).toBe('');
	});

	it('should set attributes', () => {
		block.setAttributes(attributes);
		const element = block.getContent();

		expect(
			Object.keys(attributes).reduce(
				(acum, attr) => ({
					...acum,
					[attr]: element.getAttribute(attr),
				}),
				{}
			)
		).toStrictEqual(attributes);
	});

	it('should delete attributes', () => {
		const anotherBlock = new TestBlock({ attr: attributes });
		const element = anotherBlock.getContent();

		anotherBlock.removeAttributes(Object.keys(attributes));

		expect(
			Object.keys(attributes).reduce(
				(acum, attr) => ({
					...acum,
					[attr]: element.getAttribute(attr),
				}),
				{}
			)
		).not.toStrictEqual(attributes);
	});

	it('should update simple props', () => {
		const testBlockWithContent = new TestBlockWithContent({
			content: 'before',
		});
		const beforeContent = testBlockWithContent.props;

		block.setProps({ content: 'after' });
		const afterContent = testBlockWithContent.props;

		expect(beforeContent).not.toStrictEqual(afterContent);
	});
});
