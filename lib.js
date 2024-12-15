/* document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const text = params.get('text');
  if (text) {
    const textarea = document.getElementById('popup-input');
    textarea.value = text;
  }
}); */
class PhoneticPashtoKeyboard {
  constructor(isKeyboardEnabled = false, isKeybindingEnabled = false, isShiftActive = false, ) {
    this.isShiftActive = isShiftActive;
    this.isKeyboardEnabled = isKeyboardEnabled;
    this.isKeybindingEnabled = isKeybindingEnabled;
    this.activeInput = null;
  }

  initialize() {
    const inputs = document.querySelectorAll('textarea, [contenteditable="true"]');
    inputs.forEach(input => this.addKeyboard(input));

    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) {
            const inputs = node.querySelectorAll('textarea, [contenteditable="true"]');
            console.log(inputs);
            inputs.forEach(input => this.addKeyboard(input));
          }
        });
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  addKeyboard(inputElement) {
    console.log(inputElement);
    if (inputElement.dataset.hasPashtoKeyboard) return;
    inputElement.dataset.hasPashtoKeyboard = 'true';

    this.createControlButtons(inputElement);

    inputElement.addEventListener('focus', () => {
      this.activeInput = inputElement;
    });

    inputElement.addEventListener('blur', event => {
      const keyboard = document.getElementById('keyboard-overlay');
      if (keyboard && !keyboard.contains(event.relatedTarget)) {
        this.activeInput = null;
      }
    });

    inputElement.addEventListener('keypress', event => this.handleKeyboardInput(event));
  }

  createControlButtons(inputElement) {
    const controlsWrapper = document.createElement('div');
    controlsWrapper.className = 'pashto-keyboard-controls';

    const phoneticToggle = document.createElement('button');
    phoneticToggle.className = 'pashto-control-btn phonetic-toggle';
    phoneticToggle.innerHTML = "پښتو ⚡";
    phoneticToggle.title = 'Enable/Disable Pashto Phonetic Keyboard';
    phoneticToggle.addEventListener('click', () => {
      this.isKeybindingEnabled = !this.isKeybindingEnabled;
      phoneticToggle.classList.toggle('active', this.isKeybindingEnabled);
      this.toggleKeyboardButton(controlsWrapper, this.isKeybindingEnabled);
    });

    controlsWrapper.appendChild(phoneticToggle);
    inputElement.parentNode.insertBefore(controlsWrapper, inputElement.nextSibling);
  }

  toggleKeyboardButton(wrapper, isEnabled) {
    let keyboardToggle = wrapper.querySelector('.keyboard-toggle');

    if (isEnabled) {
      if (!keyboardToggle) {
        keyboardToggle = document.createElement('button');
        keyboardToggle.className = 'pashto-control-btn keyboard-toggle';
        keyboardToggle.innerHTML = '⌨️';
        keyboardToggle.title = 'Show/Hide Virtual Keyboard';
        keyboardToggle.addEventListener('click', () => this.toggleKeyboard());
        wrapper.appendChild(keyboardToggle);
      }
    } else {
      if (keyboardToggle) {
        keyboardToggle.remove();
      }
    }
  }

  toggleKeyboard() {
    this.isKeyboardEnabled = !this.isKeyboardEnabled;
    const keyboardToggle = document.querySelector('.keyboard-toggle');
    if (keyboardToggle) {
      keyboardToggle.classList.toggle('active', this.isKeyboardEnabled);
    }

    if (this.isKeyboardEnabled) {
      this.createKeyboardOverlay();
    } else {
      const overlay = document.getElementById('keyboard-overlay');
      if (overlay) {
        overlay.classList.remove('visible');
      }
    }
  }

  createKeyboardOverlay() {
    let overlay = document.getElementById("keyboard-overlay");

    if (overlay) {
      overlay.classList.toggle('visible');
      return;
    }

    overlay = document.createElement("div");
    overlay.className = "keyboard-overlay visible";
    overlay.id = "keyboard-overlay";

    const toolbar = document.createElement("div");
    toolbar.className = "keyboard-toolbar";

    const title = document.createElement("span");
    title.className = "keyboard-title";
    title.textContent = "پښتو فونیټیک کیبورډ";

    const closeBtn = document.createElement("button");
    closeBtn.className = "keyboard-close";
    closeBtn.innerHTML = "×";
    closeBtn.addEventListener("click", () => {
      overlay.classList.remove('visible');
      this.isKeyboardEnabled = false;
      document.querySelector('.keyboard-toggle')?.classList.remove('active');
    });

    toolbar.appendChild(title);
    toolbar.appendChild(closeBtn);
    overlay.appendChild(toolbar);

    qwertyLayout.forEach(row => {
      const rowDiv = document.createElement("div");
      rowDiv.className = "keyboard-row";

      row.forEach(key => {
        const button = document.createElement("button");
        button.className = `keyboard-button ${key === "Space" ? "keyboard-space" : ""}`;

        const displayKey = this.isShiftActive ? (shiftMap[key] || key) : key;
        const displayPashto = pashtoMap[displayKey] || "";

        button.innerHTML = `
          <span class="english">${displayKey}</span>
          <span class="pashto">${displayPashto}</span>
        `;

        button.addEventListener("click", () => this.handleButtonClick(key));
        rowDiv.appendChild(button);
      });

      overlay.appendChild(rowDiv);
    });

    document.body.appendChild(overlay);
    this.makeDraggable(overlay);

    const rect = overlay.getBoundingClientRect();
    overlay.style.top = `${window.innerHeight - rect.height - 50}px`;
    overlay.style.left = `${(window.innerWidth - rect.width) / 2}px`;
    overlay.style.transform = 'none';
  }

  handleButtonClick(key) {
    if (!this.activeInput) return;

    const start = this.activeInput.selectionStart;
    const end = this.activeInput.selectionEnd;
    const hasSelection = start !== end;

    switch (key) {
      case "Shift":
        this.isShiftActive = !this.isShiftActive;
        this.updateKeyboardOverlay();
        break;
      case "Caps":
        break;
      case "Enter":
        this.insertText("\n", hasSelection, start, end);
        break;
      case "Tab":
        this.insertText("\t", hasSelection, start, end);
        break;
      case "Delete":
        if (start > 0) {
          this.activeInput.value = this.activeInput.value.slice(0, start - 1) + this.activeInput.value.slice(end);
          this.activeInput.selectionStart = this.activeInput.selectionEnd = start - 1;
        }
        break;
      default:
        const actualKey = this.isShiftActive ? shiftMap[key] || key : key;
        const char = pashtoMap[actualKey] || actualKey;
        this.insertText(char, hasSelection, start, end);
    }
  }

  insertText(text, hasSelection, start, end) {
    if (this.activeInput.isContentEditable) {
      const selection = window.getSelection();
      if (!selection.rangeCount) return;
      const range = selection.getRangeAt(0);
      range.deleteContents();
      range.insertNode(document.createTextNode(text));
      range.collapse(false);
    } else {
      const before = this.activeInput.value.slice(0, start);
      const after = this.activeInput.value.slice(hasSelection ? end : start);
      this.activeInput.value = `${before}${text}${after}`;
      this.activeInput.focus();
      const newPosition = start + text.length;
      this.activeInput.selectionStart = newPosition;
      this.activeInput.selectionEnd = newPosition;
    }
  }

  handleKeyboardInput(event) {
    if (!this.isKeybindingEnabled || !this.activeInput) return;

    const key = event.key.toLowerCase();
    if (pashtoMap[key]) {
      event.preventDefault();
      const start = this.activeInput.selectionStart;
      const end = this.activeInput.selectionEnd;
      this.insertText(pashtoMap[key], start !== end, start, end);
    }
  }

  makeDraggable(element) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;

    element.addEventListener('mousedown', dragMouseDown);

    function dragMouseDown(e) {
      if (e.target.tagName.toLowerCase() === 'button') return;

      e.preventDefault();
      isDragging = true;
      pos3 = e.clientX;
      pos4 = e.clientY;

      document.addEventListener('mousemove', elementDrag);
      document.addEventListener('mouseup', closeDragElement);
    }

    function elementDrag(e) {
      if (!isDragging) return;
      e.preventDefault();

      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      const newTop = element.offsetTop - pos2;
      const newLeft = element.offsetLeft - pos1;

      element.style.top = `${Math.max(0, Math.min(window.innerHeight - element.offsetHeight, newTop))}px`;
      element.style.left = `${Math.max(0, Math.min(window.innerWidth - element.offsetWidth, newLeft))}px`;
    }

    function closeDragElement() {
      isDragging = false;
      document.removeEventListener('mousemove', elementDrag);
      document.removeEventListener('mouseup', closeDragElement);
    }
  }
}


// document.addEventListener("DOMContentLoaded", createKeyboardOverlay);
document.addEventListener("DOMContentLoaded", () => {
  const keyboard = new PhoneticPashtoKeyboard(false, false, false);
  keyboard.initialize();
});
