require('framework/KFramework.js');

var App = (new function() {
	/* App Events */
	this.onAppStart = function() {
		/* Toplist Events */
		Top.addEvent('onOpen', function onOpen(user, data) {
			user.private(JSON.format(data));
		});
		
		Top.addEvent('onClose', function onClose(user, data) {
			user.private(JSON.format(data));
		});
		
		new Toplist('points_all', [ 'Points', 'All' ]);
		new Toplist('points_week', [ 'Points', 'Week' ]);
	};
	
	this.onEventReceived = function onEventReceived(user, name, value) {
		switch(name) {
			case 'toplist':
				if(typeof(value) == 'boolean' && value) {
					user.sendEvent('toplist', Top.getCategorys());
					return;
				}
				
				Top.handleEvent(user, value);
			break;
			
			/* Other Events */
		}
	};
	
	/* Chat Commands */
	this.chatCommands = {
		Toplist: function Toplist(user, params) {
			Top.handleCommand(user, params);
		}
	};
}());