require('framework/KFramework.js');

// Example Hooks
Hooks.add('onAppStart', function() {
	Bot.public('App wurde gestartet!');
});

Hooks.add('onUserJoined', function(user) {
	Bot.private(user, 'Willkommen!');
}, 5);

var App = (new function() {
	/* App Events */
	this.onAppStart = function() {
		Hooks.do('onAppStart');
	};
	
	this.onPrepareShutdown = function(secondsTillShutdown) {
		Hooks.do('onPrepareShutdown', secondsTillShutdown);
	};
	
	this.onShutdown = function() {
		Hooks.do('onShutdown');
		
		/* Required if you using Cronjobs! */
		Cron.onShutdown();
	};
	
	/* User Events */
	this.onUserJoined = function(user) {
		Hooks.do('onUserJoined', user);
	};
	
	this.onUserLeft = function(user) {
		Hooks.do('onUserLeft', user);
	};
	
	/* Access Events */
	this.mayJoinChannel = function(user) {
		Hooks.do('mayJoinChannel', user);
	};
	
	/* Message Events */
	this.maySendPublicMessage = function(publicMessage) {
		Hooks.do('maySendPublicMessage', publicMessage);
	};
	
	this.onPrivateMessage = function(privareMessage) {
		Hooks.do('onPrivateMessage', privareMessage);
	};
	
	this.onPublicMessage = function(publicMessage) {
		Hooks.do('onPublicMessage', publicMessage);
	};
	
	/* Knuddel Events */
	this.onKnuddelReceived = function(sender, receiver, knuddelAmount) {
		Hooks.do('onKnuddelReceived', sender, receiver, knuddelAmount);
	};
	
	/* DICE Events */
	this.onUserDiced = function(diceEvent) {
		Hooks.do('onUserDiced', diceEvent);
	};
	
	/* Chat Commands */
	this.chatCommands = {};
}());