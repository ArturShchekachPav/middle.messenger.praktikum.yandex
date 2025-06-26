/**
 * @jest-environment jsdom
 */

import Router from './Router';
import {TestBlock} from "../../Mokes/block";

describe('Router', () => {
	let router: Router;
	let app = document.createElement('div');
	app.setAttribute('id', 'app');

	document.body.appendChild(app);;

	beforeEach(() => {
		router = new Router();
	});

	it('use should allow method chaining', () => {
		const result = router.use('/', TestBlock, {});

		expect(result).toBe(router);
	});

	it('should use Singleton pattern', () => {
		expect(new Router()).toBe(new Router());
	});

	it('on go() change window.location.pathname', () => {
		window.location.pathname = '/';

		const beforePath = window.location.pathname;

		router
			.use('/', TestBlock)
			.use('/test', TestBlock)
			.start();

		router.go('/test');

		const afterPath = window.location.pathname;

		expect(beforePath).not.toBe(afterPath);
	});

	it('on unexpected route set default route', () => {
		window.location.pathname = '/500';

		router
			.use('/', TestBlock)
			.use('/test', TestBlock)
			.setDefaultRoute('404', TestBlock)
			.start();

		expect(router.defaultRoute).not.toBe(router.currentRoute);
	});
});
