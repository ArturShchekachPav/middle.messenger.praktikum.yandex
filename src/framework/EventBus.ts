import {EventCallback} from '../utils/types';

export default class EventBus {
	private listeners: Record<string, EventCallback[]>;

	constructor() {
		this.listeners = {};
	}

	public on<T extends unknown[]>(
		event: string,
		callback: EventCallback<T>
	): void {
		if (!this.listeners[event]) {
			this.listeners[event] = [];
		}

		this.listeners[event].push(callback as EventCallback);
	}

	public off(event: string, callback: EventCallback): void {
		if (!this.listeners[event]) {
			throw new Error(`No event: ${event}`);
		}

		this.listeners[event] = this.listeners[event].filter(
			(listener) => listener !== callback
		);
	}

	public emit<T extends unknown[]>(event: string, ...args: T): void {
		if (!this.listeners[event]) {
			throw new Error(`No event: ${event}`);
		}

		this.listeners[event].forEach((listener) => {
			listener(...args);
		});
	}
}
