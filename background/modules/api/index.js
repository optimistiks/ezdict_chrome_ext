var api = require('ezdict-api-client');

var config = require('../../../config');
api.config.setHost(config.apiHost);
api.config.setProtocol(config.apiProtocol);

var storage = require('../storage');
api.config.setStorage(storage);

var locale = require('../locale');
api.config.setLocale(locale);

module.exports = api;
