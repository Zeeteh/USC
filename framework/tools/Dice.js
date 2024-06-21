// tools/Dice.js

/**
 * Klasse, die einen Würfel repräsentiert.
 */
var Dice = function(sides) {
	if (sides === undefined) {
	  sides = 6; // Standardmäßig ein sechsseitiger Würfel
	}
	this.sides = sides;
  };
  
  /**
   * Wirft den Würfel einmal und gibt das Ergebnis zurück.
   * @returns {number} Das Ergebnis des Würfelwurfs (zwischen 1 und der Anzahl der Seiten).
   */
  Dice.prototype.roll = function() {
	return Math.floor(Math.random() * this.sides) + 1;
  };
  
  /**
   * Wirft den Würfel mehrmals und gibt die Ergebnisse als Array zurück.
   * @param {number} numRolls - Die Anzahl der Würfe.
   * @returns {Array} Ein Array mit den Ergebnissen der Würfe.
   */
  Dice.prototype.rollMultiple = function(numRolls) {
	var results = [];
	for (var i = 0; i < numRolls; i++) {
	  results.push(this.roll());
	}
	return results;
  };
  
  module.exports = Dice;
  