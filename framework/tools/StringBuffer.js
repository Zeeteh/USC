// String.js (String-Prototyp-Erweiterungen)

if (!String.prototype.urlencode) {
	Object.defineProperty(String.prototype, "urlencode", {
	  enumerable: false,
	  configurable: false,
	  writable: false,
	  value: function urlencode() {
		return encodeURIComponent(this);
	  },
	});
  }
  
  if (!String.prototype.format) {
	Object.defineProperty(String.prototype, "format", {
	  enumerable: false,
	  configurable: false,
	  writable: false,
	  value: function format() {
		const args = arguments;
		return this.replace(/{(\d+)}/g, (match, number) =>
		  typeof args[number] != "undefined" ? args[number] : match
		);
	  },
	});
  }
  
  if (!String.prototype.formater) {
	Object.defineProperty(String.prototype, "formater", {
	  enumerable: false,
	  configurable: false,
	  writable: false,
	  value: function formater(data) {
		return this.replace(/\$[a-zA-Z0-9_\-]+/gi, (match) =>
		  typeof data[match.substring(1)] != "undefined"
			? data[match.substring(1)]
			: match
		);
	  },
	});
  }
  