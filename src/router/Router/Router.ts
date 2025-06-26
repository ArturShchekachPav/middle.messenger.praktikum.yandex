import Route from '../Route';
import { BlockConstructor, BlockPropsWithChildren } from '../../utils/types';

export default class Index {
	private static instance: Index;
	public routes: Route[] = [];
	public defaultRoute: Route | null = null;
	private history: History = window.history;
	public currentRoute: Route | null = null;
	readonly rootQuery: string = '#app';

	constructor() {
		if (Index.instance) {
			return Index.instance;
		}

		Index.instance = this;
	}

	public use(
		pathname: string,
		block: BlockConstructor,
		blockProps: BlockPropsWithChildren = {},
		RouteClass: typeof Route = Route
	): this {
		const route = new RouteClass(
			pathname,
			block,
			{ rootQuery: this.rootQuery },
			blockProps
		);
		this.routes.push(route);

		return this;
	}

	public setDefaultRoute(
		pathname: string,
		block: BlockConstructor,
		blockProps: BlockPropsWithChildren = {}
	) {
		this.defaultRoute = new Route(
			pathname,
			block,
			{ rootQuery: this.rootQuery },
			blockProps
		);

		return this;
	}

	public start(): void {
		window.onpopstate = () => {
			this.onRoute(window.location.pathname);
		};

		this.onRoute(window.location.pathname);
	}

	private onRoute(pathname: string): void {
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

	public go(pathname: string): void {
		this.history.pushState({}, '', pathname);
		this.onRoute(pathname);
	}

	public back(): void {
		this.history.back();
	}

	public forward(): void {
		this.history.forward();
	}

	private getRoute(pathname: string): Route | undefined {
		const route = this.routes.find((route) => route.match(pathname));

		if (route) {
			return route;
		} else if (this.defaultRoute) {
			return this.defaultRoute;
		} else {
			return;
		}
	}
}
