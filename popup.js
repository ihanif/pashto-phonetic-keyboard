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
let activeInput = document.getElementById("popup-input");

function transliterate(input) {
  return input
    .split("")
    .map((char) => pashtoMap[char] || char)
    .join("");
}

function createKeyboardOverlay() {
  const existingOverlay = document.getElementById("keyboard-overlay");
  if (existingOverlay) existingOverlay.remove();

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

  if (key === "Shift") {
    isShiftActive = !isShiftActive;
    updateKeyboardOverlay();
  } else if (key === "Space") {
    const cursorPos = activeInput.selectionStart;
    const before = activeInput.value.slice(0, cursorPos);
    const after = activeInput.value.slice(cursorPos);
    activeInput.value = `${before} ${after}`;
    activeInput.focus();
    activeInput.selectionStart = cursorPos + 1;
    activeInput.selectionEnd = cursorPos + 1;
  } else {
    const actualKey = isShiftActive ? shiftMap[key] : key;
    const cursorPos = activeInput.selectionStart;
    const before = activeInput.value.slice(0, cursorPos);
    const after = activeInput.value.slice(cursorPos);
    activeInput.value = `${before}${pashtoMap[actualKey] || actualKey}${after}`;
    activeInput.focus();
    activeInput.selectionStart = cursorPos + 1;
    activeInput.selectionEnd = cursorPos + 1;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.key === "Shift") {
    isShiftActive = !isShiftActive;
    updateKeyboardOverlay();
  }
});

document.getElementById("popup-input").addEventListener("keypress", (event) => {
  const key = event.key;
  if (pashtoMap[key]) {
    event.preventDefault();
    const cursorPos = activeInput.selectionStart;
    const before = activeInput.value.slice(0, cursorPos);
    const after = activeInput.value.slice(cursorPos);
    activeInput.value = `${before}${pashtoMap[key]}${after}`;
    activeInput.focus();
    activeInput.selectionStart = cursorPos + 1;
    activeInput.selectionEnd = cursorPos + 1;
  }
});

document.addEventListener("DOMContentLoaded", createKeyboardOverlay);
