var config = require('../../../config');

var helper = {};

helper.getCardUrl = function (slug) {
    return config.webAppProtocol + '://' + config.webAppHost + '#/card/' + slug;
};

module.exports = helper;
