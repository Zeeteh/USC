var Cron = (new function KCron() {
	this.javaClassName = 'KCron';	
	var _cronjobs	= [];
	var _watcher;
	var _offlineCheck = false;
	var instance = this;
	
	this.init = function init() {
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
		
		_watcher	= setInterval(this.run, 500);
	};
	
	this.enableOfflineRunCheck = function enableOfflineRunCheck() {
		_offlineCheck = true;
	};
	
	this.checkOfflineRun = function checkOfflineRun(job) {
		if(job.getLastCheck() == 0) {
			return;
		}
		
		while(new Date().getTime() >= job.getLastCheck()) {
			var time = new Date(job.getLastCheck()+500);
			job.setLastCheck(time);
			
			if((time.getTime() - job.getLastRun() > 60000) && instance.checkMatch(job.getMinutes(), time.getMinutes())&& instance.checkMatch(job.getHours(), time.getHours()) && instance.checkMatch(job.getDate(), time.getDate()) && instance.checkMatch(job.getMonth(), time.getMonth()) && instance.checkMatch(job.getDay(), time.getDay())) {
				job.run(time);
				return;
			}
		}
	};
	
	this.run = function run() {
		var time = new Date();
		
		_cronjobs.each(function CronjobsEach(job) {
			if(!job.isRunning()) {
				return;
			}
			
			if((time.getTime() - job.getLastRun() > 60000) && instance.checkMatch(job.getMinutes(), time.getMinutes()) && instance.checkMatch(job.getHours(), time.getHours()) && instance.checkMatch(job.getDate(), time.getDate()) && instance.checkMatch(job.getMonth(), time.getMonth()) && instance.checkMatch(job.getDay(), time.getDay())) {
				job.run(time);
			}
		});
	};
	
	this.add = function add(cronjob) {
		_cronjobs.push(cronjob);
		
		if(_offlineCheck) {
			this.checkOfflineRun(cronjob);
		}
	};
	
	this.checkMatch = function checkMatch(a, b) {
		var index	= 0;
		var length	= a.length;
		
		for(; index < length; ++index) {
			var c = a[index];
			
			if(c[0] === -1 || (b >= c[0] && b <= c[1])) {
				var b0 = b - c[0]; // make the modulo start from 1st miniture of from matched time, not first minute of from 0 minutes
				//WHAT THE FUCK IS b0 ?!?!?!?!?! BULLSHIT ..|..
				
				if(c[2] === -1 || b === 0 || b % c[2] === 0) {
					return true;
				}
			}
		}
		
		return  false;
	};
	
	this.parse = function parse(entry) {
		return entry.split(',').map(function ParseEntryEach(index) {
			var z = index.split('/');
			var x = z[0].split('-');

			if(x[0] == '*') {
				x[0] = -1;
			}
			
			if(x.length == 1) {
				x.push(x[0]);
			}

			x[2] = z.length === 1 ? -1 : z[1];
			x[0] = parseInt(x[0], 10); // 0 - from
			x[1] = parseInt(x[1], 10); // 1 - to
			x[2] = parseInt(x[2], 10); // 2 modulus 

			return x;
		});
	};
	
	this.saveData = function saveData() {
		_cronjobs.each(function CronjobsEach(cron) {
			cron.save();
		});
	};
	
	this.onShutdown = function onShutdown() {
		_cronjobs.each(function CronjobsEach(cron) {
			cron.onShutdown();
		});
		
		if(_watcher != undefined) {
			clearInterval(_watcher);
		}
	};
	
	this.toString = function toString() {
		return '[KFramework Cron]';
	};
	
	this.init();
}());

function Cronjob(name, cycle, callback) {
	this.javaClassName = 'Cronjob';	
	var _name		= '';
	var _cycle		= '* * * * *';
	var _cycle_data	= [];
	var _is_running	= false;
	var _callback	= function(time) { /* Override Me */ };
	var _last_run	= undefined;
	var _last_check = undefined;
	var _time_data	= {
		minute:	'*',
		hour:	'*',
		date:	'*',
		month:	'*',
		day:	'*'
	};
		
	function Cronjob(instance, name, cycle, callback) {
		_name			= name;
		_callback		= callback;
		
		instance.changeCycle(cycle);
		
		if(DB == undefined) {
			var _crondb		= KnuddelsServer.getPersistence().getObject('_cron_' + _name, {run:0, check:0});
		} else {
			var _crondb		= DB.load('_cron_' + _name, {run:0, check:0});
		}
		
		_last_run		= new Date(parseInt(_crondb.run, 10));
		_last_check		= new Date(parseInt(_crondb.check, 10));
		
		Cron.add(instance);
		instance.start();
	}
	
	this.changeCycle = function changeCycle(cycle) {
		_cycle			= cycle;
		_cycle_data		= _cycle.match(/^([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s+([0-9,\-\/]+|\*{1}|\*{1}\/[0-9]+)\s*$/);
		_time_data		= {
			minute:	Cron.parse(_cycle_data[1]),
			hour:	Cron.parse(_cycle_data[2]),
			date:	Cron.parse(_cycle_data[3]),
			month:	Cron.parse(_cycle_data[4]),
			day:	Cron.parse(_cycle_data[5])			
		};
	};
	
	this.getLastRun = function getLastRun() {
		return _last_run.getTime();
	};
	
	this.getName = function getName() {
		return _name;
	};
	
	this.getLastCheck = function getLastCheck() {
		return _last_check.getTime();
	};
	
	this.setLastCheck = function setLastCheck(time) {
		_last_check = time;
	};
	
	this.isRunning = function isRunning() {
		return _is_running;
	};
	
	this.start = function start() {
		_is_running	= true;
	};
	
	this.stop = function stop() {
		_is_running	= false;
	};
	
	this.run = function run(time) {
		_last_check	= time;
		_last_run	= time;
		_callback(time);
	};
	
	this.getMinutes = function getMinutes() {
		return _time_data.minute;
	};

	this.getHours = function getHours() {
		return _time_data.hour;
	};

	this.getDate = function getDate() {
		return _time_data.date;
	};
	
	this.getMonth = function getMonth() {
		return _time_data.month;
	};
	
	this.getDay = function getDay() {
		return _time_data.day;
	};
	
	this.save = function save() {
		if(DB == undefined) {
			KnuddelsServer.getPersistence().setObject('_cron_' + _name, {
				run:	this.getLastRun(),
				check:	this.getLastCheck()
			});
			return;
		}
		
		DB.save('_cron_' + _name, {
			run:	this.getLastRun(),
			check:	this.getLastCheck()
		});
	};
	
	this.onShutdown = function onShutdown() {
		this.stop();
		this.save();
	};
	
	this.toString = function toString() {
		return '[KFramework Cronjob]';
	};
	
	Cronjob(this, name, cycle, callback);
}
