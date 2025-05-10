import Component from '../framework/Component';
import {ErrorMessage} from '../components';
import {METHOD} from './constants';

// Пропсом может быть что угодно, поэтому any как мне кажется должен подходить
export type BlockProps = {
	[key: string]: any;
};

export type ChatData = {
	name: string;
	avatar: string;
	lastTime: string;
	lastMessage: string;
	unreadMessagesCount: string;
};

export type UserData = {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	display_name: string;
	phone: string;
	avatar: string;
};

export type AddFileFormProps = {
	formName: string;
	inputName: string;
	buttonText: string;
	title: string;
	onSubmit: (formData: Record<string, unknown>) => void;
};

export type UserActionFormProps = {
	name: string;
	title: string;
	buttonText: string;
	onSubmit: (formData: Record<string, unknown>) => void;
};

export type FieldProps = {
	block: string;
	label: string;
	id: string;
	ErrorMessage: ErrorMessage;
	Input: Component;
};

export type ErrorMessageProps = {
	text: string;
	isHide: boolean;
};

export type ChatPreviewProps = {
	unreadMessagesCount: string;
	lastMessage: string;
	lastTime: string;
	name: string;
	avatar: string;
};

export type ProfileActionButtonProps = {
	content: string;
	type: string;
	onClick: () => void;
};

export type RegisterProps = {
	email: string;
	login: string;
	first_name: string;
	second_name: string;
	phone: string;
	password: string;
	repeat_password: string;
};

export type ChangePasswordProps = {
	oldPassword: string;
	newPassword: string;
	repeat_password: string;
};

export type SendFileProps = { file: unknown };

export type SendMediaProps = { media: unknown };

export type ChatActionProps = { login: string };

export type ChangeAvatarProps = { avatar: unknown };

// Дата может быть чем угодно, а также воообще может не быть ее
export type Options = {
	method: METHOD;
	data?: any;
};

export type OptionsWithoutMethod = Omit<Options, 'method'>;

// Получилась довольно сложная структура массива с сообщениями. Тип не получилось сделать, кроме any. Возможно его и действительно не нужно сейчас делать, ведь вполне вероятно, что данные из сервера будут приходить в другом формет
export type ChatMessagesProps = { dataMessages: Record<string, any>[] };

export type PopupProps = { content: unknown; isOpen: boolean };

export type MenuProps = {
	content: unknown;
	isOpen: boolean;
	addClass: string;
};

// Аргументами коллбека может быть что-угодно
export type EventCallback = (...args: any[]) => void;
