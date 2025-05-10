import user from '../models/user';
import Controller from './Controller';

const controller = new Controller();

export default function () {
	controller.on('login', user.login);
	controller.on('register', user.register);
	controller.on('editUserData', user.editUserData);
	controller.on('logout', user.logout);
	controller.on('changeAvatar', user.changeAvatar);
	controller.on('changePassword', user.changePassword);
}
