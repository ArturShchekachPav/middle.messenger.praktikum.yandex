import Router from '../router/Router/Router';
import {
	LoginPage,
	MessangerPage,
	SettingsPage,
	RegistrationPage,
	ErrorPage,
} from '../pages';
import './style.scss';
import Actions from '../actions';
import withIsLoggedIn from '../HOC/withIsLoggedIn';
import Block from '../framework/Block/Block';
import protectAuthorizedUsers from '../HOC/protectAuthorizedUsers';
import Route from '../router/Route';
import protectUnauthorizedUsers from '../HOC/protectUnauthorizedUsers';

class App extends Block {
	private router: Router = new Router();
	private actions: Actions = new Actions();

	constructor({ isLoggedIn }: { isLoggedIn: boolean }) {
		super({
			isLoggedIn,
		});
	}

	public load() {
		this.actions.getUserAndChats().catch(console.log);
	}

	protected render(): string {
		return super.render();
	}

	protected componentDidMount() {
		if (this.props.isLoggedIn !== null) {
			this.enable();
		}
	}

	enable() {
		this.router
			.use('/', LoginPage, {}, protectAuthorizedUsers(Route))
			.use('/sing-up', RegistrationPage, {}, protectAuthorizedUsers(Route))
			.use('/settings', SettingsPage, {}, protectUnauthorizedUsers(Route))
			.use('/messanger', MessangerPage, {}, protectUnauthorizedUsers(Route))
			.use('/500', ErrorPage, {
				error: '500',
				message: 'Мы уже фиксим',
			})
			.setDefaultRoute('/404', ErrorPage, {
				error: '404',
				message: 'Страница не найдена',
			})
			.start();
	}
}

export default withIsLoggedIn(App);
