var api = require('ezdict-api-client');

api.setProtocol('http');
api.setHost('127.0.0.1:9000');

var storage = require('../storage');
api.setStorage(storage);

var locale = require('../locale');
api.setLocale(locale);

module.exports = api;
