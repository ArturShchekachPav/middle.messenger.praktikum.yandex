import Controller from './Controller';
import messangerModel from '../models/messanger';

const controller = new Controller();

export default function () {
	controller.on('addChat', messangerModel.addChat);
	controller.on('removeChat', messangerModel.removeChat);
	controller.on('sendMessage', messangerModel.sendMessage);
	controller.on('getChatData', messangerModel.getChatData);
	controller.on('sendFile', messangerModel.sendFile);
	controller.on('sendMedia', messangerModel.sendMedia);
}
