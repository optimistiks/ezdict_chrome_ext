var api = {
  URL: 'http://api.ezdict.potapovmax.com'
};

api.buildUrl = function (path) {
  return this.URL + path + '/';
};

api.sendRequest = function (ajaxParams) {
  return $.ajax(ajaxParams).fail(function () {
    console.error('Request failed', arguments);
  });
};

/**
 * get the token and add the Authorization header to request
 * @param ajaxParams
 * @returns {*}
 */
api.sendSignedRequest = function (ajaxParams) {
  var deferred = $.Deferred();
  this.getToken().done(function (token) {
    ajaxParams.headers = ajaxParams.headers || {};
    ajaxParams.headers['Authorization'] = 'Token ' + token;
    $.ajax(ajaxParams)
      .done(function (data, textStatus, jqXHR) {
        deferred.resolve(data, textStatus, jqXHR);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Signed request failed', arguments);
        deferred.reject(jqXHR, textStatus, errorThrown);
      });
  });
  return deferred.promise();
};

/**
 * retrieves the token from Chrome sync storage
 * @returns {*}
 */
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

/**
 * call the register api endpoint and save the token if it's present in the response
 * @param formData
 * @returns {*}
 */
api.register = function (formData) {
  var deferred = $.Deferred();
  this.sendRequest({
    url: this.buildUrl('/user/register'),
    type: 'POST',
    data: formData
  }).done(function (response) {
    if (!response.auth_token) {
      console.warn('Login after registration seems to be off');
      deferred.resolve(response);
    } else {
      // Save token using the Chrome extension storage API.
      chrome.storage.sync.set({'auth_token': response.auth_token}, function () {
        deferred.resolve(response);
      });
    }
  });
  return deferred.promise();
};

api.login = function () {
};

/**
 * call the logout endpoint and remove the token from Chrome sync storage
 * @returns {*}
 */
api.logout = function () {
  var deferred = $.Deferred();
  this.sendSignedRequest({
    url: this.buildUrl('/user/logout'),
    type: 'POST'
  }).done(function () {
    chrome.storage.sync.remove('auth_token', function () {
      deferred.resolve();
    });
  });

  return deferred.promise();
};

/**
 * call the translate endpoint
 * @param string
 * @returns {*}
 */
api.translate = function (string) {
  var deferred = $.Deferred();

  this.sendSignedRequest({
    url: this.buildUrl('/translation'),
    type: 'GET',
    data: {string: string}
  }).done(function (translation) {
    deferred.resolve(translation);
  });

  return deferred.promise();
};
