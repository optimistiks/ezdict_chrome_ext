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
  console.log('bgApp.register', 'request to /register, autologin happens, save token to storage');
  return api.register(formData);
};

bgApp.login = function () {
  var deferred = $.Deferred();
  deferred.resolve();
  console.log('bgApp.login', 'request to /login, save token to storage');
  return deferred.promise();
};

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.text) {
      api.translate(request.text).done(function(translation) {
        sendMessageToActiveTab({translation: translation});
      });
    }
  });
