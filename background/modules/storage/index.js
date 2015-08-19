var $ = require('jquery');

//todo: storage переделать в tokenStorage
//todo: setToken, getToken, removeToken
//todo: тогда можно использовать его в api и где угодно

var storage = {
  getItem: function (key) {
    var deferred = $.Deferred();

    chrome.storage.sync.get(key, function (items) {
      deferred.resolve(items[key]);
    });

    return deferred.promise();
  },

  setItem: function (key, value) {
    var deferred = $.Deferred();

    var data = {};
    data[key] = value;

    chrome.storage.sync.set(data, function () {
      deferred.resolve(value);
    });

    return deferred.promise();
  },

  removeItem: function (key) {
    var deferred = $.Deferred();

    chrome.storage.sync.remove(key, function () {
      deferred.resolve();
    });

    return deferred.promise();
  }
};
module.exports = storage;
