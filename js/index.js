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
// textarea.setAttribute('cols', '100');
textarea.classList.add('text-wrapper');

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
let isCaps = false;
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

    button.addEventListener('mousedown', () => {
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
      if (key.code === 'ArrowLeft') {
        textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart - 1;
      }
      if (key.code === 'ArrowRight') {
        textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
      }
      if (key.code === 'ArrowUp') {
        console.log(textarea.value.length);
        textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart - 109;
      }
      if (key.code === 'Space') {
        textarea.setRangeText(` `, textarea.selectionStart, textarea.selectionEnd, 'end');
        return;
      }
      if (key.code === 'AltLeft' || key.code === 'AltRight' || key.code === 'MetaLeft') {
        return;
      }
      if (key.code === 'CapsLock') {
        isCaps = !isCaps;
        button.classList.toggle('pressed');
        // console.log(isCaps);
        const tempButtons = document.querySelectorAll('.keyboard__key');
        for (let i = 0; i < tempButtons.length; i++) {
          if (isCaps) {
            if (tempButtons[i].innerText.length === 1)
              tempButtons[i].innerText = keys[i][languages[+currentLang]]['normal'].toUpperCase();
          } else {
            tempButtons[i].innerText = keys[i][lang][shift];
          }
        }
        return;
      }

      if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
        currentState = !currentState;
        let shift = states[+currentState];
        console.log(shift);
        const tempButtons = document.querySelectorAll('.keyboard__key');
        for (let i = 0; i < tempButtons.length; i++) {
          tempButtons[i].innerText = keys[i][lang][shift];
        }
      }

      if (!serviceKeys.includes(key.code)) {
        textarea.value += button.innerText;
      }

      textarea.focus();
    });

    button.addEventListener('mouseup', () => {
      if (key.code === 'ShiftLeft' || key.code === 'ShiftRight') {
        currentState = false;
        let shift = states[+currentState];
        console.log(shift);
        const tempButtons = document.querySelectorAll('.keyboard__key');
        for (let i = 0; i < tempButtons.length; i++) {
          tempButtons[i].innerText = keys[i][lang][shift];
        }
      }
    });

    keyboard.appendChild(button);
  }
};

const serviceKeys = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'Enter',
  'ShiftLeft',
  'ShiftRight',
  'ControlLeft',
  'ControlRight',
  // 'AltLeft',
  // 'AltRight',
  'Space',
  // 'CapsLock',
  'MetaLeft',
];

createKeyboardKeys(keys, languages[0], states[0]);

document.addEventListener('click', () => textarea.focus());
textarea.focus();

document.addEventListener('keydown', (e) => {
  let buttons = document.querySelectorAll('.keyboard__key');
  // console.log(e);
  if (e.repeat) {
    e.preventDefault();
    return;
  }

  const isServiceKey = serviceKeys.includes(e.code);
  // console.log(isServiceKey);

  let lang = languages[+currentLang];
  let shift = states[+currentState];
  if (e.altKey && e.ctrlKey) {
    currentLang = !currentLang;
  }

  for (let i = 0; i < buttons.length; i++) {
    if (isCaps) {
      if (buttons[i].innerText.length === 1)
        buttons[i].innerText = keys[i][languages[+currentLang]]['normal'].toUpperCase();
    } else {
      buttons[i].innerText = keys[i][lang][shift];
    }

    // buttons[i].innerText = keys[i][lang][shift];

    if (keys[i].code === e.code) {
      buttons[i].classList.toggle('pressed');

      if (!isServiceKey) {
        e.preventDefault();
        textarea.focus();
      } else {
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
      if (e.code === 'AltLeft' || e.code === 'AltRight') {
        return;
      }
      if (e.code === 'CapsLock') {
        isCaps = !isCaps;
        // buttons[i].classList.toggle('pressed');
        return;
      }

      textarea.value += buttons[i].innerText;
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
    if (isCaps) {
      if (buttons[i].innerText.length === 1)
        buttons[i].innerText = keys[i][languages[+currentLang]]['normal'].toUpperCase();
    } else {
      buttons[i].innerText = keys[i][lang][shift];
    }
    if (buttons[i].classList.contains('pressed')) {
      if (buttons[i].innerText !== 'CapsLock') buttons[i].classList.remove('pressed');
    }
  }
  pageLanguage.innerText = lang;
  textarea.focus();
});
