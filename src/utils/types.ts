import Component from '../framework/Component';
import { ErrorMessage, UsersList } from '../components';
import { METHOD } from './constants';
import Block from '../framework/Block';
import AuthApi from '../api/AuthApi';
import ChatsApi from '../api/ChatsApi';
import UsersApi from '../api/UsersApi';

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
	onSubmit: (formData: Record<string, unknown>, event: SubmitEvent) => void;
};

export type FieldConfig = {
	block: string;
	label: string;
	inputAttributs: {
		class: string;
		title?: string;
		name:
			| 'email'
			| 'login'
			| 'first_name'
			| 'second_name'
			| 'display_name'
			| 'phone';
		type: string;
		id: string;
		required?: boolean;
		pattern?: string;
		minlength?: number;
		maxlength?: number;
		placeholder?: string;
	};
};

export type UserActionFormProps = {
	name: string;
	title: string;
	onSubmit: (formData: Record<string, unknown>) => void;
	onInput: (value: string) => void;
	Users: UsersList;
	fieldsConfig: FieldConfig[];
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
	body?: any;
	headers?: Record<string, string>;
	withCredentials?: boolean;
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

export type PlainObject<T = any> = {
	[k in string]: T;
};

export type Indexed<T = any> = {
	[key in string]: T;
};

export type RouteProps = {
	rootQuery: string;
};

export type BlockConstructor = new (...args: any[]) => Block;

export type SignInArguments = {
	login: string;
	password: string;
};

export type SignUpArguments = {
	first_name: string;
	second_name: string;
	login: string;
	email: string;
	password: string;
	phone: string;
};

export type ChangeUserProfileArguments = {
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
};

export type ChangeUserPasswordArguments = {
	oldPassword: string;
	newPassword: string;
};

export type GetChatsArguments = {
	offset?: number;
	limit?: number;
	title?: string;
};

export type ChatsUsersQueryParams = {
	offset?: number;
	limit?: number;
	name?: string;
	email?: string;
};

export type UsersToChatParams = {
	users: number[];
	chatId: number;
};

export type ApiType = {
	auth: AuthApi;
	chats: ChatsApi;
	users: UsersApi;
};

export type CurrentUserType = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string | null;
	phone: string;
	login: string;
	avatar: string | null;
	email: string;
};

export type MessageAuthor = {
	first_name: string;
	second_name: string;
	avatar: string;
	email: string;
	login: string;
	phone: string;
};

export type ChatType = {
	id: number;
	title: string;
	avatar: string | null;
	unread_count: number;
	created_by: number;
	last_message: {
		user: MessageAuthor;
		time: string;
		content: string;
	};
};

export type FileMessageType = {
	id: string;
	time: string;
	user_id: number;
	content: string;
	type: 'file';
	isOwn: boolean;
	stringTime: string;
	file: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
};

export type TextMessageType = {
	id: string;
	time: string;
	user_id: number;
	content: string;
	type: 'message';
	isOwn: boolean;
	stringTime: string;
};

export type MessageType = FileMessageType | TextMessageType;

export type DateMessagesType = {
	type: 'date';
	content: string;
};

export type CurrentChatType = ChatType & {
	messages: MessageType[];
	token: number;
};

export type StateType = {
	isLoggedIn: boolean | null;
	currentUser: CurrentUserType | null;
	chats: ChatType[];
	currentChat: CurrentChatType | null;
};

export type MessagesSocketProps = {
	userId: number;
	chatId: number;
	token: number;
};

export type ResourceDataType = {
	id: number;
	user_id: number;
	path: string;
	filename: string;
	content_type: string;
	content_size: number;
	upload_date: string;
};

export type Timer = ReturnType<typeof setTimeout>;
