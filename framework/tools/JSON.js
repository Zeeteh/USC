if(!JSON.format) {
	Object.defineProperty(JSON, 'format', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function format(object) {
			return JSON.stringify(object, 1, 4).escapeKCode().replace(/\n/g, '°#°');
		}
	});
}
