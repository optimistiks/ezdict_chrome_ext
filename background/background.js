var sendMessageToActiveTab = function (payload) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
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
    console.log('option get', option, items);
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
    console.log('option set', option, arguments);
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
    .done(function (userInfo) {
      deferred.resolve(userInfo);
    })
    .fail(function (jqXHR) {
      if (jqXHR.status === 401) {
        deferred.reject();
      } else {
        deferred.reject();
        console.error('Check login error', arguments);
      }
    });
  return deferred.promise();
};

bgApp.register = function (formData) {
  return api.register(formData);
};

bgApp.logout = function () {
  return api.logout();
};

bgApp.login = function (formData) {
  return api.login(formData);
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.text) {
      api.translate(request.text)
        .done(function (translateResponse) {
          sendMessageToActiveTab({translation: translateResponse});
        })
        .fail(function (jqXHR) {
          if (jqXHR.status === 401) {
            sendMessageToActiveTab({loginRequired: true});
          }
          if (jqXHR.responseJSON.string) {
            sendMessageToActiveTab({translationError: jqXHR.responseJSON.string});
          }
        });
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
