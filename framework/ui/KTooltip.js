var KCODE_TOOLTIPS_INSTANCES = 0;

function KTooltip(content) 	{
	this.javaClassName = 'KTooltip';	
	var _content		= new KCode();
	var _instance		= 0;
	var _hover_disabled	= false;
	var _width			= 100;
	var _height			= 100;
	
	function KTooltip(content) {
		if(content != undefined) {
			_content.append(content);
		}
		
		_instance	= KCODE_TOOLTIPS_INSTANCES++;
	};
	
	this.setSize = function setSize(width, height) {
		_width	= width;
		_height	= height;
		return this;
	};
	
	this.setWidth = function setWidth(width) {
		_width	= width;
		return this;
	};
	
	this.setHeight = function setHeight(height) {
		_height	= height;
		return this;
	};
	
	this.append = function append(content) {
		_content.append(content);
		return this;
	};
	
	this.newLine = function newLine() {
		_content.newLine();
		return this;
	};
	
	this.disableHover = function disableHover(state) {
		_hover_disabled = state;
	};
	
	this.getCommand = function getCommand(text, command) {
		if(!(text instanceof KLink)) {
			text = new KLink(text);
			
			if(_hover_disabled) {
				text.setCommand((command == undefined ? '' : '/doubleaction ' + command + '|') + '/openpulldown id_' + _instance + '.w_' + _width + '.h_' + _height);
			} else {
				text.setCommand((command == undefined ? '/void' : command) + '{{onEnter=/openpulldown id_' + _instance + '.w_' + _width + '.h_' + _height + '}}{{onExit=/closepulldown id_' + _instance + '}}');
			}
		}
		
		return text;
	};
	
	this.toString = function toString() {
		var output = new KCode();
		
		output.append('°>{definetext|').append(_instance).append('}<°').append(_content).append('°>{definetext|').append(_instance).append('}<°');

		return output;
	};
	
	KTooltip(content);
};