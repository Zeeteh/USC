var KConfig = (new function KConfig() {
	this.javaClassName = 'KConfig';
	var _data = DB.load('_config', {});
	var _defaults = {};
	var _puffer = {};
	var _useChangesPuffer = false;
	
	this.setDefaults = function setDefaults(defaults) {
		_defaults = defaults;
		_data.compare(_defaults);
	};
	
	this.saveData = function saveData() {
		//this.cleanData();
		DB.save('_config', _data);
	};
	
	this.resetData = function resetData() {
		DB.save('_config', {});
		_data = {};
	};
	
	this.applyChanges = function applyChanges() {
		_useChangesPuffer = true;
		
		_puffer.each(function PufferEach(newvalue, key) {
			_data[key] = newvalue;
		});
		_puffer = {};
	};
	
	this.get = function get(key) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return undefined;
		}
		
		if(_data[key] === undefined) {
			Logger.error('Key "'+key+'" not exists');			
			return undefined;
		}
		
		return _data[key];
	};

	this.set = function set(key, value) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		if(_data[key] === undefined) {
			Logger.error('Key "'+key+'" not exists');
			return false;
		}
		
		if(value === undefined) {
			value = _defaults[key];
		}
		
		var error;
		if(!(error = this.check(key, value))) {
			return error;
		}
		
		if(_useChangesPuffer) {
			_puffer[key] = value;
		} else {
			_data[key] = value;
		}
	};
	
	this.check = function check() {
		return true;
	};
	
	this.toString = function toString() {
		return '[KFramework KConfig]';
	};
}());