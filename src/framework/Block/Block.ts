import EventBus from '../EventBus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';
import {
	BlockChildren,
	BlockList,
	BlockPropsWithChildren,
	BlockSimpleProps,
} from '../../utils/types';

export default abstract class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	} as const;
	public children: BlockChildren;
	protected _id: string = makeUUID();
	public props: BlockSimpleProps;
	public lists: BlockList;
	protected eventBus: () => EventBus;

	constructor(propsWithChildren: BlockPropsWithChildren = {}) {
		const eventBus = new EventBus();
		const { props, children, lists } =
			this._getChildrenPropsAndProps(propsWithChildren);
		this.props = this._makePropsProxy<BlockSimpleProps>({ ...props });
		this.children = this._makePropsProxy<BlockChildren>({ ...children });
		this.lists = this._makePropsProxy<BlockList>({ ...lists });
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	protected _element: HTMLElement | null = null;

	get element(): HTMLElement | null {
		return this._element;
	}

	public dispatchComponentDidMount(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	setAttributes(attr: Record<string, string | number | boolean>): void {
		Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value.toString());
			}
		});
	}

	public setProps(nextProps: BlockPropsWithChildren): void {
		if (!nextProps) {
			return;
		}

		const { props, children, lists } =
			this._getChildrenPropsAndProps(nextProps);

		if (Object.entries(props).length) {
			Object.assign(this.props, props);
		}

		if (Object.entries(children).length) {
			Object.assign(this.children, children);
		}

		if (Object.entries(lists).length) {
			Object.assign(this.lists, lists);
		}
	}

	public getContent(): HTMLElement {
		if (!this._element) {
			throw new Error('Element is not created');
		}
		return this._element;
	}

	public show(): void {
		const content = this.getContent();

		if (content) {
			content.style.removeProperty('display');
		}
	}

	public hide(): void {
		const content = this.getContent();

		if (content) {
			content.style.display = 'none';
		}
	}

	public removeAttributes(attr: string[]): void {
		attr.forEach((attribute) => {
			if (this._element) {
				this._element.removeAttribute(attribute);
			}
		});
	}

	protected init(): void {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	protected componentDidMount(): void {}

	protected componentDidUpdate(
		oldProps: BlockPropsWithChildren,
		newProps: BlockPropsWithChildren
	): boolean {
		console.log(oldProps, newProps);
		return true;
	}

	protected addAttributes(): void {
		const { attr = {} } = this.props;

		Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value as string);
			}
		});
	}

	protected render(): string {
		return '';
	}

	private _addEvents(): void {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			if (this._element) {
				this._element.addEventListener(eventName, events[eventName]);
			}
		});
	}

	private _removeEvents(): void {
		const { events = {} } = this.props;
		Object.keys(events).forEach((eventName) => {
			if (this._element) {
				this._element.removeEventListener(eventName, events[eventName]);
			}
		});
	}

	private _registerEvents(eventBus: EventBus): void {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	private _componentDidMount(): void {
		this.componentDidMount();
	}

	private _componentDidUpdate(
		oldProps: BlockPropsWithChildren,
		newProps: BlockPropsWithChildren
	): void {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	private _getChildrenPropsAndProps(propsAndChildren: BlockPropsWithChildren): {
		children: BlockChildren;
		props: BlockSimpleProps;
		lists: BlockList;
	} {
		const children: BlockChildren = {};
		const props: BlockSimpleProps = {};
		const lists: BlockList = {};

		Object.entries(propsAndChildren).forEach(([key, value]) => {
			if (value instanceof Block) {
				children[key] = value;
			} else if (Array.isArray(value)) {
				lists[key] = value;
			} else {
				props[key] = value;
			}
		});

		return { children, props, lists };
	}

	private _render(): void {
		console.log('Render');
		const propsAndStubs = { ...this.props };
		const tmpId = makeUUID();
		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});

		Object.entries(this.lists).forEach(([key]) => {
			propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
		});

		const fragment = this._createDocumentElement('template');
		fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

		Object.values(this.children).forEach((child) => {
			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
			if (stub) {
				stub.replaceWith(child.getContent());
			}
		});

		Object.entries(this.lists).forEach(([, child]) => {
			const listCont = this._createDocumentElement('template');
			child.forEach((item) => {
				if (item instanceof Block) {
					listCont.content.append(item.getContent());
				} else {
					listCont.content.append(`${item}`);
				}
			});
			const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
			if (stub) {
				stub.replaceWith(listCont.content);
			}
		});

		const newElement = fragment.content.firstElementChild as HTMLElement;

		if (this._element && newElement) {
			this._removeEvents();

			this._element.replaceWith(newElement);
		}

		this._element = newElement;
		this._addEvents();
		this.addAttributes();

		this._componentDidMount();
	}

	private _makePropsProxy<Type extends Record<string, unknown>>(
		props: Type
	): Type {
		const self = this;

		return new Proxy<Type>(props, {
			get(target: Record<string, unknown>, prop: string) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Record<string, unknown>, prop: string, value: unknown) {
				const oldTarget = { ...target };
				target[prop] = value;
				self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
				return true;
			},
			deleteProperty() {
				throw new Error('No access');
			},
		});
	}

	private _createDocumentElement(tagName: string): HTMLTemplateElement {
		return document.createElement(tagName) as HTMLTemplateElement;
	}
}
