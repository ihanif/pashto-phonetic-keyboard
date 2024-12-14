const pashtoMap = {
  a: "ا",
  A: "آ",
  b: "ب",
  B: "پ",
  c: "چ",
  C: "ځ",
  d: "د",
  D: "ډ",
  e: "ع",
  E: "غ",
  f: "ف",
  F: "ړ",
  g: "ګ",
  G: "ک",
  h: "ح",
  H: "خ",
  i: "ي",
  I: "ې",
  j: "ج",
  J: "ځ",
  k: "ک",
  K: "ګ",
  l: "ل",
  L: "څ",
  m: "م",
  M: "پ",
  n: "ن",
  N: "ڼ",
  o: "ه",
  O: "ۀ",
  p: "پ",
  P: "ځ",
  q: "ق",
  Q: "ښ",
  r: "ر",
  R: "ړ",
  s: "س",
  S: "ص",
  t: "ت",
  T: "ټ",
  u: "ئ",
  U: "ۍ",
  v: "ط",
  V: "ظ",
  w: "و",
  W: "ؤ",
  x: "ش",
  X: "ژ",
  y: "ے",
  Y: "ی",
  z: "ز",
  Z: "ذ",
  "?": "؟",
  ";": "؛",
  0: "۰",
  1: "۱",
  2: "۲",
  3: "۳",
  4: "۴",
  5: "۵",
  6: "۶",
  7: "۷",
  8: "۸",
  9: "۹",
};

const qwertyLayout = [
  [
    { key: "esc", type: "function" },
    { key: "🔆", type: "function" },
    { key: "🔅", type: "function" },
    { key: "⧉", type: "function" },
    { key: "🔍", type: "function" },
    { key: "🎤", type: "function" },
    { key: "🌙", type: "function" },
    { key: "⏮", type: "function" },
    { key: "⏯", type: "function" },
    { key: "⏭", type: "function" },
    { key: "🔇", type: "function" },
    { key: "🔉", type: "function" },
    { key: "🔊", type: "function" },
    { key: "☰", type: "function" },
  ],
  [
    { key: "`", text: "÷" },
    { key: "1", text: "١" },
    { key: "2", text: "٢" },
    { key: "3", text: "٣" },
    { key: "4", text: "٤" },
    { key: "5", text: "٥" },
    { key: "6", text: "٦" },
    { key: "7", text: "٧" },
    { key: "8", text: "٨" },
    { key: "9", text: "٩" },
    { key: "0", text: "٠" },
    { key: "-", text: "-" },
    { key: "=", text: "=" },
    { key: "⌫", type: "backspace" },
  ],
  [
    { key: "Tab", type: "tab" },
    { key: "q", text: "ق" },
    { key: "w", text: "و" },
    { key: "e", text: "ع" },
    { key: "r", text: "ر" },
    { key: "t", text: "ت" },
    { key: "y", text: "ی" },
    { key: "u", text: "ئ" },
    { key: "i", text: "ي" },
    { key: "o", text: "ه" },
    { key: "p", text: "پ" },
    { key: "[", text: "{" },
    { key: "]", text: "}" },
  ],
  [
    { key: "CapsLock", type: "capslock" },
    { key: "a", text: "ا" },
    { key: "s", text: "س" },
    { key: "d", text: "د" },
    { key: "f", text: "ف" },
    { key: "g", text: "گ" },
    { key: "h", text: "ح" },
    { key: "j", text: "ج" },
    { key: "k", text: "ک" },
    { key: "l", text: "ل" },
    { key: ";", text: ":" },
    { key: "'", text: '"' },
    { key: "\\", text: '\\' },
    { key: "Enter", type: "enter" },
  ],
  [
    { key: "Shift", type: "shift" },
    {key: "`", type:"`"},
    { key: "z", text: "ز" },
    { key: "x", text: "س" },
    { key: "c", text: "چ" },
    { key: "v", text: "ژ" },
    { key: "b", text: "ب" },
    { key: "n", text: "ن" },
    { key: "m", text: "م" },
    { key: ",", text: "<" },
    { key: ".", text: ">" },
    { key: "/", text: "؟" },
  ],
  [
    { key: "fn", type: "function" },
    { key: "Ctrl", type: "function" },
    { key: "Alt", type: "function" },
    { key: "Cmd", type: "function" },
    { key: "Space", type: "space" },
    { key: "Cmd", type: "function" },
    { key: "Alt", type: "function" },

  ],
];

const shiftMap = {
  "`": "~",
  1: "!",
  2: "@",
  3: "#",
  4: "$",
  5: "%",
  6: "^",
  7: "&",
  8: "*",
  9: "(",
  0: ")",
  "-": "_",
  "=": "+",
  q: "Q",
  w: "W",
  e: "E",
  r: "R",
  t: "T",
  y: "Y",
  u: "U",
  i: "I",
  o: "O",
  p: "P",
  "[": "{",
  "]": "}",
  "\\": "|",
  a: "A",
  s: "S",
  d: "D",
  f: "F",
  g: "G",
  h: "H",
  j: "J",
  k: "K",
  l: "L",
  ";": ":",
  "'": '"',
  Enter: "Enter",
  z: "Z",
  x: "X",
  c: "C",
  v: "V",
  b: "B",
  n: "N",
  m: "M",
  ",": "<",
  ".": ">",
  "/": "?",
  Shift: "Shift",
  Space: " ",
};

let isShiftActive = false;
let isKeyboardEnabled = true;
let isKeybindingEnabled = true;
let activeInput = null;

function transliterate(input) {
  return input
    .split("")
    .map((char) => pashtoMap[char] || char)
    .join("");
}

function createKeyboardOverlay() {
  const existingOverlay = document.getElementById("keyboard-overlay");
  if (existingOverlay) existingOverlay.remove();
  if (!activeInput) return;

  const overlay = document.createElement("div");
  overlay.className = "keyboard-overlay" + (isKeyboardEnabled ? " visible" : "");
  overlay.id = "keyboard-overlay";

  // Create toolbar
  const toolbar = document.createElement("div");
  toolbar.className = "keyboard-toolbar";
  
  const title = document.createElement("span");
  title.className = "keyboard-title";
  title.textContent = "Keyboard";

  const closeBtn = document.createElement("button");
  closeBtn.className = "keyboard-close";
  closeBtn.innerHTML = "×";
  closeBtn.addEventListener("click", () => overlay.remove());

  toolbar.appendChild(title);
  toolbar.appendChild(closeBtn);
  overlay.appendChild(toolbar);

  // Create keyboard rows
  qwertyLayout.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";

    row.forEach(keyObj => {
      const button = document.createElement("button");
      button.className = `keyboard-button ${keyObj.type || ""}`;
      
      if (keyObj.type === "function") {
        button.innerHTML = `<span class="pashto">${keyObj.key}</span>`;
      } else {
        const displayPashto = pashtoMap[keyObj.key] || keyObj.text || "";
        button.innerHTML = `
          <span class="english">${keyObj.key}</span>
          <span class="pashto">${displayPashto}</span>
        `;
      }
      
      button.addEventListener("click", () => handleButtonClick(keyObj.key));
      rowDiv.appendChild(button);
    });

    overlay.appendChild(rowDiv);
  });

  document.body.appendChild(overlay);
}

function updateKeyboardOverlay() {
  const overlay = document.getElementById("keyboard-overlay");
  overlay
    .querySelectorAll(".keyboard-row")
    .forEach((rowDiv) => rowDiv.remove());

  qwertyLayout.forEach((row) => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";

    row.forEach((key) => {
      const button = document.createElement("button");
      button.className = `keyboard-button ${
        key === "Space" ? "keyboard-space" : ""
      }`;
      const displayKey = isShiftActive && shiftMap[key] ? shiftMap[key] : key;
      const displayPashto = pashtoMap[displayKey] || "";
      button.innerHTML = `<span class="english">${displayKey}</span><span class="pashto">${displayPashto}</span>`;
      button.addEventListener("click", () => handleButtonClick(key));
      rowDiv.appendChild(button);
    });

    overlay.appendChild(rowDiv);
  });
}

function handleButtonClick(key) {
  if (!activeInput) return;

  const start = activeInput.selectionStart;
  const end = activeInput.selectionEnd;
  const hasSelection = start !== end;

  if (key === "Shift") {
    isShiftActive = !isShiftActive;
    updateKeyboardOverlay();
  } else if (key === "Space") {
    insertText(" ", hasSelection, start, end);
  } else {
    const actualKey = isShiftActive ? shiftMap[key] : key;
    const char = pashtoMap[actualKey] || actualKey;
    insertText(char, hasSelection, start, end);
  }
}

function insertText(text, hasSelection, start, end) {
  const before = activeInput.value.slice(0, start);
  const after = activeInput.value.slice(hasSelection ? end : start);
  activeInput.value = `${before}${text}${after}`;
  activeInput.focus();
  const newPosition = start + text.length;
  activeInput.selectionStart = newPosition;
  activeInput.selectionEnd = newPosition;
}

function handleKeyPress(event) {
  if (!isKeybindingEnabled) return;
  
  const key = event.key;
  if (pashtoMap[key]) {
    event.preventDefault();
    const start = activeInput.selectionStart;
    const end = activeInput.selectionEnd;
    insertText(pashtoMap[key], start !== end, start, end);
  }
}

function createControlButtons(inputElement) {
  const controlsWrapper = document.createElement('div');
  controlsWrapper.className = 'pashto-keyboard-controls';
  
  const keyboardToggle = document.createElement('button');
  keyboardToggle.className = 'pashto-control-btn keyboard-toggle';
  keyboardToggle.innerHTML = '⌨️';
  keyboardToggle.title = 'Toggle Virtual Keyboard';
  keyboardToggle.addEventListener('click', () => {
    isKeyboardEnabled = !isKeyboardEnabled;
    keyboardToggle.classList.toggle('active', isKeyboardEnabled);
    
    let overlay = document.getElementById('keyboard-overlay');
    if (!overlay && isKeyboardEnabled) {
      createKeyboardOverlay();
      overlay = document.getElementById('keyboard-overlay');
    }
    if (overlay) {
      overlay.classList.toggle('visible', isKeyboardEnabled);
    }
  });

  const keybindingToggle = document.createElement('button');
  keybindingToggle.className = 'pashto-control-btn keybinding-toggle active';
  keybindingToggle.innerHTML = '⚡';
  keybindingToggle.title = 'Toggle Keybindings';
  keybindingToggle.addEventListener('click', () => {
    isKeybindingEnabled = !isKeybindingEnabled;
    keybindingToggle.classList.toggle('active', isKeybindingEnabled);
  });

  const expandButton = document.createElement('button');
  expandButton.className = 'pashto-control-btn expand';
  expandButton.innerHTML = '⇱';
  expandButton.title = 'Open in Large Editor';
  expandButton.addEventListener('click', () => {
    const text = inputElement.value || inputElement.textContent;
    const editorUrl = chrome.runtime.getURL('newtab.html');
    window.open(`${editorUrl}?text=${encodeURIComponent(text)}`, '_blank');
  });

  controlsWrapper.appendChild(keyboardToggle);
  controlsWrapper.appendChild(keybindingToggle);
  controlsWrapper.appendChild(expandButton);
  
  inputElement.parentNode.insertBefore(controlsWrapper, inputElement.nextSibling);
}

function addPashtoKeyboard(inputElement) {
  if (inputElement.dataset.hasPashtoKeyboard) return;
  inputElement.dataset.hasPashtoKeyboard = 'true';
  
  createControlButtons(inputElement);
  
  inputElement.addEventListener('focus', () => {
    activeInput = inputElement;
  });
  
  inputElement.addEventListener('blur', (event) => {
    const keyboard = document.getElementById('keyboard-overlay');
    if (keyboard && !keyboard.contains(event.relatedTarget)) {
      activeInput = null;
    }
  });
  
  inputElement.addEventListener('keypress', handleKeyboardInput);
}

function initializePashtoKeyboard() {
  const inputs = document.querySelectorAll(
    'input[type="text"], textarea, [contenteditable="true"]'
  );
  inputs.forEach(addPashtoKeyboard);
  
  // Monitor for dynamically added input fields
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const inputs = node.querySelectorAll(
            'input[type="text"], textarea, [contenteditable="true"]'
          );
          inputs.forEach(addPashtoKeyboard);
        }
      });
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

// Initialize immediately and also on DOMContentLoaded
initializePashtoKeyboard();
document.addEventListener('DOMContentLoaded', initializePashtoKeyboard);

// Add this function to handle keyboard input
function handleKeyboardInput(event) {
  if (!isKeybindingEnabled || !activeInput) return;
  
  const key = event.key.toLowerCase();
  if (pashtoMap[key]) {
    event.preventDefault();
    const start = activeInput.selectionStart;
    const end = activeInput.selectionEnd;
    insertText(pashtoMap[key], start !== end, start, end);
  }
}
