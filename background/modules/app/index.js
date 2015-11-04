//@todo: избавиться от Deferred

var $ = require('jquery');
var api = require('../api');
var sendMessageToActiveTab = require('../sendMessageToActiveTab');

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

var app = {
    api: api
};

/**
 * retrieves the option from the storage
 * @returns {*}
 */
app.getOption = function (option) {
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
app.setOption = function (name, value) {
    var deferred = $.Deferred();

    var option = {};
    option[name] = value;

    chrome.storage.sync.set(option, function () {
        console.log('setOption', option);
        deferred.resolve();
    });

    deferred.done(function () {
        sendMessageToActiveTab({
            option: true,
            name: name,
            value: value
        });
    });

    return deferred.promise();
};

app.getOptionShortcut = function (option) {
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

app.getUserInfo = function () {
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

app.getProfile = function () {
    return api.getProfile();
};

app.updateProfile = function (params) {
    return api.updateProfile(params);
};

app.getLanguages = function () {

    var def = $.Deferred();

    chrome.storage.sync.get('bing_langs', function (items) {
        if (items.bing_langs) {
            def.resolve(items.bing_langs);
        } else {
            api.getLanguages().then(function (langs) {
                chrome.storage.sync.set({bing_langs: langs}, function () {
                    def.resolve(langs);
                });
            }).catch(function () {
                def.reject();
            })
        }
    });

    return def.promise();

};

app.processFormData = function (formData) {
    return formData.reduce(function (obj, formField) {
        obj[formField.name] = formField.value;
        return obj;
    }, {});
};

app.register = function (formData) {
    return api.register(this.processFormData(formData)).catch(requestFailCallback);
};

app.logout = function () {
    return api.logout();
};

app.login = function (formData) {
    return api.login(this.processFormData(formData)).catch(requestFailCallback);
};

app.translate = function (word) {
    return this.getProfile().then(function (profile) {
        return api.translate(word, profile.target_lang)
    });
};

app.addToLearning = function (card) {
    return api.toStudy.post({card: card.id})
};

module.exports = app;
