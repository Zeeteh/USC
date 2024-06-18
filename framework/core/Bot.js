var Bot = (new function Bot() {
	this.javaClassName = 'Bot';
	var _user = KnuddelsServer.getDefaultBotUser();
	var textFilter = '';
	
	if(typeof(KnuddelTransferDisplayType) === 'undefined') {
		KnuddelTransferDisplayType = {Public:'Public', Post:'Post', Private:'Private'};
	}
	
	/*
		@docs	TODO
	*/
	this.setTextFilter = function setTextFilter(text) { 
		var countBOLD = text.split("_").length-1;
		
		if(countBOLD % 2 !== 0){	
			text = text.replace(/_/g, '');
		}

		var countKUGEL = text.split("°").length-1;
		
		if(countKUGEL % 2 !== 0){	
			text = text.replace(/°/g, '');
		}		
		textFilter = text;
		return text;
	};
	
	this.clearTextFilter = function clearTextFilter() { 
		textFilter = '';
	};	

	this.getAge = function getAge() { 
		return _user.getAge();
	};
	
	this.getGender = function getGender() { 
		return _user.getGender();
	};
	
	this.getKnuddelAmount = function getKnuddelAmount() {
		return _user.getKnuddelAmount();
	};
	
	this.getNick = function getNick() {
		return _user.getNick();
	};
	
	this.getUser = function getUser() {
		return _user;
	};
	
	this.getOnlineMinutes = function getOnlineMinutes() {
		return _user.getOnlineMinutes();
	};
	
	this.getProfileLink	= function getProfileLink(displayText) {
		return _user.getProfileLink(displayText == undefined ? this.getNick() : displayText);
	};
	
	this.getProfilePicture	= function getProfilePicture() {
		return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + _user.getNick().urlencode();
	};
	
	this.getReadme = function getReadme() {
		return _user.getReadme();
	};
	
	this.getRegDate = function getRegDate() {
		return _user.getRegDate();
	};
	
	this.getUserId = function getUserId() {
		return _user.getUserId();
	};
	
	this.getUserStatus = function getUserStatus() {
		return _user.getUserStatus();
	};
	
	this.getUserType = function getUserType() {
		return _user.getUserType();
	};
	
	this.isAppDeveloper = function isAppDeveloper() {
		return _user.isAppDeveloper();
	};
	
	this.isAppManager = function isAppManager() {
		return _user.isAppManager();
	};

	this.isAway = function isAway() {
		return _user.isAway();
	};

	this.isChannelModerator = function isChannelModerator() {
		return _user.isChannelModerator();
	};

	this.isChannelOwner = function isChannelOwner() {
		return _user.isChannelOwner();
	};
	
	this.isColorMuted = function isColorMuted() {
		return _user.isColorMuted();
	};

	this.isEventModerator = function isEventModerator() {
		return _user.isEventModerator();
	};
	
	this.isLocked = function isLocked() {
		return _user.isLocked();
	};
	
	this.isMuted = function isMuted() {
		return _user.isMuted();
	};	

	this.isOnline = function isOnline() {
		return _user.isOnline();
	};
	
	this.isOnlineInChannel = function isOnlineInChannel() {
		return _user.isOnlineInChannel();
	};
	
	this.join = function join() {
		_user.joinChannel();
	};
	
	this.leave = function leave() {
		_user.leaveChannel();
	};
	
	this.knuddel = function knuddel(user, amount, arg1, arg2) {
		if(!isTypeOf(amount, 'KnuddelAmount')) {
			amount = new KnuddelAmount(amount);
		}
		
		var params = {};
		
		if(typeof(arg1) != 'undefined') {
			if(isTypeOf(arg1, 'string')) {
				params['displayReasonText'] = arg1;
			}
			
			if(isTypeOf(arg1, 'boolean')) {
				if(isTypeOf(KnuddelTransferDisplayType, 'KnuddelTransferDisplayType')) {
					params['transferDisplayType'] = (arg1) ? KnuddelTransferDisplayType.Public : KnuddelTransferDisplayType.Post;
				} else {
					params['hidePublicMessage'] = !(arg1);
				}
			}

			if(isTypeOf(arg1, 'KnuddelTransferDisplayType')) {
				params['transferDisplayType'] = arg1;
			}
		}

		if(typeof(arg2) != 'undefined') {
			if(isTypeOf(arg2, 'string')) {
				params['displayReasonText'] = arg2;
			}
			
			if(isTypeOf(arg2, 'boolean')) {
				if(isTypeOf(KnuddelTransferDisplayType, 'KnuddelTransferDisplayType')) {
					params['transferDisplayType'] = (arg2) ? KnuddelTransferDisplayType.Public : KnuddelTransferDisplayType.Post;
				} else {
					params['hidePublicMessage'] = !(arg2);
				}
			}
			
			if(isTypeOf(arg2, 'KnuddelTransferDisplayType')) {
				params['transferDisplayType'] = arg2;
			}
		}		
		
		if(params.size()) {
			_user.transferKnuddel(user, amount, params);
		} else {
			_user.transferKnuddel(user, amount);
		}
	};
	
	this.getKnuddels = function getKnuddels() {
		return _user.getKnuddelAmount().asNumber();
	};
	
	this.exception = function exception(exception) {
		_user.sendPublicMessage(textFilter+'°RR°_Exception:_°r°#' + (exception.message == undefined ? exception : exception.message));
	};
	
	this.publicMessage = function publicMessage(message) {
		Logger.info('Bot.publicMessage(message) is DEPRECATED');
		
		this.public(message);
	}
	
	this.postMessage = function postMessage(user, message, topic) {
		Logger.info('Bot.postMessage(user, message, topic) is DEPRECATED');
		
		this.post(user, message, topic);
	}
	
	this.privateMessage = function privateMessage(user, message) {
		Logger.info('Bot.privateMessage(user, message) is DEPRECATED');
		
		this.private(user, message);
	}
	
	this.action = function action(message, delay) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		/*if(isTypeOf(message, 'object')) {
			message = JSON.format(message);
		}*/
		
		if (delay) {
            return setTimeout(function actionDelay() {
                _user.sendPublicActionMessage(textFilter+message);
            }, delay);
        } else {
            _user.sendPublicActionMessage(textFilter+message);
        }
	};
	
	this.public = function public(message, delay) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		/*if(isTypeOf(message, 'object')) {
			message = JSON.format(message);
		}*/
		
		if (delay) {
            return setTimeout(function publicDelay() {
                _user.sendPublicMessage(textFilter+message);
            }, delay);
        } else {
            _user.sendPublicMessage(textFilter+message);
        }
	};
	
	this.post = function post(nick, message, topic) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		if(topic == undefined) {
			topic = '';
		}
		
		// send to online users
		if(nick == undefined) {
			Channel.getUsers().each(function(user) {
				user.sendPostMessage(topic, textFilter+message);
			});
		} else {
			if(isTypeOf(nick, 'User')) {
				nick.sendPostMessage(topic, message);
			} else if(isTypeOf(nick, 'object') || isTypeOf(nick, 'array')) {
				nick.each(function(n) {
					Bot.post(n, textFilter+message, topic);
				});
			} else {
				Users.get(nick).sendPostMessage(topic, textFilter+message);
			}
		}
	};
	
	this.private = function private(nick, message, delay) {
		if(message instanceof KCode) {
			message = message.toString();
		}
		
		/*if(isTypeOf(message, 'object')) {
			message = JSON.format(message);
		}*/
		
		if (delay) {
            return setTimeout(function privateDelay() {
				// send to online users
				if(nick == undefined) {
					Channel.getUsers().each(function(user) {
						user.sendPrivateMessage(textFilter+message);
					});
				} else {
					if(isTypeOf(nick, 'User')) {
						nick.sendPrivateMessage(textFilter+message);
					} else if(isTypeOf(nick, 'object') || isTypeOf(nick, 'array')) {
						_user.sendPrivateMessage(textFilter+message, nick);
					} else {
						nick = Users.get(nick);
						if(nick != undefined) {
							nick.sendPrivateMessage(textFilter+message);
						}
					}
				}
            }, delay);
        } else {
			// send to online users
			if(nick == undefined) {
				Channel.getUsers().each(function(user) {
					user.sendPrivateMessage(textFilter+message);
				});
			} else {
				if(isTypeOf(nick, 'User')) {
					nick.sendPrivateMessage(textFilter+message);
				} else if(isTypeOf(nick, 'object') || isTypeOf(nick, 'array')) {
					_user.sendPrivateMessage(textFilter+message, nick);
				} else {
					nick = Users.get(nick);
					if(nick != undefined) {
						nick.sendPrivateMessage(textFilter+message);
					}
				}
			}
        }
	};
	
	this.exec = function exec(command) {
		_user.sendToChannel(command);
	};
	
	this.toString = function toString() {
		return '[KFramework Bot]';
	};
}());