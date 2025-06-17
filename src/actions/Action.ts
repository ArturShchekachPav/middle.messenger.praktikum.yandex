import Store from "../store/Store";

export default abstract class Action {
	protected store: Store = new Store();
}
