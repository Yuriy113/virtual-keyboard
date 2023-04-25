document.body.style.backgroundColor = '#12ffef';

const container = document.createElement('div');
container.classList.add('container');
document.body.append(container);

const title = document.createElement('h1');
title.innerText = 'Virtual Keyboard';
title.classList.add('keyboard-title');
container.appendChild(title);

const textarea = document.createElement('textarea');
textarea.classList.add('text-wrapper');
container.appendChild(textarea);

const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
container.appendChild(keyboard);

const pageLanguage = document.createElement('p');
pageLanguage.innerText = 'en';
pageLanguage.classList.add('lang');
container.appendChild(pageLanguage);

const languages = ['en', 'ru'];
const states = ['normal', 'shifted'];
let currentLang = false;
let currentState = false;

const keys = [
  { en: { normal: '`', shifted: '~' }, ru: { normal: 'ё', shifted: 'Ё' }, code: 'Backquote' },
  { en: { normal: '1', shifted: '!' }, ru: { normal: '1', shifted: '!' }, code: 'Digit1' },
  { en: { normal: '2', shifted: '@' }, ru: { normal: '2', shifted: '"' }, code: 'Digit2' },
  { en: { normal: '3', shifted: '#' }, ru: { normal: '3', shifted: '№' }, code: 'Digit3' },
];

const createKeyboardKeys = (keys, lang, shift) => {
  for (let value of keys) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.innerText = value[lang][shift];

    key.addEventListener('click', () => {
      textarea.value += key.innerText;
    });
    keyboard.appendChild(key);
  }
};

createKeyboardKeys(keys, languages[0], states[0]);

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  e.preventDefault();
  console.log(e.code);

  let lang = languages[+currentLang];
  let shift = states[+e.shiftKey];
  if (e.altKey && e.ctrlKey) {
    currentLang = !currentLang;
  }

  let buttons = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerText = keys[i][lang][shift];
    if (keys[i].code === e.code) {
      buttons[i].classList.add('pressed');
      textarea.value += buttons[i].innerHTML;
    }
  }
  pageLanguage.innerText = lang;
});

document.addEventListener('keyup', (e) => {
  let lang = languages[+currentLang];
  let shift = states[+e.shiftKey];
  if (e.altKey && e.ctrlKey) {
    currentLang = !currentLang;
  }

  let buttons = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerText = keys[i][lang][shift];
    if (buttons[i].classList.contains('pressed')) {
      buttons[i].classList.remove('pressed');
    }
  }
  pageLanguage.innerText = lang;
});
