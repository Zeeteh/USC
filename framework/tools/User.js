// tools/User.js

var Bot = require('../core/Bot.js'); // Assuming you have a Bot module in your core directory
var KBank = require('../core/KBank.js'); // Assuming you have a KBank module in your core directory


/**
 * Gibt den aktuellen Benutzer zurück.
 * @returns {User} Das Benutzerobjekt des aktuellen Benutzers.
 */
var getCurrentUser = function() {
  return KnuddelsServer.getCurrentUser();
};

/**
 * Gibt ein Array mit allen online befindlichen Benutzern zurück.
 * @returns {Array} Ein Array von Benutzerobjekten.
 */
var getOnlineUsers = function() {
  return KnuddelsServer.getChannel().getOnlineUsers();
};

/**
 * Gibt ein Benutzerobjekt anhand des Nicknamens zurück.
 * @param {string} nickname - Der Nickname des Benutzers.
 * @returns {User|null} Das Benutzerobjekt, falls gefunden, sonst null.
 */
var getUserByName = function(nickname) {
  return KnuddelsServer.getUser(nickname);
};

/**
 * Gibt true zurück, wenn der Benutzer online ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer online ist, sonst false.
 */
var isOnline = function(user) {
  return user.isOnlineInChannel();
};

/**
 * Gibt true zurück, wenn der Benutzer ein App-Entwickler ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer ein App-Entwickler ist, sonst false.
 */
var isAppDeveloper = function(user) {
  return user.getAppDeveloperType() !== 0;
};

/**
 * Gibt true zurück, wenn der Benutzer ein Channel-Moderator ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer ein Channel-Moderator ist, sonst false.
 */
var isChannelModerator = function(user) {
  return user.isChannelModerator();
};

/**
 * Gibt true zurück, wenn der Benutzer ein Channel-Owner ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer ein Channel-Owner ist, sonst false.
 */
var isChannelOwner = function(user) {
  return user.isChannelOwner();
};

/**
 * Gibt true zurück, wenn der Benutzer ein Event-Moderator ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer ein Event-Moderator ist, sonst false.
 */
var isEventModerator = function(user) {
  return user.isEventModerator();
};

/**
 * Gibt true zurück, wenn der Benutzer ein Admin ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer ein Admin ist, sonst false.
 */
var isAdmin = function(user) {
  return user.isAdmin();
};

/**
 * Gibt true zurück, wenn der Benutzer ein Bot ist, sonst false.
 * @param {User} user - Das Benutzerobjekt.
 * @returns {boolean} True, wenn der Benutzer ein Bot ist, sonst false.
 */
var isBot = function(user) {
  return user.isBot();
};

/**
 * Sendet eine private Nachricht an den Benutzer.
 * @param {string} msg - Der Nachrichtentext.
 * @param {number} [delay] - Optionale Verzögerung in Millisekunden vor dem Senden der Nachricht.
 */
User.prototype.private = function(msg, delay) {
  Bot.private(this, msg, delay);
};

/**
 * Sendet eine Post-Nachricht an den Benutzer.
 * @param {string} topic - Der Betreff der Post-Nachricht.
 * @param {string} text - Der Text der Post-Nachricht.
 */
User.prototype.post = function(topic, text) {
  this.sendPostMessage(topic, text);
};

/**
 * Gibt die URL des Profilbilds des Benutzers zurück.
 * @param {number} [width] - Optionale Breite des Bildes in Pixeln (Standard: 200).
 * @param {number} [height] - Optionale Höhe des Bildes in Pixeln (Standard: gleich der Breite).
 * @returns {string} Die URL des Profilbilds.
 */
User.prototype.getProfilePicture = function(width, height) {
  if (width === undefined) {
    width = 200;
  }

  if (height === undefined) {
    height = width;
  }

  if (this.hasProfilePhoto()) {
    if (this.getProfilePhoto !== undefined) {
      return this.getProfilePhoto(width, height);
    }

    return 'http://chat.knuddels.de/pics/fotos/knuddels.de?n=' + encodeURIComponent(this.getNick()); // URL-Codierung für Sonderzeichen
  }

  if (this.getGender() == Gender.Female) {
    return 'nopic_79x79_f.jpg';
  }

  return 'nopic_79x79_m.jpg';
};

/**
 * Gibt das Geschlecht des Benutzers als String zurück ("male", "female" oder "none").
 * @returns {string} Das Geschlecht des Benutzers als String.
 */
User.prototype.getGenderString = function() {
  switch (this.getGender()) {
    case Gender.Male:
      return 'male';
    case Gender.Female:
      return 'female';
  }

  return 'none';
};


// ... (Methoden für den Zugriff auf KBank-Informationen)

module.exports = User; // Exportiere das modifizierte User-Objekt
