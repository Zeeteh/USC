function StringBuffer(startText) {
	this.javaClassName = 'StringBuffer';
	
	var _data = startText || '';
	
	this.append = function append(data) {
		_data += data;
		return this;		
	};
	
	this.toString = function toString() {
		return _data;
	};
};