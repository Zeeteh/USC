var Colors = {
	
	CHANNEL_RED:	new ColorInstance('RR', [-255, 0, 0]),
	
	CHANNEL_BLUE:	new ColorInstance('BB', [0, 0, -255]),
	
	WHITE:			new ColorInstance('W', [255, 255, 255]),
	
	BLACK:			new ColorInstance('K', [0, 0, 0]),
	
	GRAY:			new ColorInstance('A', [128, 128, 128]),
	
	LIGHT_GREY:		new ColorInstance('L', [192, 192, 192]),
	
	DARK_GREY:		new ColorInstance('D', [64, 64, 64]),
	
	RED:			new ColorInstance('R', [255, 0, 0]),
	
	BLUE:			new ColorInstance('B', [0, 0, 255]),
	
	GREEN:			new ColorInstance('G', [0, 255, 0]),
	
	DARK_GREEN:		new ColorInstance('E', [0, 172, 0]),
	
	YELLOW:			new ColorInstance('Y', [255, 255, 0]),
	
	CYAN:			new ColorInstance('C', [0, 255, 255]),
	
	MAGENTA:		new ColorInstance('M', [255, 0, 255]),
	
	PINK:			new ColorInstance('P', [255, 175, 175]),
	
	ORANGE:			new ColorInstance('O', [255, 200, 0]),
	
	BROWN:			new ColorInstance('N', [150, 74, 0]),
	
	decode:			function(hex) {
		var color = new KColor();
		color.decode(hex);
		return color;
	}
};


function KColor(red, green, blue) {
	this.javaClassName = 'KColor';	
	var _red	= -1;
	var _green	= -1;
	var _blue	= -1;
	
	function KColor(instance, red, green, blue) {
		// If only the first argument is set
		if(red != undefined && green == undefined && blue == undefined) {
			
			// First argument is HEX
			if(isHex(red)) {
				instance.decode(red);
				return;
				
			// First argument is RGB
			} else if(isRGB(red)) {
				var split	= red.split(',');
				_red		= parseInt(split[0], 10);
				_green		= parseInt(split[1], 10);
				_blue		= parseInt(split[2], 10);
				return;
			}
		}
		
		_red	= red;
		_green	= green;
		_blue	= blue;
	};
	
	function isHex(input) {
		return (input.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i));
	};
	
	function isRGB(input) {
		return (input.match(/^([\d]{1,3}),([\d]{1,3}),([\d]{1,3})$/i));
	};
	
	function isConstant() {
		for(var name in Colors) {
			if(name == 'decode') {
				continue;
			}
			
			var _color_instance = Colors[name];
			
			if(_color_instance != undefined) {
				if(_color_instance.getRed() == _red && _color_instance.getGreen() == _green && _color_instance.getBlue() == _blue) {
					return true;
				}
			}
		}
		
		return false;
	};
	
	function getConstant() {
		for(var name in Colors) {
			if(name == 'decode') {
				continue;
			}
			
			var _color_instance = Colors[name];
			
			if(_color_instance.getRed() == _red && _color_instance.getGreen() == _green && _color_instance.getBlue() == _blue) {
				return _color_instance;
			}
		}
		
		return '';
	};
	
	this.getRGB = function getRGB() {
		var buffer = new StringBuffer();
		
		buffer.append(_red).append(',').append(_green).append(',').append(_blue);
		
		return buffer.toString();
	};
	
	this.decode = function decode(hex) {
		var result	= /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		_red		= parseInt(result[1], 16);
		_green		= parseInt(result[2], 16);
		_blue		= parseInt(result[3], 16);
	};
	
	this.toString = function toString() {
		var output = new KCode();
		
		// If RGB sounds like Color-Constants (°R°, °B°,..)
		if(isConstant()) {
			output.append(getConstant());
		} else {
			output.append('°[').append(_red).append(',').append(_green).append(',').append(_blue).append(']°');
		}
		
		return output;
	};
	
	KColor(this, red, green, blue);
};

function ColorInstance(key, rgb) {
	this.javaClassName = 'ColorInstance';	
	
	this.getColorKey = function getColorKey() {
		return key;
	};
	
	this.getRGB = function getRGB() {
		return rgb;
	};
	
	this.getRed = function getRed() {
		return rgb[0];
	};
	
	this.getGreen = function getGreen() {
		return rgb[1];
	};
	
	this.getBlue = function getBlue() {
		return rgb[2];
	};
	
	this.toString = function toString() {
		var output = new KCode();
		
		output.append('°').append(key).append('°');
		
		return output;
	};
}