var $ = require('jquery');
app = require('./modules/app');

var sendMessageToActiveTab = require('./modules/sendMessageToActiveTab');

var textMessageCallback = function (text) {
  app.translate(text)
    .then(function (translateResponse) {
      sendMessageToActiveTab({translation: translateResponse});
    })
    .catch(function (exception) {
      if (exception.statusCode === 401) {
        sendMessageToActiveTab({loginRequired: true});
      }
      if (exception.error && exception.error.string) {
        sendMessageToActiveTab({translationError: exception.error.string});
      }
    });
};


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.text) {
      textMessageCallback(request.text);
    }
    if (request.addToLearning) {
      app.createWordLearning(request.addToLearning).catch(function (e) {
      })
    }
    if (request.getOption) {
      app.getOption(request.getOption).done(function (option) {
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
    app.getOption('is_off').done(function (isOff) {
      app.setOption('is_off', !isOff).done(function () {
        chrome.runtime.sendMessage({
          commandToggle: true
        });
      });
    })
  }
});
