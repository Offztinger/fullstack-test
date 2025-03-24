/**
 *
 * @param {KEY} key
 * @param {VALUE} value
 */

export const setDataLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

