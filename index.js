import App from './App.js';

export const LOGIN_STORAGE_KEY = 'id';

try {
  const $app = document.querySelector('.app');
  const user = JSON.parse(localStorage.getItem(LOGIN_STORAGE_KEY)) || [];
  console.log(user);
  new App($app, user);
} catch (e) {
  console.log(e.message);
};
