import {LoginPage, MessangerPage, NotFoundPage, ProfilePage, RegistrationPage, ServerErrorPage,} from './pages/index.js';
import './App.scss';
import {CHATS_DATA} from "./utils/constants";
import {AddFileForm, LoginForm, Popup, UserActionForm} from "./components/index";
import {RegisterForm} from "./components/RegisterForm/index";

export default class App {
	private currentPage: string;
	readonly appElement: HTMLElement | null;

	constructor(currentPage: string) {
		this.currentPage = currentPage;
		this.appElement = document.getElementById('app');
		this.changePage = this.changePage.bind(this);
	}

	render() {
		switch (this.currentPage) {
			case '/':
				const addMediaPopup = new Popup({
					isOpen: false,
					content: new AddFileForm({
						formName: 'add-media-file',
						inputName: 'file',
						buttonText: 'Добавить',
						title: 'Добавить фото/видео',
						onSuccessAction: () => {
							addMediaPopup.close();
						}
					})
				});
				const addFilePopup = new Popup({
					isOpen: false,
					content: new AddFileForm({
						formName: 'add-file',
						inputName: 'file',
						buttonText: 'Добавить',
						title: 'Добавить файл',
						onSuccessAction: () => {
							addFilePopup.close();
						}
					})
				});
				const addUserPopup = new Popup({
					isOpen: false,
					content: new UserActionForm({
						name: 'add-user',
						buttonText: 'Добавить',
						title: 'Добавить пользователя',
						onSuccessAction: () => {
							addUserPopup.close();
						}
					})
				});
				const removeUserPopup = new Popup({
					isOpen: false,
					content: new UserActionForm({
						name: 'remove-user',
						buttonText: 'Удалить',
						title: 'Удалить пользователя',
						onSuccessAction: () => {
							removeUserPopup.close();
						}
					})
				});

				const messangerPage = new MessangerPage({
					chats: CHATS_DATA,
					popups: {
						addMediaPopup,
						addFilePopup,
						addUserPopup,
						removeUserPopup
					},
					onChangePage: this.changePage
				});

				if(this.appElement) {
					this.appElement.replaceChildren(
						messangerPage.getContent(),
						addMediaPopup.getContent(),
						addFilePopup.getContent(),
						addUserPopup.getContent(),
						removeUserPopup.getContent()
					);
				}

				break;
			case '/profile':
				const changeAvatarPopup = new Popup({
					content: new AddFileForm({
						formName: 'change-avatar',
						inputName: 'avatar',
						buttonText: 'Заменить',
						title: 'Изменить аватар',
						onSuccessAction: () => {
							changeAvatarPopup.close()
						}
					}),
					isOpen: false
				});

				const profilePage = new ProfilePage({
					email: 'pochta@yandex.ru',
					login: 'ivanivanov',
					first_name: 'Иван',
					second_name: 'Иванов',
					display_name: 'Иван',
					phone: '+79099673030',
					avatar: '/default-avatar.png',
					onChangePage: this.changePage,
					changeAvatarPopup
				});

				if(this.appElement) {
					this.appElement.replaceChildren(
						profilePage.getContent(),
						changeAvatarPopup.getContent()
					);
				}

				break;
			case '/sing-up':
				const registrationPage = new RegistrationPage({
					RegisterForm: new RegisterForm({
						onPageChange: this.changePage
					})
				});

				if(this.appElement) {
					this.appElement.replaceChildren(registrationPage.getContent());
				}

				break;
			case '/sing-in':
				const loginPage = new LoginPage({
					LoginForm: new LoginForm({
						onPageChange: this.changePage
					})
				});

				if(this.appElement) {
					this.appElement.replaceChildren(loginPage.getContent());
				}

				break;
			case '/500':
				const serverErrorPage = new ServerErrorPage();

				if(this.appElement) {
					this.appElement.replaceChildren(serverErrorPage.getContent());
				}

				break;
			default:
				const notFoundPage = new NotFoundPage({onChangePage: this.changePage});

				if(this.appElement) {
					this.appElement.replaceChildren(notFoundPage.getContent());
				}
		}
	}

	changePage(page: string) {
		this.currentPage = page;
		history.pushState(null, '', page);

		this.render();
	}
}
