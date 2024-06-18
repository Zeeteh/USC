function KButton(text, command) {
	this.javaClassName = 'KButton';	
	var _text			= '';
	var _id				= -1;
	var _command		= '';
	var _properties		= {};
	var _fix_escaping	= false;
	
	function KButton(text, command) {
		if(text === undefined) {
			return;
		}
		
		_text = text;
		if(command === undefined) {
			return;
		}
		
		_command = command;
		return this;		
	};
	
	this.fixEscaping = function fixEscaping(state) {
		_fix_escaping = state;
	};
	
	this.setID = function setID(id) {
		_id = id;
		return this;
	};
	
	this.getID = function getID() {
		return _id;
	};
	
	/* COMMAND */
	his.getCommand = function getCommand() {
		return _command;
	};
	
	this.setCommand = function setCommand(command) {
		_command = command;
		return this;
	};
	
	/* TEXT */
	
	this.getText = function getText() {
		return _text;
	};
	
	this.setText = function setText(text) {
		_text = text;
		return this;
	};

	/* Properties */
	
	this.getProperties = function getProperties() {
		return _properties;
	};
	
	this.setProperties = function setProperties(properties) {
		_properties = properties;
		return this;
	};
	
	/* ICON */
	
	this.setIcon = function setIcon(icon) {
		if(icon.startsWith('https://') || icon.startsWith('http://')) {
			icon = '../' + icon;
		}
		
		_properties.icon = icon;
		return this;
	};
	
	this.removeIcon = function removeIcon() {
		delete _properties.icon;
		return this;
	};
	
	/* COLOR */

	this.setColor = function setColor(color) {
		// @ToDo can be gradient like "120,230,90~60,170,25~24,96,1"
		_properties.color = color;
		return this;
	};
	
	this.removeColor = function removeColor() {
		delete _properties.color;
		return this;
	};
	
	/* HEIGHT */

	this.getHeight = function getHeight() {
		return _properties.height;
	};
	
	this.setHeight = function setHeight(height) {
		_properties.height = height;
		return this;		
	};
	
	this.removeHeight = function removeHeight() {
		delete _properties.height;
		return this;
	};
	
	/* WIDTH */
	
	this.getWidth = function getWidth() {
		return _properties.width;
	};
	
	this.setWidth = function setWidth(width) {
		_properties.width = width;
		return this;
	};
	
	this.removeWidth = function removeWidth() {
		delete _properties.width;
		return this;
	};
	
	/* SIZE */

	this.setSize = function setSize(width, height) {
		this.setWidth(width);
		this.setHeight(height);
		return this;		
	};
	
	this.removeSize = function removeSize() {
		this.removeWidth();
		this.removeHeight();
		return this;		
	};
	
	/* POSITION */

	this.getX = function getX() {
		return _properties.mx;
	};
	
	this.setX = function setX(x) {
		_properties.mx = x;
		return this;
	};
	
	this.getY = function getY() {
		return _properties.my;
		return this;
	};
	
	this.setY = function setY(y) {
		_properties.my = y;
		return this;
	};
	
	this.setPosition = function setPosition(x, y) {
		this.setX(x);
		this.setY(y);
		return this;
	};
	
	/* TEXTBORDER */

	this.useTextborder = function useTextborder(bool) {
		if(bool) {
			_properties.textborder = '1';
		} else {
			delete _properties.textborder;
		}
		
		return this;
	};
	
	/* DISABLED */

	this.setEnabled = function setEnabled(bool) {
		if(bool == false) {
			_properties.enabled = '0';
		} else {
			delete _properties.enabled;
		}
		return this;		
	};
	
	/* @ToDo TEXTCOLOR */
	
	this.toString = function toString() {
		var buffer = new StringBuffer('°>{button}');
		if(_text.length > 0) {
			buffer.append(_text + '|' + (_id > 0 ? _id : '') + '|');
		}
		
		if(_command.length > 0) {
			if(_fix_escaping) {
				buffer.append('call|' + _command.replace(/\|/g, '\\\\\\|').replace(/°/g,'\\\°'));
			} else {
				buffer.append('call|' + _command.replace(/\|/g, '\\\\\\\\\\|').replace(/°/g,'\\\\\\\°'));
			}
		}
		
		_properties.each(function(value, name) {
			buffer.append('|' + name + '|' + value);
		});
		
		buffer.append('<°');
		
		return buffer.toString();
	};
	
	// Call the Constructor
	KButton(text, command);
}