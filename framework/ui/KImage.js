/*
	Example:
	var image = new KImage('gt.gif').setPosition(100, -50).setLabel('Hallo Welt!');
	
	// with Link
	var link = new KLink(image);
	
	
*/

//fix missing prototype in com.knuddels.apps.tools.KImage
delete KImage;

var KImage			= KImage || (function(image) {
	this.javaClassName = 'KImage';	
	this._path			= '';
	this._name			= '';
	this._extension		= '';
	this._properties	= {};
	
	// HTTP(S) Links
	if(image.substring(0, 7) == 'http://' || image.substring(0, 8) == 'https://') {
		var split	= image.split('/');
		var length	= split.length;
		image		= split[length - 1];
		
		for(var index = 0; index < length - 1; ++index) {
			this._path += split[index];
			this._path += '/';
		}
	}
	
	// Contains properties
	if(image.indexOf('..') > -1) {
		var properties	= image.split('..');
		var instance	= this;
		var split		= image.split('.');
		var length		= split.length;
		image			= properties[0];
		image			+= '.';
		image			+= split[length - 1];
		
		split.each(function(name, index) {
			if(name.length == 0 || index == 0 || index == length - 1) {
				return;
			}
			
			if(name.search(/[^a-zA-Z0-9_]+/gi) != -1) {
				return;
			}
			if(name.indexOf('_') != -1) {
				var split						= name.split('_');
				instance._properties[split[0]]	= split[1];
			} else {
				instance._properties[name]		= null;
			}
		});
	}
	
	var split		= image.split('.');
	
	if(['png', 'jpg', 'jpeg', 'bmp', 'gif'].indexOf(split[1].toLowerCase()) != -1) {
		this._name		= split[0];
		this._extension	= split[1];
	} else {
		this._name		= image;
	}
	
	this._name		= this._name.replace(/&\.(png|jpeg|gif|jpg|bmp)/gi, '');
	var first		= this._name.substring(0, 1);
	
	if(first == '/' || first == '~') {
		this._name	= this._name.substring(1);
		this._path	= KnuddelsServer.getFullImagePath('');
	}
	
	this.toString = function toString(only_path) {
		only_path		= only_path || false;
		var output		= (only_path == true ? '' : '°>') + this._path + this._name;
		var buffer		= new StringBuffer();
		
		if(this._properties.size() > 0) {
			buffer.append('..');
			
			this._properties.each(function(value, name) {
				if(value == undefined) {
					return;
				}
				
				buffer.append('.' + name + (value == null ? '' : '_' + value));
			});
		}
		
		return output + (this._extension.length == 0 ? '&' + buffer.toString() + '.png' : buffer.toString() + '.' + this._extension) + (only_path == true ? '' : '<°');
	};
	
	return this;
});

KImage.prototype	= KImage.prototype || {};

if(!KImage.prototype.addCustom) {
	Object.defineProperty(KImage.prototype, 'addCustom', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function addCustom(name, value) {
			this._properties[name] = value;
			return this;
		}
	});
}

if(!KImage.prototype.alwaysCopy) {
	Object.defineProperty(KImage.prototype, 'alwaysCopy', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function alwaysCopy(state) {
			this.addCustom('alwayscopy', (state ? null : undefined));
			return this;
		}
	});
}

if(!KImage.prototype.noPush) {
	Object.defineProperty(KImage.prototype, 'noPush', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function noPush(state) {
			this.addCustom('nopush', (state ? null : undefined));
			return this;
		}
	});
}

if(!KImage.prototype.setContainerSize) {
	Object.defineProperty(KImage.prototype, 'setContainerSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setContainerSize(width, height) {
			this.addCustom('w', width);
			this.addCustom('h', height);
			return this;
		}
	});
}

if(!KImage.prototype.setSize) {
	Object.defineProperty(KImage.prototype, 'setSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setSize(width, height) {
			this.addCustom('mw', width);
			this.addCustom('mh', height);
			return this;
		}
	});
}

if(!KImage.prototype.setPosition) {
	Object.defineProperty(KImage.prototype, 'setPosition', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setPosition(x, y) {
			this.addCustom('mx', x);
			this.addCustom('my', y);
			return this;
		}
	});
}

if(!KImage.prototype.setX) {
	Object.defineProperty(KImage.prototype, 'setX', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setX(x) {
			this.addCustom('mx', x);
			return this;
		}
	});
}

if(!KImage.prototype.setY) {
	Object.defineProperty(KImage.prototype, 'setY', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setY(y) {
			this.addCustom('my', y);
			return this;
		}
	});
}

if(!KImage.prototype.setLabel) {
	Object.defineProperty(KImage.prototype, 'setLabel', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabel(text) {
			this.addCustom('label', text);
			return this;
		}
	});
}

if(!KImage.prototype.setLabelPosition) {
	Object.defineProperty(KImage.prototype, 'setLabelPosition', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabelPosition(x, y) {
			this.addCustom('lmx', x);
			this.addCustom('lmy', y);
			return this;
		}
	});
}

if(!KImage.prototype.setLabelColor) {
	Object.defineProperty(KImage.prototype, 'setLabelColor', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabelColor(color) {
			this.addCustom('labelcolor', color);
			return this;
		}
	});
}

if(!KImage.prototype.setLabelSize) {
	Object.defineProperty(KImage.prototype, 'setLabelSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setLabelSize(size) {
			this.addCustom('labelfontsize', size);
			return this;
		}
	});
}

if(!KImage.prototype.enableLabelBorder) {
	Object.defineProperty(KImage.prototype, 'enableLabelBorder', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function enableLabelBorder(bool) {
			this.addCustom('labelborder', (bool ? '1' : '0'));
			return this;
		}
	});
}

if(!KImage.prototype.setBorder) {
	Object.defineProperty(KImage.prototype, 'setBorder', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setBorder(size) {
			this.addCustom('border', size);
			return this;
		}
	});
}

if(!KImage.prototype.setQuadcut) {
	Object.defineProperty(KImage.prototype, 'setQuadcut', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setQuadcut(size) {
			this.addCustom('quadcut', size);
			return this;
		}
	});
}

if(!KImage.prototype.setShadow) {
	Object.defineProperty(KImage.prototype, 'setShadow', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setShadow(position) {
			this.addCustom('shadow', position);
			return this;
		}
	});
}

if(!KImage.prototype.setMirror) {
	Object.defineProperty(KImage.prototype, 'setMirror', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setMirror(state) {
			this.addCustom('mirror', (state ? null : undefined));
			return this;
		}
	});
}

if(!KImage.prototype.setGreyscale) {
	Object.defineProperty(KImage.prototype, 'setGreyscale', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setGreyscale(state) {
			this.addCustom('gray', (state ? null : undefined));
			return this;
		}
	});
}

if(!KImage.prototype.setTransparency) {
	Object.defineProperty(KImage.prototype, 'setTransparency', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setTransparency(value) {
			this.addCustom('opacity', value);
			return this;
		}
	});
}

if(!KImage.prototype.setMouseSize) {
	Object.defineProperty(KImage.prototype, 'setMouseSize', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setMouseSize(width, height) {
			this.addCustom('mousew', width);
			this.addCustom('mouseh', height);
			return this;
		}
	});
}

if(!KImage.prototype.setMousePosition) {
	Object.defineProperty(KImage.prototype, 'setMousePosition', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function setMousePosition(x, y) {
			this.addCustom('mousex', x);
			this.addCustom('mousey', y);
			return this;
		}
	});
}