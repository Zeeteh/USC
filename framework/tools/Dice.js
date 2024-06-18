if (!DiceEvent.prototype.getTotal) {
  Object.defineProperty(DiceEvent.prototype, 'getTotal', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function getTotal() {
		return this.getDiceResult().totalSum();
    }
  });
}

if (!DiceEvent.prototype.isOpenThrow) {
  Object.defineProperty(DiceEvent.prototype, 'isOpenThrow', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function isOpenThrow() {
		return this.getDiceResult().getDiceConfiguration().isUsingOpenThrow();
    }
  });
}

if (!DiceEvent.prototype.isPrivate) {
  Object.defineProperty(DiceEvent.prototype, 'isPrivate', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function isPrivate() {
		return this.getDiceResult().getDiceConfiguration().isUsingPrivateThrow();
    }
  });
}

if (!DiceEvent.prototype.getSingleDices) {
  Object.defineProperty(DiceEvent.prototype, 'getSingleDices', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function getSingleDices() {
		return this.getDiceResult().getSingleDiceResults();
    }
  });
}

if (!DiceEvent.prototype.getSingleValues) {
  Object.defineProperty(DiceEvent.prototype, 'getSingleValues', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function getSingleValues(diceCount) {
		if(diceCount === undefined) {
			diceCount = 0;
		}
		
		return this.getDiceResult().getSingleDiceResults()[diceCount].valuesRolled();
    }
  });
}

if (!DiceEvent.prototype.checkUser) {
  Object.defineProperty(DiceEvent.prototype, 'checkUser', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function checkUser(user) {
		if(!isTypeOf(user, 'User')) {
			user = Users.get(user);
		}

		return this.getUser().equals(user);
    }
  });
}

if (!DiceEvent.prototype.checkConf) {
  Object.defineProperty(DiceEvent.prototype, 'checkConf', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function checkConf(conf) {
		if(isTypeOf(conf, 'string')) {
			conf = DiceConfigurationFactory.fromString(conf);	
		}
				
		return this.getDiceResult().getDiceConfiguration().equals(conf);
    }
  });
}

if (!DiceConfiguration.prototype.getFakeDiceEvent) {
  Object.defineProperty(DiceConfiguration.prototype, 'getFakeDiceEvent', {
    enumerable: false,
    configurable: false,
    writable: false,
    value: function getFakeDiceEvent(user) {
		var _conf = this;
		var _singleResults = [];
		var _totalSum = 0;
 
		function FakeSingleDiceResult(dice, values) {
			var sum = 0;
			values.each(function(val) {
				sum += val;
			});
			
			this.getDice = function getDice() { return dice; };
			this.valuesRolled = function valuesRolled() { return values; };
			this.sum = function sum() { return sum; };
		}
		
		var confdices = _conf.getDices();
		confdices.sort(function(a, b) {
            return a.getNumerOfSides() - b.getNumerOfSides();
        });

		var dices = [];
		var results = [];
		var count = 0;
		confdices.each(function(dice){
            var curValues = [];
			var curDices = [];

			if(dice.getAmount() == 1) {
				dices.push('W'+dice.getNumerOfSides());
				count++;				
			} else {
				dices.push(dice.getAmount()+'W'+dice.getNumerOfSides());
				count += dice.getAmount();
			}
 
            for(var w = 0; w < dice.getAmount(); w++) {
				if(_conf.isUsingOpenThrow()) {
					var tmpVal = 0;
					var diceo = [];
					do {
						tmpVal = RandomOperations.nextInt(dice.getNumerOfSides())+1;
						curValues.push(tmpVal);
						diceo.push(tmpVal);
						_totalSum += tmpVal;
					} while(tmpVal == dice.getNumerOfSides())
					
					curDices.push(diceo.join('> '));
				} else {
					var tmpVal = RandomOperations.nextInt(dice.getNumerOfSides())+1;
					curValues.push(tmpVal);
					curDices.push(tmpVal);
					_totalSum += tmpVal;
				}
            }
			results.push(curDices.join(', '));
            _singleResults.push(new FakeSingleDiceResult(dice, curValues));
        });
		
		var infoLine = ((!_conf.isUsingPrivateThrow()) ? '°BB°> ' : '')+'_'+user.getProfileLink()+'_ rollt '+((count > 1) ? 'die' : 'einen')+' Würfel'+((_conf.isUsingOpenThrow()) ? ' (offener Wurf)' : '')+'...';
		var resultLine = dices.join(' + ')+': '+results.join(' + ')+' = _'+_totalSum+'_';
		
		return (new function FakeDiceEvent() {
			this.checkConf = function checkConf(conf) { return this.getDiceResult().getDiceConfiguration().equals(conf); };
			this.checkUser = function checkUser(user) { return this.getUser().equals(user); };
			this.getDiceResult = function getDiceResult() { 
				return (new function FakeDiceResult() {
					this.getDiceConfiguration = function getDiceConfiguration() { return _conf; };
					this.getSingleDiceResults = function getSingleDiceResults() { return _singleResults; };
					this.totalSum = function totalSum() { return _totalSum; };
				});
			};
			this.getResultLine = function getText() { return resultLine; };			
			this.getText = function getText() { return infoLine + '°#°' + resultLine; };
			this.getInfoLine = function getInfoLine() { return infoLine };
			this.getTotal = function getTotal() { return this.getDiceResult().totalSum(); };
			this.getUser = function getUser() { return user; };
		});
    }
  });
};