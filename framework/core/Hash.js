var Hash	= (new function Hash() {
	this.javaClassName = 'Hash';
	
	this.decodeForm = function decodeForm(string) {
		var chars	= string.split('');
		var output	= [];
		
		/* #### WARNING: this variables will be updated each client update! #### */
		var a		= 97;
		var b		= 4;
		/* #### WARNING: this variables will be updated each client update! #### */
		
		for(var index = 0, char_index = 0; index < chars.length / 2; index++, char_index += 2) {
			output.push((chars[char_index].charCodeAt(0) - a << b | chars[char_index + 1].charCodeAt(0) - a) ^ index & 255);
		}
		
		for(var index = 0; index < output.length; index++) {
			output[index] = output.fromCharCode(output[index]);
		}
		
		return output.join('');
	};
	this.toString = function toString() {
		return '[KFramework Hash]';
	};
});