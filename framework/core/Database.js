var DB	= (new function Database() {
	this.javaClassName = 'Database';
	var _fields_global	= [];
	var _fields_user	= [];
	
	function synchronizeSchema(db, save) {
		var schema = db.getObject('INFORMATION_SCHEMA', {
			user:	_fields_user,
			global:	_fields_global
		});
		
		_fields_user	= schema.user;
		_fields_global	= schema.global;
		
		if(save) {
			db.setObject('INFORMATION_SCHEMA', {
				user: 	_fields_user,
				global: _fields_global
			});
		}
	};
	
	this.getUser = function getUser(user) {
		Logger.info('DB.getUser(user) is DEPRECATED');
		
		return user.getPersistence();
	};
	
	this.getChannel = function getChannel() {
		Logger.info('DB.getChannel() is DEPRECATED');	
		
		return KnuddelsServer.getPersistence();
	};
	
	this.load = function load(key, defaultValue, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		synchronizeSchema(_db, false);
		
		if(user != undefined) {
			_db = user.getPersistence();
			
			if(_fields_user.indexOf(key) == -1) {
				_fields_user.push(key);
			}
		} else {
			if(_fields_global.indexOf(key) == -1) {
				_fields_global.push(key);
			}
		}
		
		switch(typeof defaultValue) {
			case 'string':
				return _db.getString(key, defaultValue);
			break;
			case 'number':
				return _db.getNumber(key, defaultValue);
			break;
			case 'object':
				return _db.getObject(key, defaultValue);
			break;
			case 'undefined':
				return _db.getObject(key, {});
			break;
		}
		
		return false;
	};

	this.save = function save(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}

		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		synchronizeSchema(_db, true);
		
		if(user != undefined) {
			_db = user.getPersistence();
			
			if(_fields_user.indexOf(key) == -1) {
				_fields_user.push(key);
			}
		} else {
			if(_fields_global.indexOf(key) == -1) {
				_fields_global.push(key);
			}
		}
		
		switch(typeof data) {
			case 'string':
				_db.setString(key, data);
			break;
			case 'number':
				_db.setNumber(key, data);
			break;
			case 'object':
				_db.setObject(key, data);
			break;
		}
		return true;
	};
	
	this.check = function check(key, data, user) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		if(data === undefined) {
			Logger.error('No Data submitted');
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		if(user != undefined) {
			_db = user.getPersistence();
		}
		
		switch(typeof data) {
			case 'string':
				return _db.hasString(key);
			break;
			case 'number':
				return _db.hasNumber(key);
			break;
			case 'object':
				return _db.hasObject(key);
			break;
		}
		
		return false;
	};

	this.delete = function Delete(key, user, subdata) {
		subdata = (typeof(subdata) == 'undefined' ? true : subdata);
		
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		var _db = KnuddelsServer.getPersistence();
		
		if(user != undefined) { 
			_db = user.getPersistence();
		}
		
		if(_db.hasString(key)) {
			_db.deleteString(key);
		}
		
		if(_db.hasNumber(key)) {
			_db.deleteNumber(key);
		}
		
		if(_db.hasObject(key)) {
			_db.deleteObject(key);
		}
		
		/* Delete multiple entries */
		if(subdata) {
			DB.loop(key, function DBLoop(entry, index, totalCount, subkey) {
				DB.delete('_' + key + '_' + index, undefined, false);
			});
			
			DB.delete('_indexes_' + key, undefined, false);
		}
	};

	this.sum = function sum(key) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		return UserPersistenceNumbers.getSum(key);
	};

	this.count = function count(key, from, to) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		var options = {};
		
		if(from != undefined && typeof(from) == 'number') {
			options['minimumValue'] = from;
		}
		
		if(to != undefined && typeof(to) == 'number') {
			options['maximumValue'] = to;
		}
		
		return UserPersistenceNumbers.getCount(key, options);
	};
	
	this.sorted = function sorted(key, sortBy, count, page) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		var options = {};
		
		if(sortBy != undefined) {
			options['ascending'] = (sortBy == 'ASC') ? true : false;
		}
		
		if(count != undefined && typeof(count) == 'number') {
			options['count'] = count;
		}

		if(page != undefined && typeof(page) == 'number') {
			options['page'] = page;
		}
				
		return UserPersistenceNumbers.getSortedEntries(key, options);
	};
	
	// getSortedEntriesAdjacent

	this.users = function users(key, callback, sortBy, from, to) {
		if(key === undefined) {
			Logger.error('No key submitted');
			return false;
		}
		
		if(callback === undefined) {
			Logger.error('No callback submitted');
			return false;
		}
		
		var options = {};
		
		if(sortBy != undefined) {
			options['ascending'] = (sortBy == 'ASC') ? true : false;
		}
		
		if(from != undefined && typeof(from) == 'number') {
			options['minimumValue'] = from;
		}
		
		if(to != undefined && typeof(to) == 'number') {
			options['maximumValue'] = to;
		}
				
		return UserPersistenceNumbers.each(key, callback, options);
	};
	
	this.getFields = function getFields() {
		return {
			global:	_fields_global,
			user:	_fields_user
		};
	};
	
	this.toString = function toString() {
		return '[KFramework Database]';
	};
	
	this.loop = function loop(key, callback) {
		var name		= '_indexes_' + key;
		var id			= DB.load(name, 0);
		var totalCount	= id;
		
		for(var index = 1; index <= id; ++index) {
			var entry = DB.load('_' + key + '_' + index, undefined);
			callback.call(this, entry, index, totalCount, '_' + key + '_' + index);
		}
	};
	
	this.add = function add(key, data) {
		var id		= DB.load('_indexes_' + key, 0);
		
		DB.save('_indexes_' + key,		++id);
		DB.save('_' + key + '_' + id,	data);
		
		return id;
	};
	
	this.update = function update(key, id, data, filter) {
		if(typeof(filter) != 'undefined') {
			data = filter.apply(this, [ data ]);
		}
		
		DB.save('_' + key + '_' + id, data);
	};
	
	this.remove = function remove(key, id, data) {
		DB.delete('_' + key + '_' + id);
	};
}());