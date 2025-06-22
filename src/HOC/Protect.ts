import {BlockConstructor, BlockPropsWithChildren, Indexed, RouteProps, StateType} from "../utils/types";
import Store, { StoreEvents } from "../store/Store";
import Route from "../router/Route";
import Router from "../router/Router";
import {isEqual} from "../utils/utils";

export default function Protect(mapStateToProps: (state: StateType) => Indexed, redirectPath: string, needleValue: Indexed) {
	return function (ProtectedRoute: typeof Route) {
		return class extends ProtectedRoute {
			private store: Store = new Store();
			private redirectPath: string = redirectPath;
			private needleValue: Indexed = needleValue;
			private router: Router = new Router();

			constructor(pathname: string, view: BlockConstructor, props: RouteProps, blockProps: BlockPropsWithChildren) {
				super(pathname, view, props, blockProps);

				this.store.on(StoreEvents.Updated, () => {
					console.log();
					if(this.pathname === window.location.pathname && !this.matchState()) {
						this.redirect();
					}
				});
			}

			private getState() {
				return mapStateToProps(this.store.getState());
			}

			private redirect() {
				this.router.go(this.redirectPath);
			}

			private matchState() {
				return isEqual(this.getState(), this.needleValue);
			}

			render() {
				if(this.matchState()) {
					super.render();
				} else {
					this.redirect();
				}
			}
		}
	}
}
