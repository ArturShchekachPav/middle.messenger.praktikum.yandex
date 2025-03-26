import './style.scss';
import App from './App.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = new App(window.location.pathname);
    app.render();
});