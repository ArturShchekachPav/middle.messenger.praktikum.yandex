import {DateMessagesType, Indexed, MessageType, PlainObject} from './types';
import Block from '../framework/Block';
import Actions from '../actions';

export function isPlainObject(value: unknown): value is PlainObject {
	return (
		typeof value === 'object' &&
		value !== null &&
		value.constructor === Object &&
		Object.prototype.toString.call(value) === '[object Object]'
	);
}

export function isArray(value: unknown): value is [] {
	return Array.isArray(value);
}

export function isArrayOrObject(value: unknown): value is [] | PlainObject {
	return isPlainObject(value) || isArray(value);
}

export function isEqual(lhs: PlainObject, rhs: PlainObject) {
	if (Object.keys(lhs).length !== Object.keys(rhs).length) {
		return false;
	}

	for (const [key, value] of Object.entries(lhs)) {
		const rightValue = rhs[key];
		if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
			if (isEqual(value, rightValue)) {
				continue;
			}
			return false;
		}

		if (value !== rightValue) {
			return false;
		}
	}

	return true;
}

export function render(query: string, block: Block) {
	const root = document.querySelector(query);

	if (!root) {
		return;
	}

	root.replaceChildren(block.getContent());
}

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
	for (const p in rhs) {
		if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
			continue;
		}

		try {
			if (rhs[p].constructor === Object) {
				rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
			} else {
				lhs[p] = rhs[p];
			}
		} catch {
			lhs[p] = rhs[p];
		}
	}

	return lhs;
}

export function set(
	object: Indexed | unknown,
	path: string,
	value: unknown
): Indexed | unknown {
	if (typeof object !== 'object' || object === null) {
		return object;
	}

	if (typeof path !== 'string') {
		throw new Error('path must be string');
	}

	const result = path.split('.').reduceRight<Indexed>(
		(acc, key) => ({
			[key]: acc,
		}),
		value as any
	);

	return merge(object as Indexed, result);
}

export function trim(str: string, symbols: string = ' '): string {
	const disallowSymbolsArr = symbols.split('');
	let startAcceptSymbolsIndex;
	let endAcceptSymbolsIndex;

	for (let i = 0; i < str.length; i++) {
		const isAcceptedSymbol = !disallowSymbolsArr.includes(str[i]);

		if (isAcceptedSymbol && startAcceptSymbolsIndex === undefined) {
			startAcceptSymbolsIndex = i;
		} else if (isAcceptedSymbol) {
			endAcceptSymbolsIndex = i;
		}
	}

	if (startAcceptSymbolsIndex === undefined) {
		return '';
	}

	if (endAcceptSymbolsIndex === undefined) {
		return str.slice(startAcceptSymbolsIndex, startAcceptSymbolsIndex + 1);
	}

	return str.slice(startAcceptSymbolsIndex, endAcceptSymbolsIndex + 1);
}

export function getKey(key: string, parentKey?: string) {
	return parentKey ? `${parentKey}[${key}]` : key;
}

export function getParams(data: PlainObject | [], parentKey?: string) {
	const result: [string, string][] = [];

	for (const [key, value] of Object.entries(data)) {
		if (isArrayOrObject(value)) {
			result.push(...getParams(value, getKey(key, parentKey)));
		} else {
			result.push([getKey(key, parentKey), encodeURIComponent(String(value))]);
		}
	}

	return result;
}

export function queryString(data: PlainObject) {
	if (!isPlainObject(data)) {
		throw new Error('input must be an object');
	}

	if (!Object.keys(data).length) {
		return '';
	}

	return (
		'?' +
		getParams(data)
			.map((arr) => arr.join('='))
			.join('&')
	);
}

export const baseRange = (
	start: number,
	end: number,
	step: number,
	isRight: boolean
) => {
	let index = -1;
	let length = Math.max(Math.ceil((end - start) / (step || 1)), 0);
	const result = new Array(length);

	while (length--) {
		result[isRight ? length : ++index] = start;
		start += step;
	}

	return result;
};

export function range(
	start: number = 0,
	end: number | undefined,
	step: number | undefined,
	isRight: boolean = false
) {
	if (end === undefined) {
		end = start;
		start = 0;
	}

	step = step === undefined ? (start < end ? 1 : -1) : step;

	return baseRange(start, end, step, isRight);
}

export function rangeRight(
	start: number,
	end: number | undefined,
	step: number | undefined
) {
	return range(start, end, step, true);
}

export function first(list: Array<unknown>) {
	return list.length ? list[0] : undefined;
}

export function last(list: Array<unknown>) {
	return list[list.length - 1];
}

export function matchesStructure<T extends Record<string, unknown>>(
	data: Record<string, unknown>,
	expectedStructure: {
		[K in keyof T]: 'string' | 'number' | 'boolean' | 'object' | 'undefined';
	}
): data is T {
	for (const key in expectedStructure) {
		const expectedType = expectedStructure[key];

		if (!(key in data)) {
			return false;
		}

		if (typeof data[key] !== expectedType) {
			return false;
		}
	}

	return true;
}

export function getTimeString(date: Date) {
	return `${date.getHours()}:${date.getMinutes()}`;
}

function getStartOfWeek(date: Date): Date {
	const d: Date = new Date(date);
	const day: number = d.getDay();
	const diff: number = d.getDate() - day + (day === 0 ? -6 : 1); // Понедельник как начало недели
	return new Date(d.setDate(diff));
}

export function getRussianWeekday(date: Date): string {
	const days: string[] = [
		'Воскресенье',
		'Понедельник',
		'Вторник',
		'Среда',
		'Четверг',
		'Пятница',
		'Суббота',
	];
	return days[date.getDay()];
}

export function formatDayMonth(date: Date): string {
	const months: string[] = [
		'Января',
		'Февраля',
		'Марта',
		'Апреля',
		'Мая',
		'Июня',
		'Июля',
		'Августа',
		'Сентября',
		'Октября',
		'Ноября',
		'Декабря',
	];
	return `${date.getDate()} ${months[date.getMonth()]}`;
}

export function formatFullDate(date: Date): string {
	const day: string = date.getDate().toString().padStart(2, '0');
	const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
	const year: number = date.getFullYear();

	return `${day}.${month}.${year}`;
}

export function formatDate(date: Date, withTime: boolean = false): string {
	const now: Date = new Date();
	const today: Date = new Date(
		now.getFullYear(),
		now.getMonth(),
		now.getDate()
	);
	const inputDate: Date = new Date(
		date.getFullYear(),
		date.getMonth(),
		date.getDate()
	);

	const diffDays: number = Math.floor(
		(today.getTime() - inputDate.getTime()) / (1000 * 60 * 60 * 24)
	);

	if (diffDays === 0) {
		return withTime ? getTimeString(date) : 'Сегодня';
	}

	if (diffDays === 1) {
		return 'Вчера';
	}

	if (diffDays < 7 && inputDate >= getStartOfWeek(now)) {
		return getRussianWeekday(date);
	}

	if (inputDate.getFullYear() === now.getFullYear()) {
		return formatDayMonth(date);
	}

	return formatFullDate(date);
}

export function addDatesInMessages(
	messages: MessageType[]
): Array<MessageType | DateMessagesType> {
	let currentDate: string | null = null;

	return messages
		.reduce(
			(
				messages: Array<MessageType | DateMessagesType>,
				message: MessageType
			): Array<MessageType | DateMessagesType> => {
				const date: string = formatDate(new Date(message.time));

				if (currentDate === date) {
					return [message, ...messages];
				}

				currentDate = date;

				return [
					message,
					{
						type: 'date',
						content: date,
					},
					...messages,
				];
			},
			[]
		)
		.reverse();
}

export function throttle<T extends unknown[]>(
	callee: (...args: T) => void,
	timeout: number
) {
	let timer: NodeJS.Timeout | null = null;

	return function perform(...args: T) {
		if (timer) return;

		timer = setTimeout(() => {
			callee(...args);

			if (timer) {
				clearTimeout(timer);
				timer = null;
			}
		}, timeout);
	};
}

export function checkPosition(event: Event) {
	const chatElement = event.target;

	if (!(chatElement instanceof HTMLElement)) {
		return;
	}

	const scrollTop = chatElement.scrollTop;

	if (scrollTop === 0) {
		const actions = new Actions();

		const messagesCount = actions.getAppState().currentChat?.messages.length;

		if (messagesCount && messagesCount >= 20) {
			actions.messages.getOldMessages(messagesCount);
		}
	}
}
