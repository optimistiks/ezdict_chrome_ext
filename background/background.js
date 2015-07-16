var sendMessageToActiveTab = function (payload) {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
};

bgApp = {};

bgApp.checkLogin = function () {
  var deferred = $.Deferred();
  api.getUserInfo()
    .done(function () {
      deferred.resolve();
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
        .done(function (translation) {
          sendMessageToActiveTab({translation: translation});
        })
        .fail(function (jqXHR) {
          if (jqXHR.status === 401) {
            sendMessageToActiveTab({loginRequired: true});
          }
        });
    }
  });
