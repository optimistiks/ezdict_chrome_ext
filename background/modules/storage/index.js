var $ = require('jquery');

var storage = {
    getToken: function () {
        var deferred = $.Deferred();

        chrome.storage.sync.get('auth_token', function (items) {
            deferred.resolve(items[key]);
        });

        return deferred.promise();
    },

    saveToken: function (value) {
        var deferred = $.Deferred();

        var data = {};
        data['auth_token'] = value;

        chrome.storage.sync.set(data, function () {
            deferred.resolve(value);
        });

        return deferred.promise();
    },

    removeToken: function () {
        var deferred = $.Deferred();

        chrome.storage.sync.remove('auth_token', function () {
            deferred.resolve();
        });

        return deferred.promise();
    }
};
module.exports = storage;
