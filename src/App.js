import Handlebars from 'handlebars';
import {
  MessangerPage,
  ServerErrorPage,
  ProfilePage,
  RegistrationPage,
  LoginPage,
  NotFoundPage,
} from './pages';
import './App.scss';
import {
  Link,
  ErrorPage,
  Message,
  ChatPreview,
  Button,
  Field,
} from './components';

Handlebars.registerPartial('Link', Link);
Handlebars.registerPartial('ErrorPage', ErrorPage);
Handlebars.registerPartial('Message', Message);
Handlebars.registerPartial('ChatPreview', ChatPreview);
Handlebars.registerPartial('Button', Button);
Handlebars.registerPartial('Field', Field);

export default class App {
  constructor(currentPage) {
    (this.currentPage = currentPage),
      (this.appElement = document.getElementById('app'));
  }

  render() {
    let template;
    switch (this.currentPage) {
      case '/':
        template = Handlebars.compile(MessangerPage);
        this.appElement.innerHTML = template();

        this.setRoutingLinks();

        this.menuAddFile = document.querySelector('#add-file-menu');
        this.menuChat = document.querySelector('#chat-menu');

        this.addMediaPopup = document.querySelector('#popup-add-media');
        this.addFilePopup = document.querySelector('#popup-add-file');
        this.addUserPopup = document.querySelector('#popup-add-user');
        this.removeUserPopup = document.querySelector('#popup-delete-user');

        this.addMediaPopupButton = document.querySelector('#button-add-media');
        this.addFilePopupButton = document.querySelector('#button-add-file');
        this.addUserPopupButton = document.querySelector('#button-add-user');
        this.removeUserPopupButton = document.querySelector(
          '#button-delete-user'
        );

        this.buttonAddFile = document.querySelector(
          '.chat-window__file-button'
        );
        this.buttonChatOptions = document.querySelector(
          '.chat-window__options-button'
        );

        this.buttonAddFile.addEventListener('click', () => {
          this.menuAddFile.classList.toggle('menu_open');
        });

        this.buttonChatOptions.addEventListener('click', () => {
          this.menuChat.classList.toggle('menu_open');
        });

        this.addMediaPopup.addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
            this.addMediaPopup.classList.remove('popup_open');
          }
        });
        this.addFilePopup.addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
            this.addFilePopup.classList.remove('popup_open');
          }
        });
        this.addUserPopup.addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
            this.addUserPopup.classList.remove('popup_open');
          }
        });
        this.removeUserPopup.addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
            this.removeUserPopup.classList.remove('popup_open');
          }
        });

        this.addMediaPopupButton.addEventListener('click', () => {
          this.addMediaPopup.classList.add('popup_open');
        });
        this.addFilePopupButton.addEventListener('click', () => {
          this.addFilePopup.classList.add('popup_open');
        });
        this.addUserPopupButton.addEventListener('click', () => {
          this.addUserPopup.classList.add('popup_open');
        });
        this.removeUserPopupButton.addEventListener('click', () => {
          this.removeUserPopup.classList.add('popup_open');
        });
        break;
      case '/500':
        template = Handlebars.compile(ServerErrorPage);
        this.appElement.innerHTML = template();

        this.setRoutingLinks();
        break;
      case '/profile':
        template = Handlebars.compile(ProfilePage);
        this.appElement.innerHTML = template();

        this.setRoutingLinks();

        this.avatarEditButton = document.querySelector('#edit-avatar-button');
        this.commonDataEditButton = document.querySelector(
          '#edit-common-data-button'
        );
        this.changePasswordButton = document.querySelector(
          '#edit-password-button'
        );
        this.singOutButton = document.querySelector('#sing-out-button');

        this.profileOptions = document.querySelector('#profile-options');
        this.commonDataSumbitAction = document.querySelector(
          '#common-data-submit-action'
        );

        this.changePasswordForm = document.forms.profilePassword;
        this.changeCommonDataForm = document.forms.profileCommon;
        console.log(this.changeCommonDataForm);

        this.popupAvatarEdit = document.querySelector('#popup-avatar-edit');

        this.profileName = document.querySelector('.profile__name');

        this.avatarEditButton.addEventListener('click', () => {
          this.popupAvatarEdit.classList.add('popup_open');
        });
        this.commonDataEditButton.addEventListener('click', () => {
          this.profileOptions.classList.add('profile__actions_hide');
          this.commonDataSumbitAction.classList.remove('profile__actions_hide');
          this.profileName.classList.add('profile__name_hidden');

          const fields = Array.from(
            this.changeCommonDataForm.querySelectorAll('.profile__input')
          );
          console.log(fields);
          fields.forEach((field) => field.removeAttribute('disabled'));
        });
        this.changePasswordButton.addEventListener('click', () => {
          this.changeCommonDataForm.classList.add('profile__form_hide');
          this.changePasswordForm.classList.remove('profile__form_hide');
        });
        this.singOutButton.addEventListener('click', () => {
          this.changePage('/sing-in');
        });

        this.popupAvatarEdit.addEventListener('click', (e) => {
          if (e.target === e.currentTarget) {
            this.popupAvatarEdit.classList.remove('popup_open');
          }
        });

        this.changeCommonDataForm.addEventListener('submit', (e) => {
          e.preventDefault();

          this.profileOptions.classList.remove('profile__actions_hide');
          this.commonDataSumbitAction.classList.add('profile__actions_hide');
          this.profileName.classList.remove('profile__name_hidden');

          const fields = Array.from(
            this.changeCommonDataForm.querySelectorAll('.profile__input')
          );
          console.log(fields);
          fields.forEach((field) => field.setAttribute('disabled', true));
        });
        this.changePasswordForm.addEventListener('submit', (e) => {
          e.preventDefault();

          this.changeCommonDataForm.classList.remove('profile__form_hide');
          this.changePasswordForm.classList.add('profile__form_hide');
        });

        break;
      case '/sing-up':
        template = Handlebars.compile(RegistrationPage);
        this.appElement.innerHTML = template();

        this.setRoutingLinks();

        this.registration = document.forms.registration;

        this.registration.addEventListener('submit', (e) => {
          e.preventDefault();

          this.changePage('/sing-in');
        });
        break;
      case '/sing-in':
        template = Handlebars.compile(LoginPage);
        this.appElement.innerHTML = template();

        this.setRoutingLinks();

        this.loginForm = document.forms.login;

        this.loginForm.addEventListener('submit', (e) => {
          e.preventDefault();

          this.changePage('/');
        });
        break;
      default:
        template = Handlebars.compile(NotFoundPage);
        this.appElement.innerHTML = template();

        this.setRoutingLinks();
    }
  }

  changePage(page) {
    this.currentPage = page;
    history.pushState(null, null, page);

    this.render();
  }

  setRoutingLinks() {
    const routingLinks = Array.from(document.querySelectorAll('a[data-page]'));

    routingLinks.forEach((routingLink) => {
      routingLink.addEventListener('click', (e) => {
        e.preventDefault();

        const page = routingLink.dataset.page;

        this.changePage(page);
      });
    });
  }
}
