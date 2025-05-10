import {
	AddMediaPopup,
	ErrorPage,
	LoginForm,
	AddFilePopup,
	AddUserPopup,
	RemoveUserPopup,
	ChangeAvatarPopup
} from "./components";
import './App.scss';
import {LoginPage, MessangerPage, ProfilePage, RegistrationPage} from "./pages";
import Controller from "./controllers";
import {RegisterForm} from "./components/RegisterForm";

export default class App {
	readonly appElement: HTMLElement | null;
	private currentPage: string;
	private isLoggedIn: boolean;

	constructor(currentPage: string) {
		this.currentPage = currentPage;
		this.appElement = document.getElementById('app');
		this.userData = {};
		this.chatsData = [];
		this.isLoggedIn = false;
		this.controller = new Controller();

		this.onChangePage = this.onChangePage.bind(this);
		this.handleLoggedIn = this.handleLoggedIn.bind(this);
		this.handleLogOut = this.handleLogOut.bind(this);
		this.handleChangePasswordData = this.handleChangePasswordData.bind(this);
		this.handleChangeProfileData = this.handleChangeProfileData.bind(this);
		this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
		this.handleUpdateChatsList = this.handleUpdateChatsList.bind(this);

		this.controller.on('loggedIn', this.handleLoggedIn);
		this.controller.on('loggedOut', this.handleLogOut);
		this.controller.on('changePage', this.onChangePage);
		this.controller.on('passwordChanged', this.handleChangePasswordData);
		this.controller.on('userDataEdited', this.handleChangeProfileData);
		this.controller.on('avatarChanged', this.handleChangeAvatar);
		this.controller.on('chadAdded', this.handleUpdateChatsList);
		this.controller.on('chadRemoved', this.handleUpdateChatsList);
	}

	render() {
		switch (this.currentPage) {
			case '/':
				if(!this.isLoggedIn) {
					this.onChangePage('/sing-in');
					return;
				}

				const addMediaPopup = new AddMediaPopup();
				const addFilePopup = new AddFilePopup();
				const addUserPopup = new AddUserPopup();
				const removeUserPopup = new RemoveUserPopup();

				const messangerPage = new MessangerPage({
					chats: this.chatsData
				});

				this.appElement.replaceChildren(
					messangerPage.getContent(),
					addMediaPopup.getContent(),
					addFilePopup.getContent(),
					addUserPopup.getContent(),
					removeUserPopup.getContent()
				);

				break;
			case '/profile':
				if(!this.isLoggedIn) {
					this.onChangePage('/sing-in');
					return;
				}

				const changeAvatarPopup = new ChangeAvatarPopup();

				const profilePage = new ProfilePage(this.userData);

				if (this.appElement) {
					this.appElement.replaceChildren(
						profilePage.getContent(),
						changeAvatarPopup.getContent()
					);
				}

				break;
			case '/sing-up':
				if(this.isLoggedIn) {
					this.onChangePage('/');
					return;
				}

				const registrationForm = new RegisterForm();

				const registrationPage = new RegistrationPage({
					RegisterForm: registrationForm,
				});

				if (this.appElement) {
					this.appElement.replaceChildren(registrationPage.getContent());
				}

				break;
			case '/sing-in':
				if(this.isLoggedIn) {
					this.onChangePage('/');
					return;
				}

				const loginForm = new LoginForm();

				const loginPage = new LoginPage({
					LoginForm: loginForm,
				});

				if (this.appElement) {
					this.appElement.replaceChildren(loginPage.getContent());
				}

				break;
			case '/500':
				const serverErrorPage = new ErrorPage({
					error: '500',
					message: 'Мы уже фиксим',
				});

				if (this.appElement) {
					this.appElement.replaceChildren(serverErrorPage.getContent());
				}

				break;
			default:
				const NotFoundErrorPage = new ErrorPage({
					error: '404',
					message: 'Мы уже фиксим',
				});

				if (this.appElement) {
					this.appElement.replaceChildren(NotFoundErrorPage.getContent());
				}
		}
	}

	onChangePage(page: string) {
		this.currentPage = page;
		history.pushState(null, '', page);

		this.render();
	}

	handleLoggedIn ({ userData, chats }) {
		this.isLoggedIn = true;

		this.userData = userData;
		this.chatsData = chats;

		this.onChangePage('/');
	}

	handleLogOut() {
		this.isLoggedIn = false;

		this.userData = {};

		this.onChangePage('/sing-in');
	}

	handleChangeProfileData(userData) {
		this.userData = {
			...this.userData,
			...userData
		};

		this.controller.emit('disableEditProfileForm');

		this.controller.emit('showProfileActions');
	}

	handleChangePasswordData(userData) {
		this.userData = {
			...this.userData,
			...userData
		};

		this.controller.emit('showEditProfileForm');
		this.controller.emit('showProfileActions');

		this.controller.emit('hideEditPasswordForm');
	}

	handleChangeAvatar(userData) {
		this.userData = {
			...this.userData,
			...userData
		};
	}

	handleUpdateChatsList(chats) {
		this.controller.emit('updateChatsList', chats);
	}
}
