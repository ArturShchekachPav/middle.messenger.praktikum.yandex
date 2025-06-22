import {StateType} from '../utils/types';
import EventBus from "../framework/EventBus";
import { set } from "../utils/utils";

export enum StoreEvents {
	Updated = 'updated',
}

export default class Store extends EventBus {
	private static instance: Store;
	private state: StateType = {
		isLoggedIn: null,
		currentUser: null,
		chats: [],
		currentChat: null
	};

	constructor() {
		super();

		if (Store.instance) {
			return Store.instance;
		}

		Store.instance = this;
	}

	public getState() {
		return this.state;
	}

	public set(path: string, value: unknown) {
		set(this.state, path, value);

		this.emit(StoreEvents.Updated);
	};
}
