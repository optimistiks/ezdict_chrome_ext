var sendMessageToActiveTab = function (payload) {
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, payload);
  });
};

bgApp = {};

bgApp.checkLogin = function () {
  var deferred = $.Deferred();
  api.getToken()
    .done(function (token) {
      deferred.resolve();
    }).fail(function () {
      deferred.reject();
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
      api.translate(request.text).done(function (translation) {
        sendMessageToActiveTab({translation: translation});
      });
    }
  });
