export function queryStringify(data: Record<string, string | number>) {
	const keys = Object.keys(data);
	return keys.reduce((result, key, index) => {
		return `${result}${key}=${encodeURIComponent(data[key])}${index < keys.length - 1 ? '&' : ''}`;
	}, '?');
}
