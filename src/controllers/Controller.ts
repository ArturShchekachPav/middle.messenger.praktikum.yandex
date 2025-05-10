import EventBus from "../framework/EventBus";

export default class Controller extends EventBus {
	static __instance: Controller;

	constructor() {
		super();
		if (Controller.__instance) {
			return Controller.__instance;
		}

		Controller.__instance = this;
	}
}
