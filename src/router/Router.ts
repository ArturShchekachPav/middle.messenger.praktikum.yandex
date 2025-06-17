import Route from "./Route";
import {BlockConstructor} from "../utils/types";

export default class Router {
	private static instance: Router;
	private routes: Route[] = [];
	private history: History = window.history;
	private currentRoute: Route | null = null;
	readonly rootQuery: string = '#app';

	constructor() {
		if (Router.instance) {
			return Router.instance;
		}

		Router.instance = this;
	}

	public use(pathname: string, block: BlockConstructor) : this {
		const route = new Route(pathname, block, {rootQuery: this.rootQuery});
		this.routes.push(route);

		return this;
	}

	public start() : void {
		window.onpopstate = () => {
			this.onRoute(window.location.pathname);
		};

		this.onRoute(window.location.pathname);
	}

	private onRoute(pathname: string) : void {
		const route = this.getRoute(pathname);

		if (!route) {
			return;
		}

		if (this.currentRoute) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;
		route.render();
	}

	public go(pathname: string) : void {
		this.history.pushState({}, "", pathname);
		this.onRoute(pathname);
	}

	public back() : void {
		this.history.back();
	}

	public forward() : void {
		this.history.forward();
	}

	private getRoute(pathname: string) : Route | undefined {
		return this.routes.find(route => route.match(pathname));
	}
}
