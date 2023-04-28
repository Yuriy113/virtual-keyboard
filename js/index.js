import keys from './Keys.js';

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

const shortcutHint = document.createElement('p');
shortcutHint.innerText = 'To switch the language, use the ctrl + alt keys';
shortcutHint.classList.add('hint');
container.appendChild(shortcutHint);

const languages = ['en', 'ru'];
const states = ['normal', 'shifted'];
let currentLang = false;
let currentState = false;

const removePrev = () => {
  let caret = textarea.selectionStart;
  let substr = textarea.value;
  let arr = substr.split('');

  if (arr[caret - 1]) {
    arr.splice(caret - 1, 1);
    let newstr = arr.join('');

    textarea.value = newstr;
    textarea.selectionStart = textarea.selectionEnd = caret - 1;
  }
};

const removeNext = () => {
  let caret = textarea.selectionStart;
  let substr = textarea.value;
  let arr = substr.split('');

  if (arr[caret]) {
    arr.splice(caret, 1);
    let newstr = arr.join('');

    textarea.value = newstr;
    textarea.selectionStart = textarea.selectionEnd = caret;
  }
};

const createKeyboardKeys = (keys, lang, shift) => {
  for (let key of keys) {
    const button = document.createElement('button');
    button.classList.add('keyboard__key');
    button.classList.add(`${key.code}`);
    button.innerText = key[lang][shift];

    button.addEventListener('click', () => {
      if (key.code === 'Backspace') {
        removePrev();
        return;
      }
      if (key.code === 'Delete') {
        removeNext();
        return;
      }
      if (key.code === 'Tab') {
        textarea.setRangeText(`    `, textarea.selectionStart, textarea.selectionEnd, 'end');
        return;
      }
      if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
        // TODO: implement virtual shift behavior
      }

      textarea.value += button.innerText;
      textarea.focus();
    });
    keyboard.appendChild(button);
  }
};

createKeyboardKeys(keys, languages[0], states[0]);

document.addEventListener('click', () => textarea.focus());
textarea.focus();

document.addEventListener('keydown', (e) => {
  let buttons = document.querySelectorAll('.keyboard__key');

  if (e.repeat) {
    e.preventDefault();
    return;
  }

  const isServiceKey =
    e.code === 'ArrowUp' ||
    e.code === 'ArrowDown' ||
    e.code === 'ArrowLeft' ||
    e.code === 'ArrowRight' ||
    e.code === 'Enter' ||
    e.code === 'ShiftLeft' ||
    e.code === 'ShiftRight' ||
    e.code === 'ControlLeft' ||
    e.code === 'ControlRight' ||
    e.code === 'AltLeft' ||
    e.code === 'AltRight' ||
    e.code === 'Space';

  let lang = languages[+currentLang];
  let shift = states[+e.shiftKey];
  if (e.altKey && e.ctrlKey) {
    currentLang = !currentLang;
  }

  for (let i = 0; i < buttons.length; i++) {
    buttons[i].innerText = keys[i][lang][shift];
    if (keys[i].code === e.code) {
      buttons[i].classList.add('pressed');

      if (!isServiceKey) {
        e.preventDefault();
        textarea.focus();
      } else {
        for (let key of keys) {
          if (e.code === key.code) {
            console.log(e.target);
          }
        }
        console.log(e);
        return;
      }

      if (e.code === 'Backspace') {
        removePrev();
        return;
      }
      if (e.code === 'Delete') {
        removeNext();
        return;
      }
      if (e.code === 'Tab') {
        textarea.setRangeText(`    `, textarea.selectionStart, textarea.selectionEnd, 'end');
        return;
      }

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
