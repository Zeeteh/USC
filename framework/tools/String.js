// tools/String.js

/**
 * Schneidet einen String auf eine bestimmte Länge zu und fügt bei Bedarf "..." hinzu.
 * @param {string} str - Der zu schneidende String.
 * @param {number} length - Die maximale Länge des Strings.
 * @returns {string} Der geschnittene String.
 */
var truncate = function(str, length) {
  if (str.length <= length) {
    return str;
  }
  return str.slice(0, length - 3) + '...';
};

/**
 * Füllt einen String am Anfang mit einem bestimmten Zeichen auf, bis er eine bestimmte Länge erreicht.
 * @param {string} str - Der String, der aufgefüllt werden soll.
 * @param {number} targetLength - Die gewünschte Länge des Strings.
 * @param {string} padString - Das Zeichen, mit dem aufgefüllt werden soll (Standard: ' ').
 * @returns {string} Der aufgefüllte String.
 */
var padStart = function(str, targetLength, padString) {
  if (padString === undefined) {
    padString = ' ';
  }
  var padding = padString.repeat(targetLength - str.length);
  return padding + str;
};

module.exports = {
  truncate: truncate,
  padStart: padStart
};
