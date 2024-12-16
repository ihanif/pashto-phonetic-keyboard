import { PhoneticPashtoKeyboard } from './lib.js';

document.addEventListener('DOMContentLoaded', () => {
  const keyboard = new PhoneticPashtoKeyboard();
  keyboard.initialize();
});
