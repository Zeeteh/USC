function KLink(text, command_left, command_right) {
	this.javaClassName = 'KLink';	
	var _text			= '';
	var _command_left	= undefined;
	var _command_right	= undefined;
	var _hover			= true;
	var _hover_image	= undefined;
	var _connected_icon	= undefined;
	
	function KLink(text, command_left, command_right) {
		_text			= text || '';
		_command_left	= command_left;
		_command_right	= command_right;
	}
	
	function prepareLink(string) {
		return string.toString().replace(/(<|>|\||°)/g, '\\$1');
	}
	
	this.connectAsIcon = function connectAsIcon(image) {
		_connected_icon = image;
	};

	this.getText = function getText() {
		return _text;
	};
	
	this.setCommand = function setCommand(command_left, command_right) {
		_command_left	= command_left;
		_command_right	= command_right;
		return this;
	};
	
	this.enableHover = function enableHover(state) {
		_hover = state;
		return this;
	};
	
	this.setHoverImage = function setHoverImage(image) {
		if(_text instanceof KImage) {
			_hover_image = image;
		} else {
			Logger.warn('You can only use KImage.setHoverImage(image) when you bind a KImage!');
		}
		
		return this;
	};
	
	this.toString = function toString() {
		var buffer = new StringBuffer('°>');
		
		if(_text instanceof KImage) {
			if(_hover == false) {
				_text.noPush(true);
				_hover_image.noPush(true);
			}
			
			buffer.append(_text.toString(true));
			
			if(_hover_image != undefined) {
				buffer.append('|' + _hover_image.toString(true));
			}
			
			buffer.append('<>--<>');
		} else {
			if(_connected_icon != undefined && _connected_icon instanceof KImage) {
				buffer.append(_connected_icon.toString(true));
				buffer.append('<>--<>');
			}
			
			if(_hover == false) {
				buffer.append('_h');
			}
			
			buffer.append(prepareLink(_text));
		}
		
		if(_command_left != undefined) {
			buffer.append('|' + _command_left.replace(/\|/g, '\\\\\\\\\\|'));
		}
		
		if(_command_right != undefined) {
			buffer.append('|' + _command_right.replace(/\|/g, '\\\\\\\\\\|'));
		}
		
		buffer.append('<°');
		return buffer.toString();
	};
	
	KLink(text, command_left, command_right);
};