import {DependencyList, useCallback, useEffect, useState} from "react";

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
  const consonants = 'dfghjklmnpqrstvwz';
  const vowels = 'aeiouy';

  function randomSyllable() {
    return `${(randomElement(consonants))}${vowels[randomInt(vowels.length)]}`;
  }

  while (true) {
    const word = array(randomInt(5) + 1).map(() => randomSyllable()).join('');
    if (!word.match(/fuc|fuk|fux|sex|dic|dik|pus/))  return word;
  }
}

export function randomParagraph(size: number) {
  return array(randomInt(size) + 1).map(() => randomWord()).join(' ');
}

export type CancellablePromise<T> = Promise<T> & { cancel?: () => any };

export function useAsyncCallback<T>(initialState: T, asyncFn: () => CancellablePromise<T>, deps: DependencyList) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const asyncCallback = useCallback(asyncFn, deps);
  const [data, setData] = useState<T>(initialState);
  const [error, setError] = useState<any>();
  useEffect(() => {
    const promise = asyncCallback && asyncCallback();
    if (promise) {
      promise.then((data) => {
        setData(data);
        setError(undefined);
      }).catch((error) => {
        setData(initialState);
        setError(error);
      });
      return () => promise.cancel && promise.cancel();
    }
  }, [asyncCallback, setData, initialState]);
  return {data, error};
}

export function setCancellableTimeout<T>(fn: () => T, ms: number): CancellablePromise<T> {
  let timeout: NodeJS.Timeout;
  const promise: CancellablePromise<T> = new Promise(resolve => {
    timeout = setTimeout(() => resolve(fn()), ms);
  });
  promise.cancel = () => clearTimeout(timeout);
  return promise;
}