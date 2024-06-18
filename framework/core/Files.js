var Files = (new function Files() {
	this.javaClassName = 'Files';
	var rootInstance = KnuddelsServer.getAppAccess().getOwnInstance().getRootInstance();
	
	this.require = function require (filename) {
		
		if(!this.checkFile(filename)) {
			Logger.fatal(filename+' does not exists!');
			return false;
		}		
		KnuddelsServer.require(filename);
	};
	
	this.execute = function execute(filename) {
		
		if(!this.checkFile(filename)) {
			Logger.fatal(filename+' does not exists!');
			return false;
		}		
		KnuddelsServer.execute(filename);
	};
	
	this.updateAppFiles = function updateAppFiles(){
		var files = rootInstance.updateAppFiles();
		
		var res = files.filter(function(filename) {
			return filename.startsWith('www/');
		});
		
		if(res.size()) {
			rootInstance.invalidateClientCache();
		}
		
		return files;
	};
	
	this.getPath = function getPath(filename){
		return KnuddelsServer.getFullImagePath(filename);
	};
	
	this.getSystemPath = function getSystemPath(filename){
		return KnuddelsServer.getFullSystemImagePath(filename);
	};
	
	this.checkFile = function checkFile(filename){
		var path = '';
		
		if(filename.contains('../')) {
			return false;
		}
		
		if(filename.startsWith('./')) {
			filename = filename.substr(2);
		}

		if(filename.startsWith('/')) {
			filename = filename.substr(1);
		}
		
		if(filename.contains('/')) {
			path = filename.split('/');
			filename = path.pop();
			path = path.join('/');			
		
			try {
				return KnuddelsServer.listFiles(path).exists(path+'/'+filename);
			} catch(e) {
				return false;
			}
		}
		
		try {
			return KnuddelsServer.listFiles(path).exists(filename);	
		} catch(e) {
			return false;
		}		
	};

	this.listFiles = function listFiles(path, override) {
		try {
			var files = KnuddelsServer.listFiles(path);
		} catch(e) {
			return [];
		}
				
		var options = {
			showDir: false,
			filterPath: true,
		};
		
		if(override !== undefined){
			override.each(function(val, key){
				options[key] = val;
			});
		}

		files = files.filter(function(file) {
			var dir = '';
			if(file.endsWith('/')) {
				dir = file.split('/'); dir.pop();
				file = dir.pop() + '/';
				dir = dir.join('/');
			} else if(file.contains('/')) {
				dir = file.split('/');
				file = dir.pop();
				dir = dir.join('/');
			}
			
			if(options.prefix !== undefined && !file.startsWith(options.prefix)) {
				return false;
			}
			
			if(options.type !== undefined && !file.endsWith('.'+options.type)) {
				return false;
			}
			
			if(options.showDir !== undefined && !(options.showDir) && file.endsWith('/')) {
				return false;
			}
			
			return true;
		});
		
		if(options.filterPath !== undefined && (options.filterPath)) {
			return files.map(function(file){
				if(file.endsWith('/')) {
					dir = file.split('/'); dir.pop();
					file = dir.pop() + '/';
					dir = dir.join('/');
				} else if(file.contains('/')) {
					dir = file.split('/');
					file = dir.pop();
					dir = dir.join('/');
				}
				return file;
			});
		}			

		return files;
	};
	

	this.toString = function toString() {
		return '[KFramework Files]';
	};

}());