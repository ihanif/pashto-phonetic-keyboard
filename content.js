const pashtoMap = {
  a: "ا",
  A: "آ",
  b: "ب",
  B: "ب",
  c: "چ",
  C: "ث",
  d: "د",
  D: "ډ",
  e: "ع",
  E: "ږ",
  f: "ف",
  F: "گ",
  g: "ګ",
  G: "غ",
  h: "ح",
  H: "ځ",
  i: "ي",
  I: "ې",
  j: "ج",
  J: "ض",
  k: "ک",
  K: "خ",
  l: "ل",
  L: "ء",
  m: "م",
  M: "م",
  n: "ن",
  N: "ڼ",
  o: "ه",
  O: "ۀ",
  p: "پ",
  P: "څ",
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
  ",": "،",
  ".": ".",
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
  Space: " ",
};

const qwertyLayout = [
  ["Delete","=", "-", "0", "9", "8", "7", "6", "5", "4", "3", "2", "1", "`", "§"],
  ["\\", "]", "[", "p", "o", "i", "u", "y", "t", "r", "e", "w", "q", "Tab"],
  ["Enter", "'", ";", "l", "k", "j", "h", "g", "f", "d", "s", "a", "Caps"],
  ["Shift", "/", ".", ",", "m", "n", "b", "v", "c", "x", "z", "Shift"],
  ["Space", ],
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
  Space: " ",
};

let isShiftActive = false;
let isKeyboardEnabled = false;
let isKeybindingEnabled = false;
let activeInput = null;

function transliterate(input) {
  return input
    .split("")
    .map((char) => pashtoMap[char] || char)
    .join("");
}

function createKeyboardOverlay() {
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
    isKeyboardEnabled = false;
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
      
      const displayKey = isShiftActive ? (shiftMap[key] || key) : key;
      const displayPashto = pashtoMap[displayKey] || "";
      
      button.innerHTML = `
        <span class="english">${displayKey}</span>
        <span class="pashto">${displayPashto}</span>
      `;
      
      button.addEventListener("click", () => handleButtonClick(key));
      rowDiv.appendChild(button);
    });

    overlay.appendChild(rowDiv);
  });

  document.body.appendChild(overlay);
  makeDraggable(overlay);

  // Initialize position
  const rect = overlay.getBoundingClientRect();
  overlay.style.top = `${window.innerHeight - rect.height - 50}px`;
  overlay.style.left = `${(window.innerWidth - rect.width) / 2}px`;
  overlay.style.transform = 'none';
}

function updateKeyboardOverlay() {
  const overlay = document.getElementById("keyboard-overlay");
  if (!overlay) return;
  
  overlay.querySelectorAll(".keyboard-row").forEach(rowDiv => rowDiv.remove());

  qwertyLayout.forEach(row => {
    const rowDiv = document.createElement("div");
    rowDiv.className = "keyboard-row";

    row.forEach(key => {
      const button = document.createElement("button");
      button.className = `keyboard-button ${key === "Space" ? "keyboard-space" : ""}`;
      
      const displayKey = isShiftActive ? (shiftMap[key] || key) : key;
      const displayPashto = pashtoMap[displayKey] || "";
      
      button.innerHTML = `
        <span class="english">${displayKey}</span>
        <span class="pashto">${displayPashto}</span>
      `;
      
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

  switch (key) {
    case "Shift":
      isShiftActive = !isShiftActive;
      updateKeyboardOverlay();
      break;
    case "Caps":
      // Toggle Caps state
      break;
    case "Enter":
      insertText("\n", hasSelection, start, end);
      break;
    case "Tab":
      insertText("\t", hasSelection, start, end);
      break;
    case "Delete":
      if (start > 0) {
        activeInput.value = activeInput.value.slice(0, start - 1) + activeInput.value.slice(end);
        activeInput.selectionStart = activeInput.selectionEnd = start - 1;
      }
      break;
    default:
      const actualKey = isShiftActive ? shiftMap[key] || key : key;
      const char = pashtoMap[actualKey] || actualKey;
      insertText(char, hasSelection, start, end);
  }
}

function insertText(text, hasSelection, start, end) {
  if (activeInput.isContentEditable) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    range.deleteContents();
    range.insertNode(document.createTextNode(text));
    range.collapse(false);
  } else {
    const before = activeInput.value.slice(0, start);
    const after = activeInput.value.slice(hasSelection ? end : start);
    activeInput.value = `${before}${text}${after}`;
    activeInput.focus();
    const newPosition = start + text.length;
    activeInput.selectionStart = newPosition;
    activeInput.selectionEnd = newPosition;
  }
}

function handleKeyPress(event) {
  if (!isKeybindingEnabled) return;
  
  // Allow special key combinations to work (Ctrl/Cmd+A, Ctrl/Cmd+C, etc.)
  if (event.ctrlKey || event.metaKey) return;
  
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
  
  const phoneticToggle = document.createElement('button');
  phoneticToggle.className = 'pashto-control-btn phonetic-toggle';
  phoneticToggle.innerHTML = "پښتو ⚡";
  phoneticToggle.title = 'Enable/Disable Pashto Phonetic Keyboard';
  phoneticToggle.addEventListener('click', () => {
    isKeybindingEnabled = !isKeybindingEnabled;
    phoneticToggle.classList.toggle('active', isKeybindingEnabled);
    toggleKeyboardButton(controlsWrapper, isKeybindingEnabled);
  });

  controlsWrapper.appendChild(phoneticToggle);
  inputElement.parentNode.insertBefore(controlsWrapper, inputElement.nextSibling);
}

function toggleKeyboardButton(wrapper, isEnabled) {
  let keyboardToggle = wrapper.querySelector('.keyboard-toggle');
  
  if (isEnabled) {
    if (!keyboardToggle) {
      keyboardToggle = document.createElement('button');
      keyboardToggle.className = 'pashto-control-btn keyboard-toggle';
      keyboardToggle.innerHTML = '⌨️';
      keyboardToggle.title = 'Show/Hide Virtual Keyboard';
      keyboardToggle.addEventListener('click', toggleKeyboard);
      wrapper.appendChild(keyboardToggle);
    }
  } else {
    if (keyboardToggle) {
      keyboardToggle.remove();
    }
  }
}

function toggleKeyboard() {
  isKeyboardEnabled = !isKeyboardEnabled;
  const keyboardToggle = document.querySelector('.keyboard-toggle');
  if (keyboardToggle) {
    keyboardToggle.classList.toggle('active', isKeyboardEnabled);
  }
  
  if (isKeyboardEnabled) {
    createKeyboardOverlay();
  } else {
    const overlay = document.getElementById('keyboard-overlay');
    if (overlay) {
      overlay.classList.remove('visible');
    }
  }
}

function handleKeyboardInput(event) {
  if (!isKeybindingEnabled || !activeInput) return;
  
  // Allow special key combinations to work (Ctrl/Cmd+A, Ctrl/Cmd+C, etc.)
  if (event.ctrlKey || event.metaKey) return;
  
  const key = event.key.toLowerCase();
  if (pashtoMap[key]) {
    event.preventDefault();
    const start = activeInput.selectionStart;
    const end = activeInput.selectionEnd;
    insertText(pashtoMap[key], start !== end, start, end);
  }
}

/**
 * Utility function to check if the current key event is a keyboard shortcut
 * @param {KeyboardEvent} event - The keyboard event to check
 * @return {boolean} - True if the event is a keyboard shortcut that should be preserved
 */
function isKeyboardShortcut(event) {
  // Check for common shortcuts with modifier keys
  if (event.ctrlKey || event.metaKey) {
    // Common shortcuts: Ctrl/Cmd + A/C/V/X/Z/F/P/S
    const commonShortcuts = ['a', 'c', 'v', 'x', 'z', 'f', 'p', 's'];
    if (commonShortcuts.includes(event.key.toLowerCase())) {
      return true;
    }
  }
  
  // Navigation keys
  const navigationKeys = [
    'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
    'PageUp', 'PageDown', 'Home', 'End',
    'Tab', 'Escape'
  ];
  
  if (navigationKeys.includes(event.key)) {
    return true;
  }
  
  // Detect browser-specific shortcuts
  // Allow Alt/Option key combinations for special characters on macOS
  if (event.altKey) {
    return true;
  }
  
  return false;
}

// Replace existing event listener with updated one
document.removeEventListener("keydown", (event) => {}); // Remove any previous listener

document.addEventListener("keydown", (event) => {
  if (!activeInput || !isKeybindingEnabled) return;

  // Check for shortcuts that should be preserved
  if (isKeyboardShortcut(event)) {
    return;
  }
  
  switch (event.key) {
    case "Shift":
      // Don't prevent default for Shift key to allow shift selection
      isShiftActive = !isShiftActive;
      updateKeyboardOverlay();
      break;
    case "Caps":
      // Handle Caps toggle
      break;
    case "Enter":
      // Don't prevent default for Enter key in most contexts
      if (activeInput.tagName.toLowerCase() !== "textarea" && !activeInput.getAttribute("contenteditable")) {
        event.preventDefault();
        insertText("\n", false, activeInput.selectionStart, activeInput.selectionEnd);
      }
      break;
    case "Delete":
    case "Backspace":
      // Let Delete/Backspace work normally
      return;
    default:
      if (pashtoMap[event.key]) {
        event.preventDefault();
        insertText(pashtoMap[event.key], false, activeInput.selectionStart, activeInput.selectionEnd);
      }
  }
});

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
    'textarea, [contenteditable="true"]'
  );
  inputs.forEach(addPashtoKeyboard);
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) {
          const inputs = node.querySelectorAll('textarea, [contenteditable="true"]');
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

initializePashtoKeyboard();
document.addEventListener('DOMContentLoaded', initializePashtoKeyboard);

function makeDraggable(element) {
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
