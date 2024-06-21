// tools/Object.js

/**
 * Gibt ein Array der Werte eines Objekts zurück.
 * @param {Object} obj - Das Objekt, dessen Werte abgerufen werden sollen.
 * @returns {Array} Ein Array mit den Werten des Objekts.
 */
var values = function(obj) {
	var result = [];
	for (var key in obj) {
	  if (obj.hasOwnProperty(key)) { // Sicherstellen, dass die Eigenschaft direkt zum Objekt gehört
		result.push(obj[key]);
	  }
	}
	return result;
  };
  
  /**
   * Gibt ein Array der Schlüssel eines Objekts zurück.
   * @param {Object} obj - Das Objekt, dessen Schlüssel abgerufen werden sollen.
   * @returns {Array} Ein Array mit den Schlüsseln des Objekts.
   */
  var keys = function(obj) {
	var result = [];
	for (var key in obj) {
	  if (obj.hasOwnProperty(key)) { // Sicherstellen, dass die Eigenschaft direkt zum Objekt gehört
		result.push(key);
	  }
	}
	return result;
  };
  
  /**
   * Gibt ein Array von [Schlüssel, Wert]-Paaren eines Objekts zurück.
   * @param {Object} obj - Das Objekt, dessen Einträge abgerufen werden sollen.
   * @returns {Array} Ein Array von Arrays, wobei jedes innere Array ein [Schlüssel, Wert]-Paar darstellt.
   */
  var entries = function(obj) {
	var result = [];
	for (var key in obj) {
	  if (obj.hasOwnProperty(key)) { // Sicherstellen, dass die Eigenschaft direkt zum Objekt gehört
		result.push([key, obj[key]]);
	  }
	}
	return result;
  };
  
  module.exports = {
	values: values,
	keys: keys,
	entries: entries
  };
  