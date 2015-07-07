var api = {
  URL: 'http://api.ezdict.potapovmax.com'
};

api.buildUrl = function (path) {
  return this.URL + path + '/';
};

api.sendRequest = function (ajaxParams) {
  return $.ajax(ajaxParams);
};

api.getToken = function () {
  var deferred = $.Deferred();
  chrome.storage.sync.get('auth_token', function (items) {
    if (items.auth_token) {
      deferred.resolve(items.auth_token);
    } else {
      deferred.reject();
    }
  });
  return deferred.promise();
};

api.register = function (formData) {
  var authTokenSaved = $.Deferred();
  var userRegistered = this.sendRequest({
    url: this.buildUrl('/user/register'),
    type: 'POST',
    data: formData
  }).done(function (response) {
    if (!response.auth_token) {
      console.warn('Login after registration seems to be off');
      authTokenSaved.reject();
    } else {
      // Save token using the Chrome extension storage API.
      chrome.storage.sync.set({'auth_token': response.auth_token}, function () {
        authTokenSaved.resolve();
      });
    }
  });
  return $.when(userRegistered, authTokenSaved);
};
api.login = function () {
};
api.logout = function () {
};
api.translate = function () {
};
