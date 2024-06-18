

require('framework/KFramework.js');

var App = (new function() {
	/* App Events */
	this.onAppStart = function() {};
	this.onPrepareShutdown = function(secondsTillShutdown) {};
	this.onShutdown = function() {
		/* Required if you using Cronjobs! */
		Cron.onShutdown();
	};
	
	/* User Events */
	this.onUserJoined = function(user) {};
	this.onUserLeft = function(user) {};
	
	/* Access Events */
	this.mayJoinChannel = function(user) {};
	
	/* Message Events */
	this.maySendPublicMessage = function(publicMessage) {};
	this.onPrivateMessage = function(privateMessage) {};
	this.onPublicMessage = function(publicMessage) {};
	
	/* Knuddel Events */
	this.onKnuddelReceived = function(sender, receiver, knuddelAmount) {};
	
	/* DICE Events */
	this.onUserDiced = function(diceEvent) {};
	
	/* Chat Commands */
	this.chatCommands = {};
}());