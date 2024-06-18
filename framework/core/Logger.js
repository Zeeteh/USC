var Logger = (new function Logger() {
	this.javaClassName = 'Logger';
	var _logger;
	var _watcher;
	
	function Logger() {
		_logger		= KnuddelsServer.getDefaultLogger();
		_watcher	= {};
	};
	
	this.addLogUser = function addLogUser(uid, types) {
		Logger.info('Logger.addLogUser(uid, types) is DEPRECATED');
		
		_watcher[uid] = types || 'E_ALL';
	};

	this.delLogUser = function delLogUser(uid) {
		Logger.info('Logger.delLogUser(uid) is DEPRECATED');
		if(_watcher[uid] != undefined) {
			
			delete _watcher[uid];
		}
	};
	
	function getStrackTrace() {
		try {
			null.toString();
		} catch(e) {
			return prettyStackTrace(e.stack);
		}
		
		return '';
	};
	
	function prettyStackTrace(stack) {
		var lines	= stack.replace(/\t/g, '     ').replace(/\(anonymous\)/g, '').replace(/at (.*)@(.*): /g, 'at ').split('\n');
		var output	= '';
		
		if(!Object.prototype.each) {
			for(var index in lines) {
				if(index <= 1) {
					return;
				}
				
				output += '\n' + lines[index];
			}
		} else {
			lines.each(function LinesEach(line, index) {
				if(index <= 1) {
					return;
				}
				
				output += '\n' + line;
			});
		}
		
		return output;
	};
	
	function sendLog(prefix, message) {
		if(_watcher.size() > 0) {
			Logger.info('Logger.sendLog(prefix, message) is DEPRECATED - Don\'t use Logger.addLogUser(uid, types) or Logger.delLogUser(uid)!');
		}
		
		_watcher.each(function WatcherEach(value, uid) {
			if(value.contains(prefix) || value == 'E_ALL') {
				Users.get(uid).sendPrivateMessage(prefix + ': ' + message);
			}
		});
	};

	this.debug = function debug(message) {
		_logger.debug(message + getStrackTrace());
		sendLog('DEBUG', message);
	};
	
	this.info = function info(message) {
		_logger.info(message + getStrackTrace());
		sendLog('INFO', message);
	};
	
	this.error = function error(message) {
		_logger.error(message + getStrackTrace());
		sendLog('ERROR', message);
	};
	
	this.fatal = function fatal(message) {
		_logger.fatal(message + getStrackTrace());
		sendLog('FATAL', message);
	};
	
	this.warn = function warn(message) {
		_logger.warn(message + getStrackTrace());
		sendLog('WARN', message);
	};
	
	this.toString = function toString() {
		return '[KFramework Logger]';
	};
	
	Logger();
}());