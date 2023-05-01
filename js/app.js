class Button {
  constructor() {
    // this.btn = document.createElement('button');
    // console.log('button created');
  }

  static createButton() {
    this.btn = document.createElement('button');

    console.log('button created');
    return this.btn;
  }
}

class Keyboard {
  constructor() {
    this.keyboard = document.createElement('div');
    this.keyboard.classList.add('keyboard-panel');
    document.body.appendChild(this.keyboard);
    console.log(this.keyboard);

    this.shiftMode = true;

    // this.button = new Button();
    this.btn = Button.createButton();
    this.btn.classList.add('keyboard__key');
    // this.btn.classList.add(!this.shiftMode ? '' : 'shift');
    !this.shiftMode ? this.btn.classList.add('normal') : this.btn.classList.add('shift');
    !this.shiftMode ? (this.btn.innerText = 'a') : (this.btn.innerText = 'a'.toUpperCase());
    this.keyboard.append(this.btn);
    // this.keyboard.append(this.button.btn);

    // document.addEventListener('keydown', (e) => {
    //   console.log(e);
    //   Textarea.writeText(e.key);
    // });

    // document.addEventListener('click', (e) => {
    //   console.log(e);
    //   Textarea.writeText();
    //   console.log(Textarea.textarea);
    // });
  }

  // createKeyboard() {
  //   return this.panel;
  // }
}

class Wrapper {
  constructor() {
    this.wrapper = document.createElement('div');
    this.wrapper.classList.add('container');
    document.body.append(this.wrapper);
    console.log(this.wrapper);

    this.title = document.createElement('h1');
    this.title.innerText = 'Virtual Keyboard';
    this.title.classList.add('keyboard-title');
    this.wrapper.appendChild(this.title);

    this.textarea = document.createElement('textarea');
    this.textarea.classList.add('text-wrapper');
    this.wrapper.appendChild(this.textarea);

    this.keyboard = new Keyboard();
  }
}

class App {
  constructor() {
    this.body = document.body;
    this.body.style.backgroundColor = '#333333';

    this.wrapper = new Wrapper();
  }
}

const app = new App();
