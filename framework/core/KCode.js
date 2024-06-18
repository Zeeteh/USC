var load = [
	'KButton',
	'KTooltip',
	'KLink',
	'KCountdown',
	'KFont',
	'KImage',
	'KColor',
	'KTable',
	'KGroup'
];

load.each(function LoadEach(name) {
	require('framework/ui/' + name + '.js');
});

var Alignment = {
	
	LEFT:		'°>LEFT<°',
	
	
	MIDDLE:		'°>CENTER<°',
	
	CENTER:		'°>CENTER<°',
	
	RIGHT:		'°>RIGHT<°',
	
	JUSTIFY:	'°>JUSTIFY<°'
};

function KCode() {
	this.javaClassName = 'KCode';
	var _buffer 	= [];
	var _debug		= false;
	var _minify		= true;
	var _mobilefix	= false;
	
	this.append = function append(component) {
		_buffer.push(component);
		return this;
	};
	
	this.newLine = function newLine(dotted) {
		_buffer.push('°#');
		
		if(dotted == undefined ? false : dotted) {
			if(!_mobilefix) {
				_buffer.push('!');
			}
		}
		
		if(_mobilefix) {
			//_buffer.push('r');
		}
		
		_buffer.push('°');
		
		// DEPRECATED!
		if(!_mobilefix) {
			//_buffer.push('#');
		}
		
		return this;		
	};
	
	this.fixMobile = function fixMobile(state) {
		_mobilefix = state;
	};
	
	this.newHr = function newHr() {
		_buffer.push('°-°');
		return this;		
	};
	
	this.addDots = function addDots() {
		_buffer.push('.........');
		return this;		
	};
	
	this.setAlignment = function setAlignment(alignment) {
		_buffer.push(alignment);
		return this;		
	};	
	
	this.addImage = function addImage(file) {
		Logger.info('KCode.addImage(file) is DEPRECATED');
		
		_buffer.push('°>' + KnuddelsServer.getFullImagePath(file) + '<°');
		return this;		
	};
	
	this.disableOptimization = function disableOptimization(state) {
		_minify = state;
		return this;		
	};
	
	this.toString = function toString() {
		var string = '';
		
		_buffer.each(function BufferEach(component) {
			if(typeof(component) == 'string' || typeof(component) == 'number') {
				string		+= component;
			} else if(component != undefined && component != null) {
				string		+= component.toString();
			}
		});
		
		if(_debug) {
			string = string.replace(/°/g, '\\°');
		}
		
		if(_minify) {
			string = string.replace(/°°/g, '');
		}
		
		return string;
	};
};