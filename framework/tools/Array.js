if(!Array.prototype.each) {
	Object.defineProperty(Array.prototype, 'each', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function each(callback, reverse) {
			if(reverse == undefined) {
				reverse = false;
			}
			
			var result = true;
			
			if(reverse) {
				for(var index = this.length - 1; index >= 0; index--) {
					if(isTypeOf(this[index], 'object')) {
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
				for(var index = 0; index < this.length; index++) {
					if(isTypeOf(this[index], 'object')) {
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

if(!Array.prototype.random) {
	Object.defineProperty(Array.prototype, 'random', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function random() {
			var random = RandomOperations.nextInt(this.length);
			
			if(this.length <= 0 || random >= this.length) {
				return undefined;
			}
			return this[random];
		}
	});
}

if(!Array.prototype.shuffle) {
	Object.defineProperty(Array.prototype, 'shuffle', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function shuffle() {
			this.sort(function sort(a, b) {
				return (0.5 - Math.random());
			});
		}
	});
}

if(!Array.prototype.exists) {
	Object.defineProperty(Array.prototype, 'exists', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function exists(value) {
			return (this.indexOf(value) > -1);
		}
	});
}

if(!Array.prototype.size) {
	Object.defineProperty(Array.prototype, 'size', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function size() {
			return this.length;
		}
	});
}

if(!Array.prototype.first) {
	Object.defineProperty(Array.prototype, 'first', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function first() {
			return this[0];
		}
	});
}

if(!Array.prototype.last) {
	Object.defineProperty(Array.prototype, 'last', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function last() {
			return this[this.length - 1];
		}
	});
}

if(!Array.prototype.clear) {
	Object.defineProperty(Array.prototype, 'clear', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function clear() {
			this.length = 0;
			return this;
		}
	});
}

if(!Array.prototype.remove) {
	Object.defineProperty(Array.prototype, 'remove', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function remove(removeElement) {
			this.splice(this.indexOf(removeElement), 1);
			return this;
		}
	});
}

if(!Array.prototype.count) {
	Object.defineProperty(Array.prototype, 'count', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function count(countElement) {
			var cnt = 0;
			
			this.each(function countEach(element) {
				if(element.equals && countElement.equals && element.equals(countElement)) {
					++cnt;
				}
				
				if(element === countElement) {
					++cnt;
				}
			});		
			return cnt;
		}
	});
}