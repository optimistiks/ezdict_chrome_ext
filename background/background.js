var $ = require('jquery');
var app = global.app = require('./modules/app');
var storage = require('./modules/storage');

var sendMessageToActiveTab = require('./modules/sendMessageToActiveTab');

var translate = function (text) {
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
            translate(request.text);
        }
        if (request.addToLearning) {
            app.addToLearning(request.addToLearning)
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

chrome.runtime.onMessageExternal.addListener(
    function (request, sender, sendResponse) {
        if (request.getToken) {
            storage.getToken().then(function (token) {
                sendResponse(token);
            });
            return true;
        }
        if (request.saveToken) {
            storage.saveToken(request.saveToken).then(function (token) {
                sendResponse(token);
            });
            return true;
        }
    });
