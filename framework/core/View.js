function View(name) {
	this.javaClassName = 'View';	
	var _name			= name;
	var _width			= 100;
	var _height			= 100;
	var _mode			= AppViewMode.Overlay;
	var _data			= {};
	var _loading		= {
		enabled:	true,
		text:		'Bitte warten...',
		image:		'',
		foreground:	Color.fromRGB(255, 255, 255),
		background:	Color.fromRGB(80, 0, 0)
	};
	var _document		= '';
	var _send_callback	= undefined;
	var _view;
	var _file;
	
	this.setSize = function setSize(width, height) {
		_width	= width;
		_height	= height;
	};
	
	this.getMode = function getMode() {
		return _mode;
	};
	
	this.setMode = function setMode(mode) {
		_mode = mode;
	};
	
	this.setLoading = function setLoading(state) {
		this.setLoadingData('enabled', state);
	};
	
	this.setLoadingData = function setLoadingData(name, value) {
		if(typeof(_loading[name]) == 'undefined') {
			Logger.warn('Configuration "' + name + '" not exists.');
		}
		
		if(value instanceof KImage) {
			value = value.toString(true);
		}
		
		_loading[name] = value;
	};
	
	this.close = function close(user) {
		user.sendEvent('close', true);
	};
	
	this.setCallback = function setCallback(callback) {
		_send_callback = callback;
	};
	
	this.send = function send(user) {
		if(AppContent.popupContent == undefined) {
			_mode	= AppViewMode.Overlay;
		}
		
		switch(_mode) {
			case AppViewMode.Overlay:
				this.addString('_view_mode', 'overlay');
				_document	= _name + '.html';
				_file		= new HTMLFile(_document, _data);
				_view		= AppContent.overlayContent(_file, _width, _height);
			break;
			case AppViewMode.Popup:
				this.addString('_view_mode', 'popup');
				_document	= _name + '.html';
				_file		= new HTMLFile(_document, _data);
				_view		= AppContent.popupContent(_file, _width, _height);
			break;
			default:
				Logger.info('Bad AppContent Mode!');
				return false;
			break;
		}

		// JavaVersion 7 in Nutzung
		if(user.getClientType() == ClientType.Applet && !user.canSendAppContent(_view)) {
			var text = new KCode();
			text.newLine();
			text.append('°RR°_ACHTUNG:_°r° Du benötigst mindestens _Java 8_ um _' + KnuddelsServer.getAppInfo().getAppName() + '_ zu spielen.');
			text.newLine();
			text.append('Um dieses Problem zu beheben bestehen 2 Möglichkeiten:');
			text.newLine();
			text.append('_1._ Java auf eine aktuelle Version updaten: _°BB>Java updaten|https://www.java.com/de/download/<°_°r° (empfohlen)');
			text.newLine();
			text.append('_2._ Den Mini-Chat nutzen: _°BB>Zum Mini-Chat|http://www.knuddels.de/htmlchat<°_°r°');
			user.sendPrivateMessage(text);
			return false;
		}
		
		this.setLoadingView();
		
		if(!user.isOnlineInChannel() || !user.canSendAppContent(_view) || !user.canShowAppViewMode(_mode)) {
			return false;
		}
		
		user.sendAppContent(_view);
		
		if(typeof(_send_callback) != 'undefined') {
			_send_callback(this, user);
		}
		
		return true;
	};
	
	this.setLoadingView = function setLoadingView() {
		var config = _view.getLoadConfiguration();
		config.setEnabled(_loading.enabled);
		
		if(_loading.enabled) {
			config.setText(_loading.text);
			config.setBackgroundColor(_loading.background);
			config.setForegroundColor(_loading.foreground);
			config.setLoadingIndicatorImage(_loading.image);
		}
	};
	
	this.clearData = function clearData() {
		_data = {};
	};
	
	/*
		Strings
	*/
	this.getString = function getString(key, defaultValue) {
		return this.getObject(key, defaultValue);
	};
	
	this.addString = function addString(key, value) {
		this.addObject(key, value);
	};
	
	this.removeString = function removeString(key) {
		this.removeObject(key);
	};
	
	this.hasString = function hasString(key) {
		return this.hasObject(key);
	};
	
	/*
		Number
	*/
	this.getNumber = function getNumber(key, defaultValue) {
		return this.getObject(key, defaultValue);
	};
	
	this.addNumber = function addNumber(key, value) {
		this.addObject(key, value);
	};
	
	this.removeNumber = function removeNumber(key) {
		this.removeObject(key);
	};
	
	this.hasNumber = function hasNumber(key) {
		return this.hasObject(key);
	};
	
	/*
		Object
	*/
	this.getObject = function getObject(key, defaultValue) {
		if(this.hasObject(key)) {
			return _data[key];
		}
		
		return defaultValue;
	};
	
	this.addObject = function addObject(key, value) {
		_data[key] = value;
	};
	
	this.removeObject = function removeObject(key) {
		delete _data[key];
	};
	
	this.hasObject = function hasObject(key) {
		return (_data[key] != undefined);
	};
	
	this.toJSON = function toJSON() {
		return {
			name:		_name,
			loading:	_loading,
			size:	{
				width:	_width,
				height:	_height
			},
			ui:		{
				mode:		_mode,
				view:		_view,
				file:		_file,
				document:	_document
			},
			data:	_data,
			functions: {
				send_callback:	_send_callback
			}
		};
	};
	
	this.toString = function toString() {
		return 'View';
	};
};