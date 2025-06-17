import Router from "./router/Router";
import {LoginPage, MessangerPage, ProfilePage, RegistrationPage} from "./pages";
import './App.scss';

export default class App {
	private router: Router = new Router();

	enable() {
		this.router
			.use("/", LoginPage)
			.use("/sing-up", RegistrationPage)
			.use("/settings", ProfilePage)
			.use("/messanger", MessangerPage)
			.start();
	}
}
