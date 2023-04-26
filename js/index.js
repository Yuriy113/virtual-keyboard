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
// textarea.setAttribute('autofocus', 'true');

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
  { en: { normal: '4', shifted: '$' }, ru: { normal: '4', shifted: ';' }, code: 'Digit4' },
  { en: { normal: '5', shifted: '%' }, ru: { normal: '5', shifted: '%' }, code: 'Digit5' },
  { en: { normal: '6', shifted: '^' }, ru: { normal: '6', shifted: ':' }, code: 'Digit6' },
  { en: { normal: '7', shifted: '&' }, ru: { normal: '7', shifted: '?' }, code: 'Digit7' },
  { en: { normal: '8', shifted: '*' }, ru: { normal: '8', shifted: '*' }, code: 'Digit8' },
  { en: { normal: '9', shifted: '(' }, ru: { normal: '9', shifted: '(' }, code: 'Digit9' },
  { en: { normal: '0', shifted: ')' }, ru: { normal: '0', shifted: ')' }, code: 'Digit0' },
  { en: { normal: '-', shifted: '_' }, ru: { normal: '-', shifted: '_' }, code: 'Minus' },
  { en: { normal: '=', shifted: '+' }, ru: { normal: '=', shifted: '+' }, code: 'Equal' },
  {
    en: { normal: 'Backspace', shifted: 'Backspace' },
    ru: { normal: 'Backspace', shifted: 'Backspace' },
    code: 'Backspace',
    service: true,
  },
  { en: { normal: 'Tab', shifted: 'Tab' }, ru: { normal: 'Tab', shifted: 'Tab' }, code: 'Tab' },
  { en: { normal: 'q', shifted: 'Q' }, ru: { normal: 'й', shifted: 'Й' }, code: 'KeyQ' },
  { en: { normal: 'w', shifted: 'W' }, ru: { normal: 'ц', shifted: 'Ц' }, code: 'KeyW' },
  { en: { normal: 'e', shifted: 'E' }, ru: { normal: 'у', shifted: 'У' }, code: 'KeyE' },
  { en: { normal: 'r', shifted: 'R' }, ru: { normal: 'к', shifted: 'К' }, code: 'KeyR' },
  { en: { normal: 't', shifted: 'T' }, ru: { normal: 'е', shifted: 'Е' }, code: 'KeyT' },
  { en: { normal: 'y', shifted: 'Y' }, ru: { normal: 'н', shifted: 'Н' }, code: 'KeyY' },
  { en: { normal: 'u', shifted: 'U' }, ru: { normal: 'г', shifted: 'Г' }, code: 'KeyU' },
  { en: { normal: 'i', shifted: 'I' }, ru: { normal: 'ш', shifted: 'Ш' }, code: 'KeyI' },
];

// let isArrows =

const createKeyboardKeys = (keys, lang, shift) => {
  for (let value of keys) {
    const key = document.createElement('button');
    key.classList.add('keyboard__key');
    key.innerText = value[lang][shift];

    key.addEventListener('click', () => {
      if (key.innerHTML === 'Backspace') {
        let substr = textarea.value;
        let newstr = substr.slice(0, substr.length - 1);
        textarea.value = newstr;
        textarea.focus();
        return;
      }

      textarea.value += key.innerText;
      textarea.focus();
    });
    keyboard.appendChild(key);
  }
};

createKeyboardKeys(keys, languages[0], states[0]);
document.addEventListener('click', () => textarea.focus());
textarea.focus();

document.addEventListener('keydown', (e) => {
  let isArrow =
    e.code === 'ArrowUp' ||
    e.code === 'ArrowDown' ||
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowRight';

  if (e.repeat) return;
  if (!isArrow) e.preventDefault();

  let lang = languages[+currentLang];
  let shift = states[+e.shiftKey];
  if (e.altKey && e.ctrlKey) {
    currentLang = !currentLang;
  }

  let buttons = document.querySelectorAll('.keyboard__key');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerText = keys[i][lang][shift];
    if (keys[i].code === e.code) {
      if (e.code === 'Backspace') {
        let substr = textarea.value;
        let newstr = substr.slice(0, substr.length - 1);
        textarea.value = newstr;
        return;
      }

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
