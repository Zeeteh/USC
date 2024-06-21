var VERSION = '1.1.0';

var KFramework = (function KFramework() {
    this.load = [
        /* Tools */
        'tools/Functions',
        'tools/Number',
        'tools/String',
        'tools/Array',
        'tools/Object',
        'tools/User',
        'tools/Dice',
        'tools/StringBuffer',

        /* Core */
        'core/Hash', 
        'core/Hooks',
        'core/Database',
        'core/Logger',
        'core/Cronjob',
        'core/Bot',
        'core/KCode',
        'core/KBank',
        'core/Files',
        'core/Channel',
        'core/User',
        'core/View',
        'core/Toplist',
        'core/AppInfo'
    ];

    for (var entry in this.load) {
        require('./framework/' + this.load[entry] + '.js');
    }

    this.startUp = function startUp() {
        KBank.dataMigration();
    };

    this.store = function store() {
        Cron.saveData();
    };

    this.shutDown = function shutDown() {
        Cron.onShutdown();
    };

    this.toString = function toString() {
        return '[KFramework Core]';
    };

    return this;
})();
