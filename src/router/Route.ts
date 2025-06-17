import {render} from "../utils/utils";
import Block from "../framework/Block";
import {BlockConstructor, RouteProps} from "../utils/types";

export default class Route {
	private pathname: string;
	private blockClass: BlockConstructor;
	private block: Block | null;
	private props: RouteProps;


	constructor(pathname: string, view: BlockConstructor, props: RouteProps) {
		this.pathname = pathname;
		this.blockClass = view;
		this.block = null;
		this.props = props;
	}

	public navigate(pathname: string) : void {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		}
	}

	public leave() : void {
		if (this.block) {
			this.block.hide();
		}
	}

	public match(pathname: string) {
		return pathname === this.pathname;
	}

	public render() : void {
		if (!this.block) {
			this.block = new this.blockClass();
			render(this.props.rootQuery, this.block);
			return;
		}

		this.block.show();
	}
}
