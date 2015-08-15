var api = require('ezdict-api-client');

var storage = require('../storage');
api.setStorage(storage);

var locale = require('../locale');
api.setLocale(locale);

module.exports = api;
