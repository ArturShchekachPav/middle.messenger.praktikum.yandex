import { render } from '../utils/utils';
import Block from '../framework/Block';
import {
	BlockConstructor,
	BlockPropsWithChildren,
	RouteProps,
} from '../utils/types';

export default class Route {
	protected pathname: string;
	private blockClass: BlockConstructor;
	private block: Block | null;
	private props: RouteProps;
	private blockProps: BlockPropsWithChildren;

	constructor(
		pathname: string,
		view: BlockConstructor,
		props: RouteProps,
		blockProps: BlockPropsWithChildren
	) {
		this.pathname = pathname;
		this.blockClass = view;
		this.block = null;
		this.props = props;
		this.blockProps = blockProps;
	}

	public navigate(pathname: string): void {
		if (this.match(pathname)) {
			this.pathname = pathname;
			this.render();
		}
	}

	public leave(): void {
		this.block = null;
	}

	public match(pathname: string) {
		return pathname === this.pathname;
	}

	public render(): void {
		this.block = new this.blockClass(this.blockProps);
		render(this.props.rootQuery, this.block);
	}
}
