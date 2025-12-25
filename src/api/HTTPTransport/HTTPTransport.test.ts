/**
 * @jest-environment jsdom
 */

import HTTPTransport from './HTTPTransport';
import { mockHeaders, mockResponse, mockUrl } from '../../Mokes/http';

describe('HTTPTransport', () => {
	const http: HTTPTransport = new HTTPTransport();

	afterEach(() => {
		jest.restoreAllMocks();
	});

	const mockXHR = (mockResponse: { data: string }) => {
		const xhrMock: Partial<XMLHttpRequest> = {
			open: jest.fn(),
			send: jest.fn(),
			setRequestHeader: jest.fn(),
			onload: jest.fn(),
			onerror: jest.fn(),
			onabort: jest.fn(),
			ontimeout: jest.fn(),
			withCredentials: false,
			readyState: 4,
			status: 200,
			responseText: JSON.stringify(mockResponse),
		};

		jest.spyOn(window, 'XMLHttpRequest').mockImplementation(() => {
			const xhr = xhrMock as XMLHttpRequest;

			setTimeout(() => {
				if (xhr.onload) {
					xhr?.onload(new Event('load') as ProgressEvent);
				}
			}, 0);

			return xhr;
		});

		return xhrMock;
	};

	it('should make GET', async () => {
		mockXHR(mockResponse);
		const response = await http.get(mockUrl);
		expect(response.responseText).toBe(JSON.stringify(mockResponse));
	});

	it('should make POST with body', async () => {
		mockXHR(mockResponse);
		const body = { test: 'data' };
		const response = await http.post(mockUrl, { body: JSON.stringify(body) });

		expect(response.responseText).toBe(JSON.stringify(mockResponse));
	});

	it('should make PUT with headers', async () => {
		mockXHR(mockResponse);
		const response = await http.put(mockUrl, { headers: mockHeaders });

		expect(response.responseText).toBe(JSON.stringify(mockResponse));
	});

	it('should make DELETE', async () => {
		mockXHR(mockResponse);
		const response = await http.delete(mockUrl);

		expect(response.responseText).toBe(JSON.stringify(mockResponse));
	});

	it('should make PATCH', async () => {
		mockXHR(mockResponse);
		const response = await http.patch(mockUrl);

		expect(response.responseText).toBe(JSON.stringify(mockResponse));
	});

	it('should set headers if provided', async () => {
		const xhrMock = mockXHR(mockResponse);
		await http.get(mockUrl, { headers: mockHeaders });

		expect(xhrMock.setRequestHeader).toHaveBeenCalledWith(
			'Content-Type',
			'application/json'
		);
	});

	it('should set withCredentials if provided', async () => {
		const xhrMock = mockXHR(mockResponse);
		await http.get(mockUrl, { withCredentials: true });

		expect(xhrMock.withCredentials).toBe(true);
	});
});
