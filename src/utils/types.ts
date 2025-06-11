import Component from '../framework/Component';
import {ErrorMessage} from '../components';
import {METHOD} from './constants';
import Block from '../framework/Block';

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

// Получилась довольно сложная структура массива с сообщениями. Тип не получилось сделать, кроме any. Возможно его и действительно не нужно сейчас делать, ведь вполне вероятно, что данные из сервера будут приходить в другом формате
export type ChatMessagesProps = { dataMessages: Record<string, any>[] };

export type PopupProps = { content: unknown; isOpen: boolean };

export type MenuProps = {
	content: unknown;
	isOpen: boolean;
	addClass: string;
};

export type EventCallback<T extends unknown[] = unknown[]> = (
	...args: T
) => void;

export type HTTPMethod = (
	url: string,
	options?: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;

export type BlockSimpleProps = {
	[key: string]: unknown;
} & {
	events?: Record<string, (event: Event) => void>;
	attr?: Record<string, string | number | boolean>;
};

export type BlockChildren = Record<string, Block>;

export type BlockList = Record<string, unknown[]>;

export type BlockPropsWithChildren = {
	[key: string]: unknown;
};

type PlainObject<T = any> = {
    [k in string]: T;
};

type Indexed<T = any> = {
    [key in string]: T;
};