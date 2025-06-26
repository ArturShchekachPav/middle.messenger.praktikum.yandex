import Block from '../framework/Block';
import { BlockPropsWithChildren, Indexed, StateType } from '../utils/types';
import { isEqual } from '../utils/utils';
import Store, { StoreEvents } from '../store/Store';

export default function Connect(
	mapStateToProps: (state: StateType) => Indexed
) {
	const store = new Store();

	return function (Component: typeof Block) {
		return class extends Component {
			constructor(props: BlockPropsWithChildren = {}) {
				let state = mapStateToProps(store.getState());

				super({ ...props, ...state });

				store.on(StoreEvents.Updated, () => {
					const newState = mapStateToProps(store.getState());

					if (!isEqual(state, newState)) {
						this.setProps({ ...newState });
					}

					state = newState;
				});
			}
		};
	};
}
