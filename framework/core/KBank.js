var KBank = (new function KBank() {
	this.javaClassName = 'KBank';
	var instance = this;
	var updateCallback = null;
	var payoutTaxRate = 0;
	
	this.onKontoUpdate = function(call) {
		updateCallback = call;
	};
	
	this.triggerKontoUpdate = function(uid) {
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};
	
	this.setPayoutTaxRate = function setPayoutTaxRate(taxRate) {
		if(taxRate === undefined) {
			throw 'No taxRate submitted!';
		}
		
		if(isNaN(parseFloat(taxRate))) {
			throw 'taxRate "'+taxRate+'" is non Numeric';
			return false;
		}
		
		taxRate = parseFloat(taxRate.toFixed(2));

		if(taxRate>100) {
			Logger.error('taxRate "'+taxRate+'" is higher as 100');
			return false;
		}
		
		payoutTaxRate = taxRate;
		return true;
	};
	
	this.getPayoutTaxRate = function getPayoutTaxRate() {
		return payoutTaxRate;
	};
	
	this.getKn = function getKn(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		return parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2));
	};
	
	this.getTotalKn = function getTotalKn(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _user = Users.get(parseInt(uid, 10));
		return parseFloat((_user.getPersistence().getNumber('KBank_knuddel', 0.00)+_user.getKnuddelAmount().asNumber()).toFixed(2));
	};
	
	this.getAccountKn = function getTotalKn(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _user = Users.get(parseInt(uid, 10));
		
		return parseFloat(_user.getKnuddelAmount().asNumber().toFixed(2));
	};
	
	this.reqKn = function reqKn(uid, kn, callSuccess, callError, reason) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var user = Users.get(parseInt(uid, 10));
		
		if(!isTypeOf(user) == 'User') {
			throw 'No User-Object found!';
		}
		
		if(kn === undefined) {
			throw 'No Knuddel submitted!';
		}

		if(callSuccess === undefined || typeof(callSuccess) !== 'function') {
			throw 'no success Callback';
		}

		if(callError === undefined || typeof(callError) !== 'function') {
			throw 'no error Callback';
		}
		
		try {
			kn = parseFloat(kn.toFixed(2));
		} catch(e) {
			throw e.message;
		}

		if(kn <= 0.00) {
			callError(user, 'KnNullOrNeg');
			return false;
		}
	
		if(kn <= this.getKn(uid)) {
			if(this.subKn(uid, kn)) {
				callSuccess(user, kn);
				return true;
			} else {
				callError(user, 'KnCantSub');
				return false;
			}
		}
		
		var diffKn = parseFloat((kn-this.getKn(uid)).toFixed(2));
		
		if(diffKn < 0.01) {
			diffKn = 0.01;
		}
		
		try {
			var requestKn = new KnuddelAmount(diffKn);
		} catch(e) {
			callError(user, 'KnValueToHigh');
			return false;
		}

		if(requestKn > user.getKnuddelAmount().asNumber()) {
			callError(user, 'KnNotEnough');
			return;
		}

		if(!user.canTransferKnuddelToApp(requestKn)) {
			callError(user, 'KnLimitToLow');
			return false;
		}
		
		try {
			user.transferKnuddelToApp(requestKn, reason || 'Einzahlung', {
				transferReason: reason || 'Einzahlung',
				onError: function KnOnError() {
					callError(user, 'KnTransferError');
				},
				onSuccess: function KnOnSuccess() {
					if(instance.subKn(uid, kn)) {
						callSuccess(user, kn);
					} else {
						setTimeout(function timeOutCheck() {
							if(instance.subKn(uid, kn)) {
								callSuccess(user, kn);
							} else {
								callError(user, 'KnNotReceived');
							}
						}, 500);
					}
				}	
			});
		} catch(e) {
			callError(user, 'KnTransferError');
			Logger.error(e.name + ' : ' + e.message);
		}
	};
	
	this.getKonto = function getKonto(uid) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		
		return {
			knuddel: parseFloat(_db.getNumber('KBank_knuddel', 0.00).toFixed(2)),
			buyin: parseFloat(_db.getNumber('KBank_buyin', 0.00).toFixed(2)),
			payout: parseFloat(_db.getNumber('KBank_payout', 0.00).toFixed(2)),
			lock: (_db.getNumber('KBank_lock', 0))
		};
	};
	
	this.resetKonto = function resetKonto(uid) {
		if(uid === undefined) {
			return;
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		
		_db.deleteNumber('KBank_knuddel');
		_db.deleteNumber('KBank_buyin');
		_db.deleteNumber('KBank_payout');
		_db.deleteNumber('KBank_lock');
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};

	this.setKn = function setKn(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn < 0.00) {
			return false;
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.setNumber('KBank_knuddel', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
	};
	
	this.addKn = function addKn(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn <= 0.00) {
			return false;
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.addNumber('KBank_knuddel', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	this.delKn = function delKn(uid, kn) {
		Logger.info('KBank.delKn(uid, kn) is DEPRECATED, use KBank.subKn(uid, kn)');
		return this.subKn(uid, kn);
	};
	
	this.subKn = function subKn(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No KN submitted!';
		}
	
		if(kn <= 0.00) {
			return false;
		}
		
		if(kn > this.getKn(uid)) {
			return false;
		}

		var _db = Users.get(parseInt(uid, 10)).getPersistence();		
		_db.addNumber('KBank_knuddel', -kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};

	this.payout = function payout(uid, kn, reason) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
		}

		if(kn < 0) {
			return false;
		}
		
		if(kn > this.getKn(uid)) {
			return false;
		}
		
		if(kn > Bot.getKnuddels()) {
			return false;
		}
		
		if(kn >= 1000000) {
			return false;
		}
		
		var _user = Users.get(parseInt(uid, 10));
		var _db = _user.getPersistence();
		_db.addNumber('KBank_knuddel', -kn);
		_db.addNumber('KBank_payout', kn);

		if(payoutTaxRate) {
			Bot.knuddel(_user, kn/100*(100-payoutTaxRate), reason);
		} else {
			Bot.knuddel(_user, kn, reason);
		}
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	this.payToAccount = function payToAccount(uid, kn, reason) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No UID submitted!';
		}

		if(kn < 0) {
			return false;
		}
		
		if(kn > this.getKn(uid)) {
			return false;
		}
		
		if(kn > Bot.getKnuddels()) {
			return false;
		}
		
		if(kn >= 1000000) {
			return false;
		}
		
		var _user = Users.get(parseInt(uid, 10));
		var _db = _user.getPersistence();
		_db.addNumber('KBank_knuddel', -kn);
		_db.addNumber('KBank_payout', kn);
		
		if(payoutTaxRate) {
			Bot.knuddel(_user, kn/100*(100-payoutTaxRate), reason, KnuddelTransferDisplayType.Silent);
		} else {
			Bot.knuddel(_user, kn, reason, KnuddelTransferDisplayType.Silent);
		}

		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	this.payin = function payin(uid, kn) {
		if(uid === undefined) {
			throw 'No UID submitted!';
		}
		
		if(kn === undefined) {
			throw 'No Knuddel submitted!';
		}

		if(kn <= 0.00) {
			throw 'KnNullOrNeg!';
		}
		
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.addNumber('KBank_knuddel', kn);
		_db.addNumber('KBank_buyin', kn);
		
		if(updateCallback) {
			updateCallback(Users.get(parseInt(uid, 10)), this.getKn(uid));
		}
		
		return true;
	};
	
	this.isLocked = function isLocked(uid) {
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		return (_db.getNumber('KBank_lock', 0));
	};
	
	this.setLock = function setLock(uid) {
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.setNumber('KBank_lock', 1);
	};
	
	this.unLock = function unLock(uid) {
		var _db = Users.get(parseInt(uid, 10)).getPersistence();
		_db.deleteNumber('KBank_lock');		
	};
	
	this.getUsers = function getUsers(callback) {
		if(typeof callback !== 'function') {
			Logger.error('KBank.getUsers() is DEPRECATED, use it like this KBank.getUsers(function(userIds, total){ });');
			return false;
		}
		
		var _users = [];
		
		UserPersistenceNumbers.each('KBank_knuddel', function UserPersistenceNumbersEach(user, value, index, total, key) {
			_users.push(user.getUserId());
		}, {
			ascending:false,
			onStart: function onStart(totalCount) {
				_users = [];
			},
			onEnd: function onEnd(totalCount) {
				callback.call(this, _users, totalCount);
			}
		});
	};
	
	this.getStats = function getStats() {
		return {
			users: DB.count('KBank_knuddel'),
			knusers: DB.count('KBank_knuddel', 0.01),
			knuddel: parseFloat(DB.sum('KBank_knuddel')),
			buyin: parseFloat(DB.sum('KBank_buyin')),
			payout: parseFloat(DB.sum('KBank_payout')),
		};
	};

	this.getTransit = function getTransit() {
		return parseFloat(DB.sum('KBank_knuddel'));
	};

	this.getMaxPayout = function getTransit() {
		if(payoutTaxRate) {
			return parseFloat(DB.sum('KBank_knuddel')/100*(100-payoutTaxRate));
		}
		return this.getTransit();
	};
	
	this.toString = function toString() {
		return '[KFramework KBank]';
	};
	
	
	this.dataMigration = function dataMigration() {
		if(DB.check('_bank', {}) == false) {
			return true;
		}
		
		var migrate = DB.load('_bank', {});
		
		if(!migrate.size()) {
			DB.delete('_bank');
			Logger.info('KBank fully migrated! You can now delete all "KBank.saveData()" and "KBank.loadData()" calls from your AppCode');
			return false;
		};

		var _db = null;
		var migrated = [];
		var start = new Date().getTime();
		migrate.each(function MigrateEach(konto, uid) {
			_db = Users.get(parseInt(uid, 10)).getPersistence();
			_db.setNumber('KBank_knuddel', parseFloat(konto.knuddel.toFixed(2)));
			_db.setNumber('KBank_buyin', parseFloat(konto.buyin.toFixed(2)));
			_db.setNumber('KBank_payout', parseFloat(konto.payout.toFixed(2)));
			migrated.push(uid);
			
			if((new Date().getTime()-start) > 9000) {
				return false;
			}
		});
		
		if(migrate.size() == migrated.size()) {
			DB.delete('_bank');
			Logger.info('KBank fully migrated! You can now delete all "KBank.loadData()" and "KBank.saveData()" calls from your AppCode');
		} else {
			migrated.each(function MigratedEach(uid) {
				delete migrate[uid];
			});
			DB.save('_bank', migrate);			
			Logger.info('KBank cant migrate all data at once ('+migrated.size()+' of '+migrate.size()+' finish). Please restart this App to migrate the last '+(migrate.size()-migrated.size())+' KBank Entrys');
		}
		return false;
	};
	
	this.getData = function getData() {
		Logger.info('KBank.getData() is DEPRECATED, you dont need this all any more!');
	};
	
	this.loadData = function loadData() {
		Logger.info('KBank.loadData() is DEPRECATED, you dont need this all any more!');
	};
	
	this.saveData = function saveData() {
		Logger.info('KBank.saveData() is DEPRECATED, you dont need this all any more!');
	};

	this.resetData = function resetData() {
		Logger.info('KBank.resetData() is DEPRECATED, you dont need this all any more!');
	};
	
	this.fixData = function fixData() {
		Logger.info('KBank.fixData() is DEPRECATED, you dont need this all any more!');
	};
	
	this.cleanData = function cleanData() {
		Logger.info('KBank.cleanData() is DEPRECATED, you dont need this all any more!');
	};
}());