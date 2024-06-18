var Status = {

	Newbie:		0,
	

	Family:		1,
	
	Stammi:		2,
	
	Ehrenz:		3,
	
	Admin:		6,
	
	Sysadmin:	11,
	
	Bot:		-1
};

var Users = (new function Users() {
	this.javaClassName = 'Users';
	var UAC = KnuddelsServer.getUserAccess();
	
	this.getProfilePicture = function getProfilePicture(user) {
		Logger.info('Users.getProfilePicture(user) is DEPRECATED, use user.getProfilePicture(width, height)');
		
		var nickname = '';
		
		if(user.getNick == undefined) {
			user		= this.get(user);
		}
		
		nickname	= user.getNick();
		
		return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + nickname.urlencode();
	};
	
	this.nickExists = function nickExists(nickname) {
		return UAC.exists(nickname);
	};
	
	this.canAccess = function canAccess(nickname) {
		if(typeof(nickname) == 'number') {
			return UAC.mayAccess(nickname);
		}
		
		if(!UAC.exists(nickname)) {
			return false;
		}

		var userId	= UAC.getUserId(nickname);
		return UAC.mayAccess(userId);
	};
	
	this.fixNick = function fixNick(userId) {
		return UAC.getNick(userId);
	};
	
	this.getAppDeveloper = function getAppDeveloper() {
		return KnuddelsServer.getAppAccess().getOwnInstance().getAppInfo().getAppDeveloper();
	};
	
	this.getAppManagers = function getAppManagers() {
		return KnuddelsServer.getAppAccess().getOwnInstance().getAppInfo().getAppManagers();
	};
	
	this.get = function get(nickname) {
		if(typeof(nickname) == 'number') {
			if(UAC.mayAccess(nickname)) {
				return UAC.getUserById(nickname);
			}
		}
		
		if(!UAC.exists(nickname)) {
			return undefined;
		}

		var userId	= UAC.getUserId(nickname);
		if(UAC.mayAccess(userId)) {
			return UAC.getUserById(userId);
		}
		
		if(typeof(nickname) == 'string') {
			return (new function TemporaryUser() {
				var _nickname			= nickname;
				var _uid 				= userId;
				this.virtual			= true;
				this.isVirtual			= function isVirtual() { return true; };
				this.getPersistence		= function getPersistence(_uid) {
					return (new function VirtualPersistence(uid) {
						_uid = uid;

						this.addNumber = function addNumber(key, value) {
							var userdb = DB.load('_userdb');
							if(userdb[_uid][key] === undefined) { userdb[_uid][key] = 0; }
							userdb[_uid][key] += value;
							DB.save('_userdb', userdb);
						};
						this.getString = function getString(key, defaults) { return DB.load('_userdb')[_uid][key] || defaults; };
						this.getNumber = function getNumber(key, defaults) { return DB.load('_userdb')[_uid][key] || defaults; };
						this.getObject = function getObject(key, defaults) { return DB.load('_userdb')[_uid][key] || defaults; };

						this.deleteNumber = function deleteNumber(key) { 
							var userdb = DB.load('_userdb');
							delete userdb[_uid][key];
							DB.save('_userdb', userdb);
						};
						
						this.deleteObject = function deleteObject(key) {
							var userdb = DB.load('_userdb');
							delete userdb[_uid][key];
							DB.save('_userdb', userdb);
						};
						
						this.deleteString = function deleteString(key) {
							var userdb = DB.load('_userdb');
							delete userdb[_uid][key];
							DB.save('_userdb', userdb);
						};
						
						this.setString = function setString(key, data) { 
							var userdb = DB.load('_userdb');
							userdb[_uid][key] = data;
							DB.save('_userdb', userdb);
						};
						
						this.setNumber = function setNumber(key, data) { 
							var userdb = DB.load('_userdb');
							userdb[_uid][key] = data;
							DB.save('_userdb', userdb);
						};
						
						this.setObject = function setObject(key, data) {
							var userdb = DB.load('_userdb');
							userdb[_uid][key] = data;
							DB.save('_userdb', userdb);
						};
					}());
				};
				
				this.equals				= function equals(user) {
					Logger.warn('using User.equals() on virtual User-Object');
					/* TODO */
				};
				
				this.getAge				= function getAge() { return -1; };
				this.getGender			= function getGender() { return Gender.Unknown; };
				this.getKnuddelAmount	= function getKnuddelAmount() { return new KnuddelAmount(0); };
				this.getNick			= function getNick() { return _nickname; };
				this.getOnlineMinutes	= function getOnlineMinutes() { return -1; };
				this.getProfilePicture	= function getProfilePicture() { return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + _nickname.urlencode(); };
				this.getProfileLink		= function getProfileLink() { return '°>_h' + _nickname.escapeKCode() + '|/w "|/serverpp "<°'; };
				this.getReadme			= function getReadme() { return ''; };
				this.getRegDate			= function getRegDate() { return new Date(0); };
				this.getID				= function getID() { return _uid; };
				this.getUserId			= function getUserId() { return _uid; };
				this.getUserStatus		= function getUserStatus() { return UserStatus.Newbie; };
				this.getUserType		= function getUserType() { return UserType.Human; };
				this.isAppDeveloper		= function isAppDeveloper() { return false; };
				this.isAppManager		= function isAppManager() { return false; };
				this.isAway				= function isAway() { return false; };
				this.isChannelModerator	= function isChannelModerator() { return false; };
				this.isChannelOwner		= function isChannelOwner() { return false; };
				this.isColorMuted		= function isColorMuted() { return false; };
				this.isEventModerator	= function isEventModerator() { return false; };
				this.isLocked			= function isLocked() { return false; };
				this.isMuted			= function isMuted() { return false; };
				this.isOnline			= function isOnline() { return false; };
				this.isOnlineInChannel	= function isOnlineInChannel() { return false; };
				this.isProfilePhotoVerified	= function isProfilePhotoVerified() { return false; };
				this.getKnuddels		= function getKnuddels() { return 0; };
				this.sendPostMessage	= send;
				this.sendPrivateMessage	= send;
				this.private			= send;
				this.post				= send;
				
				function send() {
					Logger.error('Cant send message to a virtual User-Object!');
				};
				
				_nickname				= UAC.getNick(_uid);
			}());
		}
		
		return UAC.getNick(nickname);
	};
	
	this.toString = function toString(value) {
		switch(value) {
			case UserStatus.Newbie:
				return 'Newbie';
			break;
			case UserStatus.Family:
				return 'Family';
			break;
			case UserStatus.Stammi:
				return 'Stammi';
			break;
			case UserStatus.HonoryMember:
				return 'Ehrenz';
			break;
			case UserStatus.Admin:
				return 'Admin';
			break;
			case UserStatus.Sysadmin:
				return 'Sysadmin';
			break;
			case UserStatus.SystemBot:
				return 'Bot';
			break;
			default:
				return '[KFramework User]';
			break;
		}
		
		return value + '';
	};
}());