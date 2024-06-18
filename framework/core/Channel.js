var Background = {
	/* Strecken */
	SCALED:							0,
	
	/* Skaliert (Füllend, Zentriert, Mode1) */
	SCALE_FILLED_MODE1:				6,
	
	/* Skaliert (Füllend, Zentriert, Mode2) */
	SCALE_FILLED_MODE2:				10,
	
	/* Skaliert (Füllend, Zentriert, Mode3) */
	SCALE_FILLED_MODE3:				54,
	
	/* Skaliert (Komplett sichtbar, Zentriert) */
	SCALE_COMPLETE_CENTERED:		7,
	
	/* Skaliert auf Höhe (Rechts) */
	SCALE_HEIGHT_RIGHT:				61,
	
	/* Skaliert auf Breite (Oben) */
	SCALE_HEIGHT_TOP:				40,
	
	/* Skaliert auf Breite (Unten) */
	SCALE_HEIGHT_BOTTOM:			56,
	
	/* Gekachelt */
	TILED:							17,
	
	/* Gekachelt (2fache Größe) */
	TILED_ZOOM_X2:					33,
	
	/* Gekachelt (3fache Größe) */
	TILED_ZOOM_X3:					59,
		
	/* Gekachelt (Zeilenweise versetzt) */
	TILED_OFFSET_HORIZONTAL:		18,
	
	/* Gekachelt (Zeilenweise, 2fache Größe) */
	TILED_OFFSET_ZOOM_X2:			34,
	
	/* Gekachelt (Zeilenweise, 3fache Größe) */
	TILED_OFFSET_ZOOM_X3:			50,
	
	/* Gekachelt (Spaltenweise) */
	TILED_OFFSET_VERTICAL:			19,
	
	/* Gekachelt (Spaltenweise, 2fache Größe) */
	TILED_OFFSET_VERTICAL_ZOOM_X2:	34,
	
	/* Gekachelt (Spaltenweise, 3fache Größe) */
	TILED_OFFSET_VERTICAL_ZOOM_X3:	50,
	
	/* Zentriert */
	CENTERED:						20,
	
	/* Zentriert (2fache Größe) */
	CENTERED_ZOOM_X2:				36,
	
	/* Zentriert (3fache Größe) */
	CENTERED_ZOOM_X3:				52
};

var Channel = (new function Channel() {
	this.javaClassName = 'Channel';	
	var _channel		= KnuddelsServer.getChannel();
	var _configuration	= _channel.getChannelConfiguration();
	var _restrictions	= _channel.getChannelRestrictions();
	var _design			= _channel.getChannelDesign();
	var _rights			= _configuration.getChannelRights();
	var _info			= _configuration.getChannelInformation();
	
	this.getName = function getName() {
		return _channel.getChannelName();
	};
	
	this.getRootName = function getRootName() {
		return _channel.getRootChannelName();
	};
	
	this.usersOnline = function usersOnline(filter) {
		return Channel.getUsers(filter).size();
	};
	
	this.getOwner = function getOwner(index) {
		index		= (typeof(index) == 'undefined' ? 0 : index);
		var owners	= this.getOwners();
		
		return owners[index];
	};
	
	this.setBackground = function setBackground(image, style, user, text) {
		Bot.private(user, '°>{bgimage}' + image + '|' + (style == undefined ? Background.SCALED : style) + '<°' + (text == undefined ? 'Das Hintergrundbild wird geändert' : text));
	};
	
	this.getTopic = function getTopic() {
		return _info.getTopic();
	};
	
	this.setTopic = function setTopic(text, showLive) {
		if(showLive === undefined) {
			showLive = true;
		}
		
		_info.setTopic(text || '', showLive);
	};
	
	this.getModerators = function getModerators() {
		return _rights.getChannelModerators();
	};
	
	this.getOwners = function getOwners() {
		return _rights.getChannelOwners();
	};
	
	this.getMods = function getMods() {
		return _rights.getEventModerators();
	};
	
	this.getCMutes = function getCMutes() {
		return _restrictions.getColorMutedUsers();
	};
	
	this.getMutes = function getMutes() {
		return _restrictions.getMutedUsers();
	};
	
	this.getCLs = function getCLs() {
		return _restrictions.getLockedUsers();
	};
	
	this.onDev = function onDev() {
		return KnuddelsServer.getChatServerInfo().isTestSystem();
	};
	
	this.isVideoChannel = function isVideoChannel() {
		return _channel.isVideoChannel();
	};
	
	this.isVisible = function isVisible() {
		return _channel.isVisible();
	};

	this.getServer = function getServer() {
		return KnuddelsServer.getChatServerInfo().getServerId();
	};
	
	this.getBackgroundColor = function getBackgroundColor() {
		return _design.getBackgroundColor();
	};
	
	this.getDefaultFontColor = function getDefaultFontColor() {
		return _design.getDefaultFontColor();
	};
	
	this.getDefaultFontSize = function getDefaultFontSize() {
		return _design.getDefaultFontSize();
	};
	
	
	/*
		Example Filter:
		{
			bot:		true,		// AppBot or SystemBot
			cm:			true,
			owner:		true,
			event:		true,
			away:		true,
			lmc:		true,
			developer:	true,
			include:	[], //array of uid´s or User-Objects
			exclude:	[], //array of uid´s or User-Objects
			status:		[
							Status.Newbie,
							Status.Family,
							Status.Stammi,
							Status.Ehrenz,
							Status.Admin,
							Status.Sysadmin,
							Status.Bot
						],
			gender:		[
							Gender.Male,
							Gender.Female,
							Gender.Unknown
						]
			video:		true,
			appContent: AppContent.overlayContent,
			clientType:	[ClientType.Applet],
			costum:		function(user) {
				return user.getNick().startsWith('Penis');
			}
		}
	*/
	this.getUsers = function getUsers(filter, randomOne) {
		filter 		= filter || {};
		var types	= [UserType.Human];
		
		if(filter.bot != undefined) {
			if(filter.bot) {
				types.push(UserType.AppBot);
				types.push(UserType.SystemBot);
			}
		}
		
		var users = [];
		var _users	= _channel.getOnlineUsers(types);
		
		// Return users if no other filters available
		if(!filter.size()) {
			return (randomOne) ? RandomOperations.getRandomObject(_users) : _users;
		}

		//_users.each(function(user, index) {
		for(var index = 0; index < _users.length; index++) {
			// Is Away
			if(filter.away != undefined && filter.away != _users[index].isAway()) {
				continue;
			}
			
			// Is CMuted
			if(filter.cmute != undefined && filter.cmute != _users[index].isColorMuted()) {
				continue;
			}
			
			// Is Muted
			if(filter.mute != undefined && filter.mute != _users[index].isMuted()) {
				continue;
			}
			
			// Is CMuted
			if(filter.cl != undefined && filter.cl != _users[index].isLocked()) {
				continue;
			}
			
			// App Developer
			if(filter.developer != undefined && filter.developer != _users[index].isAppDeveloper()) {
				continue;
			}
			
			// App Manager
			if(filter.manager != undefined && filter.manager != _users[index].isAppManager()) {
				continue;
			}
			
			// Channel Owner
			if(filter.owner != undefined && filter.owner != _users[index].isChannelOwner()) {
				continue;
			}
			
			// Event Moderator
			if(filter.event != undefined && filter.event != _users[index].isEventModerator()) {
				continue;
			}
			
			// ChannelModerator
			if(filter.cm != undefined && filter.cm != _users[index].isChannelModerator()) {
				continue;
			}
			
			// LMC
			if(filter.lmc != undefined && filter.lmc != _users[index].isLikingChannel()) {
				continue;
			}
			
			// Status
			if(filter.status != undefined && !filter.status.exists(_users[index].getUserStatus())) {
				continue;
			}

			// Blacklist Filter
			if(filter.exclude != undefined && filter.exclude.size()) {
				var result = filter.exclude.each(function FilterExcludeEach(entry) {
					if(isTypeOf(entry) == 'User' && _users[index].equals(entry)) {
						return false;
					} else if(_users[index].getUserId() == entry) {
						return false;
					}
				});
				
				if(!result) {
					continue;
				}
			}
			
			// Whitelist Filter
			if(filter.include != undefined && filter.include.size()) {
				filter.include.each(function FilterIncludeEach(entry) {
					if(isTypeOf(entry) == 'User' && _users[index].equals(entry)) {
						return false;
					} else if(_users[index].getUserId() == entry) {
						return false;
					}
				});
				
				if(result) {
					continue;
				}
			}
			
			// Gender
			if(filter.gender != undefined && !filter.gender.exists(_users[index].getGender())) {
				continue;
			}

			// isStreamingVideo
			if(filter.video != undefined && filter.video != _users[index].isStreamingVideo()) {
				continue;
			}
			
			//getClientType 
			if(filter.clientType != undefined && !filter.clientType.exists(_users[index].getClientType())) {
				continue;
			}
			
			// canSendAppContent
			if(filter.appContent != undefined && !_users[index].canSendAppContent(filter.appContent)) {
				continue;
			}
			
			if(filter.custom != undefined && typeof(filter.custom) == 'function' && !filter.custom.call(_users[index], _users[index])) {
				continue;
			}

			users.push(_users[index]);
		}
		return (randomOne) ? RandomOperations.getRandomObject(users) : users;
	};
	
	/*
		Create a link to join a channel
	*/
	this.getLink = function getLink() {
		var channelName = this.getName();
		return "°>" + channelName + "|/go " + channelName + "|/go +" + channelName + "<°";
	}
	
	this.toString = function toString() {
		return '[KFramework Channel]';
	};
}());
