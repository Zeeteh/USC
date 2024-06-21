// tools/Functions.js

/**
 * Gibt eine zufällige Zahl zwischen min (inklusive) und max (inklusive) zurück.
 * @param {number} min - Die untere Grenze (inklusive).
 * @param {number} max - Die obere Grenze (inklusive).
 * @returns {number} Eine zufällige Zahl zwischen min und max.
 */
var random = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Mischt ein Array zufällig.
 * @param {Array} array - Das zu mischende Array.
 * @returns {Array} Das gemischte Array.
 */
var shuffle = function(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

/**
 * Gibt einen zufälligen Eintrag aus einem Array zurück.
 * @param {Array} array - Das Array, aus dem ein Eintrag ausgewählt werden soll.
 * @returns {*} Ein zufälliger Eintrag aus dem Array.
 */
var randomEntry = function(array) {
  return array[random(0, array.length - 1)];
};

/**
 * Gibt ein Array mit eindeutigen Werten zurück.
 * @param {Array} array - Das Array, aus dem doppelte Werte entfernt werden sollen.
 * @returns {Array} Ein neues Array mit eindeutigen Werten.
 */
var unique = function(array) {
  var uniqueSet = new Set(array);
  return Array.from(uniqueSet); 
};

/**
 * Gibt ein Array zurück, in dem jedes Element mit einer Zahl beginnend bei 1 nummeriert ist.
 * @param {Array} array - Das Array, das nummeriert werden soll.
 * @returns {Array} Ein neues Array mit nummerierten Elementen.
 */
var enumerate = function(array) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push([i + 1, array[i]]);
  }
  return result;
};

/**
 * Gibt den ersten Eintrag eines Arrays zurück, der eine Bedingung erfüllt.
 * @param {Array} array - Das Array, in dem gesucht werden soll.
 * @param {Function} callback - Eine Callback-Funktion, die für jedes Element aufgerufen wird.
 * @returns {*} Der erste Eintrag, der die Bedingung erfüllt, oder undefined, wenn kein Eintrag gefunden wurde.
 */
var find = function(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return array[i];
    }
  }
};

/**
 * Gibt true zurück, wenn mindestens ein Eintrag in einem Array eine Bedingung erfüllt.
 * @param {Array} array - Das Array, in dem gesucht werden soll.
 * @param {Function} callback - Eine Callback-Funktion, die für jedes Element aufgerufen wird.
 * @returns {boolean} True, wenn mindestens ein Eintrag die Bedingung erfüllt, andernfalls false.
 */
var some = function(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      return true;
    }
  }
  return false;
};

/**
 * Gibt true zurück, wenn alle Einträge in einem Array eine Bedingung erfüllen.
 * @param {Array} array - Das Array, in dem gesucht werden soll.
 * @param {Function} callback - Eine Callback-Funktion, die für jedes Element aufgerufen wird.
 * @returns {boolean} True, wenn alle Einträge die Bedingung erfüllen, andernfalls false.
 */
var every = function(array, callback) {
  for (var i = 0; i < array.length; i++) {
    if (!callback(array[i], i, array)) {
      return false;
    }
  }
  return true;
};

/**
 * Gibt ein neues Array zurück, das die Ergebnisse der Anwendung einer Funktion auf jedes Element des ursprünglichen Arrays enthält.
 * @param {Array} array - Das Array, auf das die Funktion angewendet werden soll.
 * @param {Function} callback - Eine Callback-Funktion, die für jedes Element aufgerufen wird.
 * @returns {Array} Ein neues Array mit den Ergebnissen der Callback-Funktion.
 */
var map = function(array, callback) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result.push(callback(array[i], i, array));
  }
  return result;
};

/**
 * Gibt ein neues Array zurück, das nur die Elemente enthält, die eine bestimmte Bedingung erfüllen.
 * @param {Array} array - Das Array, das gefiltert werden soll.
 * @param {Function} callback - Eine Callback-Funktion, die für jedes Element aufgerufen wird.
 * @returns {Array} Ein neues Array mit den Elementen, die die Bedingung erfüllen.
 */
var filter = function(array, callback) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    if (callback(array[i], i, array)) {
      result.push(array[i]);
    }
  }
  return result;
};

/**
 * Reduziert ein Array auf einen einzigen Wert, indem eine angegebene Funktion nacheinander auf jedes Element angewendet wird.
 * @param {Array} array - Das Array, das reduziert werden soll.
 * @param {Function} callback - Eine Callback-Funktion, die für jedes Element aufgerufen wird.
 * @param {*} initialValue - Der Anfangswert für den Akkumulator.
 * @returns {*} Der endgültige Wert, der sich aus der Anwendung der Callback-Funktion auf alle Elemente ergibt.
 */
var reduce = function(array, callback, initialValue) {
  var accumulator = initialValue === undefined ? array[0] : initialValue;
  for (var i = initialValue === undefined ? 1 : 0; i < array.length; i++) {
    accumulator = callback(accumulator, array[i], i, array);
  }
  return accumulator;
};

module.exports = {
  random: random,
  shuffle: shuffle,
  randomEntry: randomEntry,
  unique: unique,
  enumerate: enumerate,
  find: find,
  some: some,
  every: every,
  map: map,
  filter: filter,
  reduce: reduce
};
