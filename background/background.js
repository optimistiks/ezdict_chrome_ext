var api = require('ezdict-api-client');
//api.setProtocol('http');
//api.setHost('127.0.0.1:9000');

var storage = {
  getItem: function (key) {
    var deferred = $.Deferred();

    chrome.storage.sync.get(key, function (items) {
      if (items.auth_token) {
        deferred.resolve(items.auth_token);
      } else {
        deferred.reject();
      }
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
api.setStorage(storage);


var sendMessageToActiveTab = function (payload) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
};

var textMessageCallback = function (text) {
  api.translate(text)
    .then(function (translateResponse) {
      sendMessageToActiveTab({translation: translateResponse});
    })
    .catch(function (exception) {
      if (exception.statusCode === 401) {
        sendMessageToActiveTab({loginRequired: true});
      }
      if (exception.error.string) {
        sendMessageToActiveTab({translationError: jqXHR.responseJSON.string});
      }
    });
};

var requestFailCallback = function (exception) {
  var response = exception.error;
  var errors = [];
  Object.keys(response).forEach(function (key) {
    if (typeof response[key] === 'string') {
      errors.push(response[key]);
    }
    if (response[key].length) {
      response[key].forEach(function (error) {
        errors.push(error);
      })
    }
  });
  sendMessageToActiveTab({errors: errors});
  chrome.runtime.sendMessage({errors: errors});
  throw exception;
};

var locale = chrome.i18n.getMessage('@@ui_locale');
api.setLocale(locale.split('_')[0]);

bgApp = {};

/**
 * retrieves the option from the storage
 * @returns {*}
 */
bgApp.getOption = function (option) {
  var deferred = $.Deferred();

  chrome.storage.sync.get(option, function (items) {
    deferred.resolve(items[option]);
  });

  return deferred.promise();
};

/**
 * sets the option to the storage
 * @returns {*}
 */
bgApp.setOption = function (name, value) {
  var deferred = $.Deferred();

  var option = {};
  option[name] = value;

  chrome.storage.sync.set(option, function () {
    deferred.resolve();
  });

  return deferred.promise();
};

bgApp.getOptionShortcut = function (option) {
  var deferred = $.Deferred();
  var commandName = 'command_' + option;

  chrome.commands.getAll(function (commands) {
    commands.forEach(function (command) {
      if (command.name === commandName) {
        deferred.resolve(command.shortcut);
      }
    });
  });

  return deferred.promise();
};

bgApp.getUserInfo = function () {
  var deferred = $.Deferred();
  api.getUserInfo()
    .then(function (userInfo) {
      deferred.resolve(userInfo);
    })
    .catch(function (exception) {
      if (exception.statusCode === 401) {
        deferred.reject();
      } else {
        deferred.reject();
        console.error('Check login error', arguments);
      }
    });
  return deferred.promise();
};

bgApp.processFormData = function (formData) {
  return formData.reduce(function (obj, formField) {
    obj[formField.name] = formField.value;
    return obj;
  }, {});
};

bgApp.register = function (formData) {
  return api.register(this.processFormData(formData)).catch(requestFailCallback);
};

bgApp.logout = function () {
  return api.logout();
};

bgApp.login = function (formData) {
  return api.login(this.processFormData(formData)).catch(requestFailCallback);
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.text) {
      textMessageCallback(request.text);
    }
    if (request.getOption) {
      bgApp.getOption(request.getOption).done(function (option) {
        sendMessageToActiveTab({
          option: true,
          name: request.getOption,
          value: option
        });
      })
    }
  });

chrome.commands.onCommand.addListener(function (command) {
  if (command === 'command_is_off') {
    bgApp.getOption('is_off').done(function (isOff) {
      bgApp.setOption('is_off', !isOff).done(function () {
        chrome.runtime.sendMessage({
          commandToggle: true
        });
      });
    })
  }
});
