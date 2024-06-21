// tools/Number.js

/**
 * Formatiert eine Zahl mit Tausenderpunkten.
 * @param {number} number - Die zu formatierende Zahl.
 * @param {string} [separator='.'] - Der zu verwendende Tausendertrennzeichen (Standard: '.').
 * @returns {string} Die formatierte Zahl als String.
 */
var formatNumber = function(number, separator) {
  if (separator === undefined) {
    separator = '.';
  }
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator);
};

/**
 * Rundet eine Zahl auf eine bestimmte Anzahl von Dezimalstellen.
 * @param {number} number - Die zu rundende Zahl.
 * @param {number} decimals - Die Anzahl der Dezimalstellen (Standard: 2).
 * @returns {number} Die gerundete Zahl.
 */
var round = function(number, decimals) {
  if (decimals === undefined) {
    decimals = 2;
  }
  return Number(Math.round(number + 'e' + decimals) + 'e-' + decimals);
};

module.exports = {
  formatNumber: formatNumber,
  round: round
};
