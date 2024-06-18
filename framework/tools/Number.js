if(!Number.prototype.fix) {
	Object.defineProperty(Number.prototype, 'fix', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function fix(count) {
			return parseFloat(this.toFixed(parseInt(count, 10) || 2));
		}
	});
}

if(!Number.prototype.format) {
	Object.defineProperty(Number.prototype, 'format', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function format(n, x, fill) {
			if(n === undefined) { n = 2; }
			if(x === undefined) { x = 3; }
			if(fill === undefined) { fill = '.'; }
			return this.toFixed(Math.max(0, Math.floor(n))).replace(new RegExp('\\d(?=(\\d{'+x+'})+' + (n > 0 ? '\\.' : '$') + ')', 'g'), '$&'+fill);
		}
	});
}

if(!Number.prototype.zero) {
  Object.defineProperty(Number.prototype, 'zero', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function zero() {
		return (this>=10) ? ''+this : '0'+this;
    }
  });
}