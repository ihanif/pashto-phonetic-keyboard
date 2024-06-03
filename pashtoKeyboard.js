const pashtoMap = {
  a: "ا",
  b: "ب",
  p: "پ",
  t: "ت",
  th: "ټ",
  j: "ج",
  ch: "چ",
  kh: "خ",
  d: "د",
  r: "ر",
  z: "ز",
  zh: "ژ",
  s: "س",
  sh: "ش",
  gh: "غ",
  f: "ف",
  q: "ق",
  k: "ک",
  g: "ګ",
  l: "ل",
  m: "م",
  n: "ن",
  h: "ه",
  w: "و",
  y: "ی",
  i: "ې",
  ai: "ۍ",
};

function transliterate(input) {
  let result = "";
  let i = 0;

  while (i < input.length) {
    let match = "";

    if (i + 1 < input.length) {
      const twoChar = input.substring(i, i + 2);
      if (pashtoMap[twoChar]) {
        match = pashtoMap[twoChar];
        i += 2;
      }
    }

    if (!match) {
      const oneChar = input.charAt(i);
      if (pashtoMap[oneChar]) {
        match = pashtoMap[oneChar];
      }
      i += 1;
    }

    result += match || input.charAt(i - 1);
  }

  return result;
}

const Keyboard = window.SimpleKeyboard.default;
const myKeyboard = new Keyboard({
  onChange: (input) => {
    document.querySelector("#input").value = transliterate(input);
  },
  layout: {
    default: [
      "a b p t th j ch kh d r",
      "z zh s sh gh f q k g l",
      "m n h w y i ai {bksp}",
      "{space}",
    ],
  },
});
