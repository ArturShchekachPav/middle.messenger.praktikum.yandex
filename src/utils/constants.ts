export const CHATS_DATA = [
	{
		element: "li",
		name: "Жора",
		avatar: "/default-avatar.png",
		lastTime: "12:05",
		lastMessage: "Привет",
		unreadMessagesCount: "2"
	},
	{
		element: "li",
		name: "Андрей",
		avatar: "/default-avatar.png",
		lastTime: "12:05",
		lastMessage: "Какой-то текст",
		unreadMessagesCount: "4"
	},
	{
		element: "li",
		name: "Михаил",
		avatar: "/default-avatar.png",
		lastTime: "12:05",
		lastMessage: "Как дела?",
		unreadMessagesCount: "12"
	},
	{
		element: "li",
		name: "Иван",
		avatar: "/default-avatar.png",
		lastTime: "12:05",
		lastMessage: "Изображение",
		unreadMessagesCount: "6"
	},
	{
		element: "li",
		name: "Иван",
		avatar: "/default-avatar.png",
		lastTime: "12:05",
		lastMessage: "Изображение",
		unreadMessagesCount: "6"
	},
	{
		element: "li",
		name: "Иван",
		avatar: "/default-avatar.png",
		lastTime: "12:05",
		lastMessage: "Изображение",
		unreadMessagesCount: "6"
	}
];

export const MESSAGES_DATA = [
	{
		type: 'date',
		date: '19 июня'
	},
	{
		type: 'messages',
		messages: [
			{
				type: 'text',
				time: '11:54',
				text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
				Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500
				EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой
				забрали только кассеты с пленкой.<br/><br/>
				Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
				Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`
			},
			{
				type: 'image',
				time: '11:58',
				src: '/chat-image-template.png'
			}
		],
		source: 'incoming'
	},
	{
		type: 'messages',
		messages: [
			{
				type: 'text',
				time: '12:00',
				status: 'read',
				text: 'Круто!'
			},
			{
				type: 'image',
				time: '12:05',
				status: 'send',
				src: '/chat-image-template.png'
			}
		],
		source: 'outgoing'
	},
	{
		type: 'date',
		date: '19 июня'
	},
	{
		type: 'messages',
		messages: [
			{
				type: 'text',
				time: '11:54',
				text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
				Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500
				EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой
				забрали только кассеты с пленкой.<br/><br/>
				Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
				Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`
			},
			{
				type: 'image',
				time: '11:58',
				src: '/chat-image-template.png'
			}
		],
		source: 'incoming'
	},
	{
		type: 'messages',
		messages: [
			{
				type: 'text',
				time: '12:00',
				status: 'read',
				text: 'Круто!'
			},
			{
				type: 'image',
				time: '12:05',
				status: 'send',
				src: '/chat-image-template.png'
			}
		],
		source: 'outgoing'
	},
	{
		type: 'date',
		date: '19 июня'
	},
	{
		type: 'messages',
		messages: [
			{
				type: 'text',
				time: '11:54',
				text: `Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила
				Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500
				EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой
				забрали только кассеты с пленкой.<br/><br/>
				Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
				Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.`
			},
			{
				type: 'image',
				time: '11:58',
				src: '/chat-image-template.png'
			}
		],
		source: 'incoming'
	},
	{
		type: 'messages',
		messages: [
			{
				type: 'text',
				time: '12:00',
				status: 'read',
				text: 'Круто!'
			},
			{
				type: 'image',
				time: '12:05',
				status: 'send',
				src: '/chat-image-template.png'
			}
		],
		source: 'outgoing'
	}
];

export const EDIT_PROFILE_FORM_CONFIG = [
	{
		block: "profile",
		label: "Почта",
		inputAttributs: {
			class: "profile__input",
			title: "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
			name: "email",
			type: "email",
			id: "profile-input-email",
			required: true,
			pattern: "^[\\w_\\-]{2,}@[\\w]{2,}.[\\w_\\-]{2,}$"
		}
	},
	{
		block: "profile",
		label: "Логин",
		inputAttributs: {
			class: "profile__input",
			title: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание',
			name: "login",
			type: "text",
			id: "profile-input-login",
			required: true,
			minlength: 3,
			maxlength: 20,
			pattern: "^(?!\\d+$)[\\w_\\-]+$"
		}
	},
	{
		block: "profile",
		label: "Имя",
		inputAttributs: {
			class: "profile__input",
			title: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
			name: "first_name",
			type: "text",
			id: "profile-input-first-name",
			required: true,
			pattern: "^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яЁё\\-]+$"
		}
	},
	{
		block: "profile",
		label: "Фамилия",
		inputAttributs: {
			class: "profile__input",
			title: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
			name: "second_name",
			type: "text",
			id: "profile-input-second-name",
			required: true,
			pattern: "^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яЁё\\-]+$"
		}
	},
	{
		block: "profile",
		label: "Имя в чате",
		inputAttributs: {
			class: "profile__input",
			name: "display_name",
			type: "text",
			id: "profile-input-display-name",
			required: true,
		}
	},
	{
		block: "profile",
		label: "Телефон",
		inputAttributs: {
			class: "profile__input",
			title: "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
			name: "phone",
			type: "tel",
			id: "profile-input-phone",
			required: true,
			minlength: 10,
			maxlength: 15,
			pattern: "^[\\d+][\\d]+$"
		}
	}
];

export const EDIT_PASSWORD_FORM_CONFIG = [
	{
		block: "profile",
		label: "Старый пароль",
		inputAttributs: {
			class: "profile__input",
			title: "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
			name: "oldPassword",
			type: "password",
			id: "profile-input-oldpassword",
			required: true,
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-ZА-ЯЁ])(?=.*\\d).+$"
		}
	},
	{
		block: "profile",
		label: "Новый пароль",
		inputAttributs: {
			class: "profile__input",
			title: "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
			name: "newPassword",
			type: "password",
			id: "profile-input-newpassword",
			required: true,
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-ZА-ЯЁ])(?=.*\\d).+$"
		}
	},
	{
		block: "profile",
		label: "Повторите новый пароль",
		inputAttributs: {
			class: "profile__input",
			name: "repeat_password",
			type: "password",
			id: "profile-input-repeat-password",
			required: true,
			title: "Повторите новый пароль"
		}
	}
]

export const LOGIN_FORM_CONFIG = [
	{
		block: "auth-form",
		label: "Логин",
		inputAttributs: {
			class: "auth-form__input",
			title: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание',
			name: "login",
			type: "text",
			id: "auth-input-login",
			required: true,
			minlength: 3,
			maxlength: 20,
			pattern: "^(?!\\d+$)[\\w_\\-]+$"
		}
	},
	{
		block: "auth-form",
		label: "Пароль",
		inputAttributs: {
			class: "auth-form__input",
			title: "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
			name: "oldPassword",
			type: "password",
			id: "auth-input-oldpassword",
			required: true,
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-ZА-ЯЁ])(?=.*\\d).+$"
		}
	}
]

export const REGISTER_FORM_CONFIG = [
	{
		block: "auth-form",
		label: "Почта",
		inputAttributs: {
			class: "auth-form__input",
			title: "латиница, может включать цифры и спецсимволы вроде дефиса и подчёркивания, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы",
			name: "email",
			type: "email",
			id: "auth-input-email",
			required: true,
			pattern: "^[\\w_\\-]{2,}@[\\w]{2,}.[\\w_\\-]{2,}$"
		}
	},
	{
		block: "auth-form",
		label: "Логин",
		inputAttributs: {
			class: "auth-form__input",
			title: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание',
			name: "login",
			type: "text",
			id: "auth-input-login",
			required: true,
			minlength: 3,
			maxlength: 20,
			pattern: "^(?!\\d+$)[\\w_\\-]+$"
		}
	},
	{
		block: "auth-form",
		label: "Имя",
		inputAttributs: {
			class: "auth-form__input",
			title: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
			name: "first_name",
			type: "text",
			id: "auth-input-first-name",
			required: true,
			pattern: "^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яЁё\\-]+$"
		}
	},
	{
		block: "auth-form",
		label: "Фамилия",
		inputAttributs: {
			class: "auth-form__input",
			title: "латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)",
			name: "second_name",
			type: "text",
			id: "auth-input-second-name",
			required: true,
			pattern: "^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яЁё\\-]+$"
		}
	},
	{
		block: "auth-form",
		label: "Телефон",
		inputAttributs: {
			class: "auth-form__input",
			title: "от 10 до 15 символов, состоит из цифр, может начинается с плюса",
			name: "phone",
			type: "tel",
			id: "auth-input-phone",
			required: true,
			minlength: 10,
			maxlength: 15,
			pattern: "^[\\d+][\\d]+$"
		}
	},
	{
		block: "auth-form",
		label: "Пароль",
		inputAttributs: {
			class: "auth-form__input",
			title: "от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра",
			name: "password",
			type: "password",
			id: "auth-input-newpassword",
			required: true,
			minlength: 8,
			maxlength: 40,
			pattern: "^(?=.*[A-ZА-ЯЁ])(?=.*\\d).+$"
		}
	},
	{
		block: "auth-form",
		label: "Повторите новый пароль",
		inputAttributs: {
			class: "auth-form__input",
			name: "repeat_password",
			type: "password",
			id: "auth-input-repeat-password",
			required: true,
			title: "Повторите новый пароль"
		}
	}
];

export const USER_ACTION_FORM_CONFIG = [
	{
		block: "auth-form",
		label: "Логин",
		inputAttributs: {
			class: "auth-form__input",
			title: 'от 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание',
			name: "login",
			type: "text",
			id: "auth-input-login",
			required: true,
			minlength: 3,
			maxlength: 20,
			pattern: "^(?!\\d+$)[\\w_\\-]+$"
		}
	}
];
