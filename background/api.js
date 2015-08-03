var api = {
  URL: 'http://127.0.0.1:9000',
  locale: 'en'
};

api.setLocale = function (locale) {
  this.locale = locale;
};

api.addLocaleHeader = function (ajaxParams) {
  ajaxParams.headers = ajaxParams.headers || {};
  ajaxParams.headers['Accept-Language'] = this.locale;
};

api.buildUrl = function (path) {
  return this.URL + path + '/';
};

api.sendRequest = function (ajaxParams) {
  this.addLocaleHeader(ajaxParams);
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
  this.getToken().always(function (token) {
    ajaxParams.headers = ajaxParams.headers || {};
    ajaxParams.headers['Authorization'] = 'Token ' + token;
    this.addLocaleHeader(ajaxParams);
    $.ajax(ajaxParams)
      .done(function (data, textStatus, jqXHR) {
        deferred.resolve(data, textStatus, jqXHR);
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        console.error('Signed request failed', arguments);
        deferred.reject(jqXHR, textStatus, errorThrown);
      });
  }.bind(this));
  return deferred.promise();
};

/**
 * retrieves the token from the storage
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
 * @param token
 * @returns {*}
 */
api.saveToken = function (token) {
  var deferred = $.Deferred();
  // Save token using the Chrome extension storage API.
  chrome.storage.sync.set({'auth_token': token}, function () {
    deferred.resolve(token);
  });
  return deferred.promise();
};

/**
 * remove the token from the storage
 * @returns {*}
 */
api.removeToken = function () {
  var deferred = $.Deferred();

  chrome.storage.sync.remove('auth_token', function () {
    deferred.resolve();
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
      api.saveToken(response.auth_token).done(function () {
        deferred.resolve(response);
      });
    }
  }).fail(function (jqXHR, textStatus, errorThrown) {
    deferred.reject(jqXHR, textStatus, errorThrown);
  });

  return deferred.promise();
};

api.login = function (formData) {
  var deferred = $.Deferred();

  this.sendRequest({
    url: this.buildUrl('/user/login'),
    type: 'POST',
    data: formData
  }).done(function (response) {
    api.saveToken(response.auth_token).done(function () {
      deferred.resolve(response);
    });
  }).fail(function (jqXHR, textStatus, errorThrown) {
    deferred.reject(jqXHR, textStatus, errorThrown);
  });

  return deferred.promise();
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
    this.removeToken().done(function () {
      deferred.resolve();
    })
  }.bind(this));

  return deferred.promise();
};

/**
 * call the translate endpoint
 * @param string
 * @returns {*}
 */
api.translate = function (string) {
  return this.sendSignedRequest({
    url: this.buildUrl('/translation'),
    type: 'GET',
    data: {string: string}
  });
};

api.getUserInfo = function () {
  return this.sendSignedRequest({
    url: this.buildUrl('/user/me'),
    type: 'GET'
  });
};
