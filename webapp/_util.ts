export function xmur3(str: string) {
  for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = h << 13 | h >>> 19;
  }
  return function () {
    h = Math.imul(h ^ h >>> 16, 2246822507);
    h = Math.imul(h ^ h >>> 13, 3266489909);
    return ((h ^= h >>> 16) >>> 0) / (2 ** 32);
  }
}

export let random = xmur3("");

export function srand(str: string = "") {
  random = xmur3(str)
}

export function array(length: number) {
  return Array.from({length});
}

export function randomInt(max: number) {
  return Math.floor(random() * max);
}

function randomElement(array: string | any[]) {
  return array[randomInt(array.length)];
}

export function randomWord() {
  const consonants = 'cdfghjklmnpqrstvwxz';
  const vowels = 'aeiouy';

  function randomSyllable() {
    while (true) {
      const syllable = `${(randomElement(consonants))}${vowels[randomInt(vowels.length)]}`;
      if (syllable !== 'fu') return syllable;
    }
  }

  return array(randomInt(5) + 1).map(() => randomSyllable()).join('');
}

export function randomParagraph(size: number) {
  return array(randomInt(size) + 1).map(() => randomWord()).join(' ');
}