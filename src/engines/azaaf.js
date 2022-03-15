// @ts-ignore
import words from "../words.txt";

const ABJAD = "ابجدھوزحطیکلمنسعفصقرشتثخذضظغ";
const AIQGH = [
  ["ا", "ی", "ق", "غ"],
  ["ب", "ک", "ر"],
  ["ج", "ل", "ش"],
  ["د", "م", "ت"],
  ["و", "س", "خ"],
  ["ز", "ع", "ذ"],
  ["ھ", "ن", "ث"],
  ["ح", "ف", "ض"],
  ["ط", "ص", "ظ"],
];

const test = [
  ["ا", "ی", "ق", "غ"],
  ["ب", "ک", "ر"],
];

const urduWordsList = [];

export const bastHurfi = (satarString) => {
  satarString = satarString.replace(new RegExp("ے", "g"), "ی");
  satarString = satarString.replace(new RegExp("پ", "g"), "ب");
  satarString = satarString.replace(new RegExp("ٹ", "g"), "ت");
  satarString = satarString.replace(new RegExp("چ", "g"), "ج");
  satarString = satarString.replace(new RegExp("ڈ", "g"), "د");
  satarString = satarString.replace(new RegExp("ڑ", "g"), "ر");
  satarString = satarString.replace(new RegExp("ژ", "g"), "ر");
  satarString = satarString.replace(new RegExp("ہ", "g"), "ھ");
  satarString = satarString.replace(new RegExp("گ", "g"), "ک");
  satarString = satarString.replace(new RegExp("ي", "g"), "ی");
  satarString = satarString.replace(new RegExp("ں", "g"), "ن");
  satarString = satarString.replace(new RegExp("ئ", "g"), "ی");
  satarString = satarString.replace(new RegExp("آ", "g"), "ا");
  return satarString.replace(new RegExp(" ", "g"), "").split("");
};

const calculateAzaaf = (num) => {
  num *= 2;
  if (num <= 9) {
    return num;
  } else {
    return num - 9;
  }
};

export const khalis = (huruf) => {
  // @ts-ignore
  let unique = [...new Set(huruf)];
  return unique;
};

export const qeemat = (huruf) => {
  var abjadValues = [];
  huruf.forEach((hurf) => {
    const calculatedQeemat = calculateAzaaf((ABJAD.indexOf(hurf) + 1) % 9);
    abjadValues.push(calculatedQeemat == 0 ? 9 : calculatedQeemat);
  });
  return abjadValues;
};

export const muakharSadar = (huruf) => {
  var start = 0;
  var end = huruf.length - 1;
  var newValues = [];
  if (huruf.length == 1) {
    return huruf;
  }
  if (huruf) {
    while (end + 1 > start) {
      if (end == start) {
        newValues.push(huruf[end]);
      } else {
        newValues.push(huruf[end]);
        newValues.push(huruf[start]);
      }
      end--;
      start++;
    }
  }
  return newValues;
};

const detectCombinations = (input, output, position, path) => {
  if (position == null) {
    position = 0;
  }
  if (path == null) {
    path = [];
  }
  if (position < input.length) {
    var item = input[position];
    for (var i = 0; i < item.length; ++i) {
      var value = item[i];
      path.push(value);
      detectCombinations(input, output, position + 1, path);
      path.pop();
    }
  } else {
    output.push(path.slice().join(""));
  }
};

/**
 * maxCount means longest word to find first
 */
export const findWords2 = (huruf, maxCount, onResult) => {
  var tokens = [];
  var outputArr = [];
  var result = [[]];
  fetch(words)
    .then((r) => r.text())
    .then((text) => {
      tokens = text.split("\n");
    })
    .then(() => {
      var st = 0;
      var en = maxCount - 1;
      var count = 0;
      while (en < huruf.length) {
        console.log("st", st);
        console.log("en", en);
        const slice = huruf.slice(st, en + 1);
        var currentSliceAiqgh = [];
        slice.forEach((adad) => {
          currentSliceAiqgh.push(AIQGH[adad - 1]);
        });
        detectCombinations(currentSliceAiqgh, outputArr);
        outputArr.forEach((element) => {
          checkWordInTokens(element, tokens, (wordFound) => {
            if (wordFound) {
              console.log("worddfound", wordFound);
              result[count].push({ value: wordFound, label: wordFound });
            }
          });
        });
        if (result[count].length == 0 && en > 0) {
          en--;
        } else {
          if (en == huruf.length - 1) {
            break;
          }

          st = en + 1;
          en = en + maxCount;
          if (en >= huruf.length) {
            en = huruf.length - 1;
          }
          count++;
          result[count] = [];
          outputArr = [];
        }
      }
    })
    .finally(() => {
      onResult(result);
    });
};

export const findWords = (huruf, length, balanced, onResult) => {
  var outputArr = [];
  var result = [[]];
  var tokens = [];
  fetch(words)
    .then((r) => r.text())
    .then((text) => {
      tokens = text.split("\n");
    })
    .then(() => {
      const chunks = chunkify(huruf, length, balanced);
      var count = 0;
      chunks.forEach((chunk) => {
        var currentChunkAiqgh = [];
        chunk.forEach((adad) => {
          currentChunkAiqgh.push(AIQGH[adad - 1]);
        });
        detectCombinations(currentChunkAiqgh, outputArr);
        outputArr.forEach((element) => {
          // if (tokens.includes(element)) {
          //   result[count].push({ value: element, label: element });
          // }
          checkWordInTokens(element, tokens, (wordFound) => {
            if (wordFound) {
              result[count].push({ value: wordFound, label: wordFound });
            }
          });
        });
        count++;
        if (count < chunk.length) {
          result[count] = [];
          outputArr = [];
        }
      });
    })
    .finally(() => {
      onResult(result);
    });
};

function getAlternateLetter(letter) {
  switch (letter) {
    case "ی":
      return "ے";
    case "ب":
      return "پ";
    case "ت":
      return "ٹ";
    case "ج":
      return "چ";
    case "د":
      return "ڈ";
    case "ر":
      return "ڑ";
    case "ھ":
      return "ہ";
    case "ک":
      return "گ";
    case "ی":
      return "ي";
    case "ن":
      return "ں";
    case "ی":
      return "ئ";
    case "ا":
      return "آ";
    default:
      break;
  }
}

function checkWordInTokens(word, tokens, wordFound) {
  tokens.forEach((element) => {
    element = element.trim();
    if (element.length == word.length) {
      var count = 0;
      for (let i = 0; i < word.length; i++) {
        if (
          word.charAt(i) == element.charAt(i) ||
          getAlternateLetter(word.charAt(i)) == element.charAt(i)
        ) {
          count++;
        }
      }

      if (count == word.length) {
        wordFound(element);
      }
    }
  });
}

function chunkify(a, n, balanced) {
  if (n < 2) return [a];

  var len = a.length,
    out = [],
    i = 0,
    size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) size--;
    while (i < size * n) {
      out.push(a.slice(i, (i += size)));
    }
    out.push(a.slice(size * n));
  }

  return out;
}
