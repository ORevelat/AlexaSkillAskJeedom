
const index = require('./index');

var callback = function(e, m) {
    if (e)
        console.log('e => ' + JSON.stringify(e));
    if (m)
        console.log('m => ' + JSON.stringify(m));
}

let event = {
    request: {
        "intent": { 
            "name": "volet",
             "slots": { 
                 "action": { 
                     "name": "action", 
                     "value": "ouvre le", 
                     "resolutions": { 
                         "resolutionsPerAuthority": [ 
                             { 
                                "values": [ 
                                    { 
                                        "value": { 
                                            "name": "open", 
                                        } 
                                    } 
                                ] 
                            } 
                        ] 
                    }, 
                }, 
                "place": { 
                    "name": "place", 
                    "value": "du salon", 
                    "resolutions": { 
                        "resolutionsPerAuthority": [
                             { 
                                "values": [ 
                                    { 
                                        "value": { 
                                            "name": "salon", 
                                        } 
                                    } 
                                ] 
                            } 
                        ] 
                    }, 
                } 
            } 
        }
    }
};

let context = {};

index.handler(event, context, callback);

