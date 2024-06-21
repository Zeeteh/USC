// tools/Array.js

/**
 * Iteriert über ein Array und ruft für jedes Element eine Callback-Funktion auf.
 * @param {Array} array - Das Array, über das iteriert werden soll.
 * @param {Function} callback - Die Callback-Funktion, die für jedes Element aufgerufen wird.
 */
var each = function(array, callback) {
	for (var i = 0; i < array.length; i++) {
	  callback(array[i], i, array);
	}
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
  