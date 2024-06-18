if(!User.prototype.getID) {
	Object.defineProperty(User.prototype, 'getID', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getID() {
			return this.getUserId();
		}
	});
}

if(!User.prototype.private) {
	Object.defineProperty(User.prototype, 'private', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function private(msg, delay) {
			Bot.private(this, msg, delay);
		}
	});
}

if(!User.prototype.post) {
	Object.defineProperty(User.prototype, 'post', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function post(topic, text) {
			this.sendPostMessage(topic, text);
		}
	});
}

if(!User.prototype.getProfilePicture) {
	Object.defineProperty(User.prototype, 'getProfilePicture', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getProfilePicture(width, height) {
			if(width == undefined) {
				width = 200;
			}
			
			if(height == undefined) {
				height = width;
			}
			
			if(this.hasProfilePhoto()) {
				if(this.getProfilePhoto != undefined) {
					return this.getProfilePhoto(width, height);
				}
				
				return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + this.getNick().urlencode();
			}
			
			if(this.getGender() == Gender.Female) {
				return 'nopic_79x79_f.jpg';
			}
			
			return 'nopic_79x79_m.jpg';
		}
	});
}

/*
	@docs
*/
if(!User.prototype.getGenderString) {
	Object.defineProperty(User.prototype, 'getGenderString', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getGenderString() {
			switch(this.getGender()) {
				case Gender.Male:
					return 'male';
				break;
				case Gender.Female:
					return 'female';
				break;
			}
			
			return 'none';
		}
	});
}

if(!User.prototype.getKonto) {
	Object.defineProperty(User.prototype, 'getKonto', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getKonto() {
			return KBank.getKonto(this.getUserId());
		}
	});
}

if(!User.prototype.getKn) {
	Object.defineProperty(User.prototype, 'getKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getKn() {
			return KBank.getKn(this.getUserId());
		}
	});
}

if(!User.prototype.getTotalKn) {
	Object.defineProperty(User.prototype, 'getTotalKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getTotalKn() {
			return KBank.getTotalKn(this.getUserId());
		}
	});
}

if(!User.prototype.addKn) {
	Object.defineProperty(User.prototype, 'addKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function addKn(kn) {
			return KBank.addKn(this.getUserId(), kn);
		}
	});
}

if(!User.prototype.subKn) {
	Object.defineProperty(User.prototype, 'subKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function subKn(kn) {
			return KBank.subKn(this.getUserId(), kn);
		}
	});
}

if(!User.prototype.reqKn) {
	Object.defineProperty(User.prototype, 'reqKn', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function reqKn(kn, onSuccess, onError, reason) {
			return KBank.reqKn(this.getUserId(), kn, onSuccess, onError, reason);
		}
	});
}

if(!User.prototype.knuddel) {
	Object.defineProperty(User.prototype, 'knuddel', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function knuddel(amount, message) {
			if(amount === undefined) {
				return false;
			}
			
			if(message === undefined) {
				Bot.knuddel(this, amount);
			} else {
				Bot.knuddel(this, amount, message);
			}
			return true;
		}
	});
}

if(!User.prototype.getKnuddels) {
	Object.defineProperty(User.prototype, 'getKnuddels', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function getKnuddels() {
			return this.getKnuddelAmount().asNumber();
		}
	});
}

if(!User.prototype.isVirtual) {
	Object.defineProperty(User.prototype, 'isVirtual', {
		enumerable:		false,
		configurable:	false,
		writable:		false,
		value: function isVirtual() {
			return false;
		}
	});
}