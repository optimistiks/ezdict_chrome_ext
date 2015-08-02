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

bgApp.checkLogin = function () {
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
