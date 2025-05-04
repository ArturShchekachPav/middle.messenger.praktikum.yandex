import EventBus from './EventBus';
import Handlebars from 'handlebars';
import { v4 as makeUUID } from 'uuid';

export default class Block {
	static EVENTS = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	_element = null;

	_id = makeUUID();

	constructor(propsWithChildren = {}) {
		const eventBus = new EventBus();
		const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
		this.props = this._makePropsProxy({ ...props });
		this.children = this._makePropsProxy({ ...children });
		this.lists = this._makePropsProxy({ ...lists });
		this.eventBus = () => eventBus;
		this._registerEvents(eventBus);
		eventBus.emit(Block.EVENTS.INIT);
	}

	_addEvents() {
		const { events = {} } = this.props;
		Object.keys(events).forEach(eventName => {
			if (this._element) {
				this._element.addEventListener(eventName, events[eventName]);
			}
		});
	}

	_registerEvents(eventBus) {
		eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
		eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
		eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	init() {
		this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
	}

	_componentDidMount() {
		this.componentDidMount();
		Object.values(this.children).forEach(child => {child.dispatchComponentDidMount();});
	}

	componentDidMount() {}

	dispatchComponentDidMount() {
		this.eventBus().emit(Block.EVENTS.FLOW_CDM);
	}

	_componentDidUpdate(oldProps, newProps) {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	}

	componentDidUpdate(oldProps, newProps) {
		console.log(oldProps, newProps);
		return true;
	}

	_getChildrenPropsAndProps(propsAndChildren) {
		const children = {};
		const props = {};
		const lists = {};

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

	addAttributes() {
		const { attr = {} } = this.props;

		Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value);
			}
		});
	}

	setAttributes(attr) {
		Object.entries(attr).forEach(([key, value]) => {
			if (this._element) {
				this._element.setAttribute(key, value);
			}
		});
	}

	removeAttributes(attr) {
		attr.forEach(attribute => {
			if (this._element) {
				this._element.removeAttribute(attribute);
			}
		});
	}

	setProps = (nextProps) => {
		if (!nextProps) {
			return;
		}

		const { props, children, lists } = this._getChildrenPropsAndProps(nextProps);

		if(Object.entries(props).length) {
			Object.assign(this.props, props);
		}

		if(Object.entries(children).length) {
			Object.assign(this.children, children);
		}

		if(Object.entries(lists).length) {
			Object.assign(this.lists, lists);
		}
	};

	get element() {
		return this._element;
	}

	_render() {
		console.log('Render');
		const propsAndStubs = { ...this.props };
		const tmpId =  makeUUID();
		Object.entries(this.children).forEach(([key, child]) => {
			propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
		});

		Object.entries(this.lists).forEach(([key]) => {
			propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
		});

		const fragment = this._createDocumentElement('template');
		fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

		Object.values(this.children).forEach(child => {
			const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
			if (stub) {
				stub.replaceWith(child.getContent());
			}
		});

		Object.entries(this.lists).forEach(([, child]) => {
			const listCont = this._createDocumentElement('template');
			child.forEach(item => {
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

		const newElement = fragment.content.firstElementChild;

		if (this._element && newElement) {
			this._element.replaceWith(newElement);
		}

		this._element = newElement;
		this._addEvents();
		this.addAttributes();
	}

	render() {
		return '';
	}

	getContent() {
		if (!this._element) {
			throw new Error('Element is not created');
		}
		return this._element;
	}

	_makePropsProxy(props) {
		const self = this;

		return new Proxy(props, {
			get(target, prop) {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target, prop, value) {
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

	_createDocumentElement(tagName) {
		return document.createElement(tagName);
	}

	show() {
		const content = this.getContent();

		if (content) {
			content.style.removeProperty('display');
		}
	}

	hide() {
		const content = this.getContent();

		if (content) {
			content.style.display = 'none';
		}
	}
}
