'use strict';

const config = require('./config');
const request = require('./request');

exports.handler = (event, context, callback) => {
	if (typeof(event.request) === 'undefined') {
		callback('no request', '');
		return;
	}

	let intent = event.request.intent;
	if (typeof(event.request.intent) === 'undefined') {
		callback('no intent', '');
		return;
	}
	
	handleRequest(intent)
		.then((response) => callback(null, response))
		.catch((err) => {
			callback(null, createResponse(err));
		});
}

function createResponse(text) {
	let response = {
		"version": "1.0",
		"sessionAttributes": {
		},
		"response": {
		  "outputSpeech": {
			"type": "PlainText",
			"text": text
		  },
		  "shouldEndSession": true
		}
	  };

	  return response;
}

function handleRequest(intent) {
	let name = intent.name;

	if (name != "volet")
		return Promise.reject('désolé seul les volets sont supportés'); 

	let action = null;
	let place = null;

	try {
		let actionValue = intent.slots.action.resolutions.resolutionsPerAuthority[0];
		let placeValue = intent.slots.place.resolutions.resolutionsPerAuthority[0];

		if (actionValue.values) {
			action = actionValue.values[0].value.name;
		}
		if (placeValue.values) {
			place = placeValue.values[0].value.name;
		}
	} 
	catch (err) {
		return Promise.reject('désolé je n\'ai pas compris'); 
	}

	if (action == null || place == null) {
		return Promise.reject('désolé je n\'ai pas compris'); 
	}

	return getCommand(place, action)
				.then((c) => doRequest(c, false))
				.then(() => createResponse([ "très bien", "oui", "compris" ][Math.floor(Math.random() * 3)]) );
}

function getCommand(place, action)
{
	let room = config.cmds.find((t) => t.type == place);
	if (room && room.cmd && room.cmd[action])
		return Promise.resolve(room.cmd[action]);
	
	return Promise.reject('désolé le volet ' + place + ' ne prend pas encharge l\'action ' + action); 
}

function doRequest(id, json = true)
{
	return request({
		host: config.jeedom.host,
		port: config.jeedom.port,
		path: config.jeedom.path,
		json
		}, {
		 'apikey': config.jeedom.apikey,
		 'type': 'cmd',
		 'id': id
	});
}

