import Handlebars from 'handlebars';
import {
    MessangerPage,
    ServerErrorPage,
    ProfilePage,
    RegistrationPage,
    LoginPage,
    NotFoundPage
} from './pages';
import './App.scss';
import {
    Link,
    ErrorPage
} from './components';

Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('ErrorPage', ErrorPage);

export default class App {
    constructor(currentPage) {
        this.currentPage = currentPage,
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        switch (this.currentPage) {
            case '/':
                template = Handlebars.compile(MessangerPage);
                this.appElement.innerHTML = template();
                break;
            case '/500':
                template = Handlebars.compile(ServerErrorPage);
                this.appElement.innerHTML = template();
                break;
            case '/profile':
                template = Handlebars.compile(ProfilePage);
                this.appElement.innerHTML = template();
                break;
            case '/sing-up':
                template = Handlebars.compile(RegistrationPage);
                this.appElement.innerHTML = template();
                break;
            case '/sing-in':
                template = Handlebars.compile(LoginPage);
                this.appElement.innerHTML = template();
                break;
            default:
                template = Handlebars.compile(NotFoundPage);
                this.appElement.innerHTML = template();
        }
    }

    changePage(page) {
        this.currentPage = page;
        this.render();
    }
}