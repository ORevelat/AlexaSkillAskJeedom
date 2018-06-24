'use strict';

/* 
    ===========================
    === rename to config.js ===
    ===========================
*/

module.exports = {
    jeedom: {
        port: 443,
        host: '192.168.0.1',
        path: '/core/api/jeeApi.php',
        apikey: 'your-jeedom-api-key',    
    },
    cmds:[
		{
			type: 'cuisine',
			cmd: {
				'open': 100,
				'close': 101,
				'stop': 102,
				'pos': 103, /* not used for now */
			}
		},
    ]
};
