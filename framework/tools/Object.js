if(!Object.prototype.each) {
	Object.defineProperty(Object.prototype, 'each', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function each(callback, reverse) {
			if(reverse == undefined) {
				reverse = false;
			}
			
			var result = true;
			
			if(reverse) {
				var keys = [];
				for(var index in this) {
					keys.push(index);
				}
				
				for(var key_index = keys.length - 1; key_index >= 0; key_index--) {
					var index = keys[key_index];
					
					if(!this.hasOwnProperty(index)) {
						continue;
					}
					
					if(typeof(this[index]) == 'object') {
						if(callback.call(this, this[index], index) === false) {
							result = false;
							break;
						}
					} else if(callback.apply(this, [this[index], index]) === false) {
						result = false;
						break;
					}
				}
			} else {
				for(var index in this) {
					if(!this.hasOwnProperty(index)) {
						continue;
					}
					
					if(typeof(this[index]) == 'object') {
						if(callback.call(this, this[index], index) === false) {
							result = false;
							break;
						}
					} else if(callback.apply(this, [this[index], index]) === false) {
						result = false;
						break;
					}
				}
			}
			return result;
		}
	});
}

if(!Object.prototype.sort) {
	Object.defineProperty(Object.prototype, 'sort', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function sort(byKey, order) {
			Logger.info('Object.sort(byKey, order) is DEPRECATED');
			
			if(byKey === undefined) {
				byKey == 'index';
			}
	
			if(order === undefined) {
				order == 'ASC'; // Highest value
			}
	
			var keys = [];
			for(var index in this) {
				var sortby = 0;
				
				if(byKey == 'index') {		
					sortby = index;
				} else if(byKey == 'value') {		
					sortby = this[index];
				} else if(this[index].hasOwnProperty(byKey)) {
					sortby = this[index][byKey];
				}
			
				keys.push({
					index:	index,
					value:	this[index],
					sortby:	sortby
				});
			}
	
			if(order == 'ASC') {
				keys.sort(function(a, b) {
					if(a.sortby < b.sortby) return -1;
					if(a.sortby > b.sortby) return 1;
					return 0;
				});
			} else {
				keys.sort(function(b, a) {
					if(a.sortby < b.sortby) return -1;
					if(a.sortby > b.sortby) return 1;
					return 0;
				});
			}
	
	
			var newObj = {};
			for(var k in keys) {
				if(keys[k] != undefined) {
					newObj[keys[k].index] = this[keys[k].index];
				}
				
				delete this[keys[k].index];
			}
	
			for(var key in newObj) {
				this[key] = newObj[key];
			}
			
			return newObj;
		}
	});
}

if(!Object.prototype.toSortedArray) {
	Object.defineProperty(Object.prototype, 'toSortedArray', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function toSortedArray(byKey, order) {
			if(byKey === undefined) {
				byKey = 'index';
			}
	
			if(order === undefined) {
				order = 'ASC'; // Highest value
			}
	
			var keys = [];
			for(var index in this) {
				var sortby = 0;
				
				if(byKey == 'index') {		
					sortby = index;
				} else if(byKey === 'value') {		
					sortby = this[index];
				} else if(this[index].hasOwnProperty(byKey)) {
					sortby = this[index][byKey];
				}
			
				keys.push({
					key:	index,
					value:	this[index],
					sortby:	sortby
				});
			}
	
			if(order == 'ASC') {
				keys.sort(function(a, b) {
					if(a.sortby < b.sortby) return -1;
					if(a.sortby > b.sortby) return 1;
					return 0;
				});
			} else {
				keys.sort(function(b, a) {
					if(a.sortby < b.sortby) return -1;
					if(a.sortby > b.sortby) return 1;
					return 0;
				});
			}
			
			return keys;
		}
	});
}

if(!Object.prototype.exists) {
	Object.defineProperty(Object.prototype, 'exists', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function exists(value) {
			return (this[value] != undefined);
		}
	});
}

if(!Object.prototype.compare) {
	Object.defineProperty(Object.prototype, 'compare', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function compare(defaultObj) {
			for(var property in defaultObj) {
				if(this[property] && (typeof(this[property]) == 'object') && (this[property].toString() == '[object Object]') && defaultObj[property]) {
					this[property].compare(defaultObj[property]);
				} else if(typeof this[property] == 'undefined') {
					this[property] = defaultObj[property];
				}
			}
			return this;
		}
	});
}

if(!Object.prototype.size) {
	Object.defineProperty(Object.prototype, 'size', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function size() {
			return Object.keys(this).length;
		}
	});
}

if(!Object.prototype.random) {
	Object.defineProperty(Object.prototype, 'random', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function random() {
			var keys	= Object.keys(this);
			
			if(keys.length <= 0) {
				return undefined;
			}
			
			var random	= RandomOperations.nextInt(keys.length);
			
			if(keys.length <= 0 || random >= keys.length) {
				return undefined;
			}
			
			return this[keys[random]];
		}
	});
}

/**
	++++ Sample ++++
	
	var img		= 'http://chat.knuddels.de/pics/features/mosquito/mosquito_small.gif';
	var shadow	= 'http://chat.knuddels.de/pics/features/mosquito/mosquito_shadow.png';
	var props	= {
		type:		0,
		maxspeed:	100,
		startpause:	500,
		flytime:	10000,
		imgfly:		img,
		imgrest:	img,
		imgshadow:	shadow,
		w:			15,
		h:			16,
		click:		'/kiss James',
		call:		'/kiss James'
	};
	
	user.private('°>{sprite}' + props.join(':', '|') + '<°');
*/
if(!Object.prototype.join) {
	Object.defineProperty(Object.prototype, 'join', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function join(a, b) {
			var string	= '';
			var length	= Object.keys(this).length;
			var counter	= 0;
			
			for(var index in this) {
				string += index + a + this[index];
				
				if(counter + 1 < length) {
					string += b;
				}
				
				++counter;
			}
			
			return string;
		}
	});
}