/*
	format=DE
*/
function KCountdown() {
	this.javaClassName = 'KCountdown';	
	var _properties	= {};
	
	var timer = null;
	
	this.setTime = function setTime(time) {
		_properties.time = time;
		return this;		
	};
	
	
	this.setFormat = function setFormat(format) {
		_properties.format = format;
		return this;		
	};
	
	this.setText = function setText(text) {
		_properties.timeUpText = text;
		return this;		
	};
	
	this.setCallback = function setCallback(callback) {
		_properties.callback = callback;
		return this;		
	};
	
	this.toString = function toString() {
		var buffer = new StringBuffer('°>{countdown}');
		var index	= 0;
		var length	= _properties.size();
		
		_properties.each(function(value, name) {
			buffer.append(name + '=' + value);
			
			if(index + 1 < length) {
				buffer.append('|');
			}
			
			index++;
		});
		
		buffer.append('<°');
		
		if(isTypeOf(_properties.callback, 'function') && timer === null) {
			timer = setTimeout(_properties.callback, _properties.time);
		}
	
		return buffer.toString();
	};
}