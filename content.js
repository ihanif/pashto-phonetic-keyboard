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
  ["`", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "\\"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "Enter"],
  ["Shift", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "Shift"],
  ["Space"],
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
  if (!activeInput) 
return;

  const overlay = document.createElement("div");
  overlay.className = "keyboard-overlay";
  overlay.id = "keyboard-overlay";

  const closeBtn = document.createElement("button");
  closeBtn.className = "keyboard-close";
  closeBtn.innerText = "Close";
  closeBtn.addEventListener("click", () => {
    document.body.removeChild(overlay);
  });
  overlay.appendChild(closeBtn);

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
    const overlay = document.getElementById('keyboard-overlay');
    if (overlay) {
      overlay.style.display = isKeyboardEnabled ? 'flex' : 'none';
    } else if (isKeyboardEnabled) {
      createKeyboardOverlay();
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
  createControlButtons(inputElement);
  
  inputElement.addEventListener('focus', () => {
    activeInput = inputElement;
  });
  
  inputElement.addEventListener('blur', () => {
    if (activeInput === inputElement) {
      activeInput = null;
    }
  });
  
  inputElement.addEventListener('keypress', handleKeyPress);
}

document.addEventListener('DOMContentLoaded', () => {
  const inputs = document.querySelectorAll(
    'input[type="text"], textarea, div[role="textbox"], div[contenteditable="true"]'
  );
  inputs.forEach(addPashtoKeyboard);
  
  // Monitor for dynamically added input fields
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) { // Element node
          const inputs = node.querySelectorAll(
            'input[type="text"], textarea, div[role="textbox"], div[contenteditable="true"]'
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
});
