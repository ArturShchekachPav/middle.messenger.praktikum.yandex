import Handlebars from 'handlebars';
import * as Pages from './pages';

export default class App {
    constructor(currentPage) {
        this.currentPage = currentPage,
        this.appElement = document.getElementById('app');
    }

    render() {
        let template;
        switch (this.currentPage) {
            case '/':
                template = Handlebars.compile(Pages.MessangerPage);
                this.appElement.innerHTML = template();
                break;
            case '/500':
                template = Handlebars.compile(Pages.ServerErrorPage);
                this.appElement.innerHTML = template();
                break;
            case '/404':
                template = Handlebars.compile(Pages.NotFoundPage);
                this.appElement.innerHTML = template();
                break;
            case '/profile':
                template = Handlebars.compile(Pages.Profile);
                this.appElement.innerHTML = template();
                break;
            case '/sing-up':
                template = Handlebars.compile(Pages.RegistrationPage);
                this.appElement.innerHTML = template();
                break;
            case '/sing-in':
                template = Handlebars.compile(Pages.LoginPage);
                this.appElement.innerHTML = template();
                break;
        }
    }

    changePage(page) {
        this.currentPage = page;
        this.render();
    }
}