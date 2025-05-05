import '@fontsource/inter';
import App from './App';

document.addEventListener('DOMContentLoaded', () => {
	const app = new App(window.location.pathname);
	app.render();
});
