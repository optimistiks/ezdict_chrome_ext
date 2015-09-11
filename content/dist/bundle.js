(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "apiProtocol": "http",
  "apiHost": "api.ezdict.potapovmax.com",
  "webAppProtocol": "http",
  "webAppHost": "ezdict.potapovmax.com"
}
},{}],2:[function(require,module,exports){
var common = require('./common.json');

try {
    var local = require('./local.json');
    Object.keys(local).forEach(function (key) {
        common[key] = local[key];
    })
} catch (e) {
}

module.exports = common;

},{"./common.json":1,"./local.json":undefined}],3:[function(require,module,exports){
var tooltip = require('./modules/tooltip');

var app = {
  currentText: null,
  isOff: true
};

/**
 * sends request to background to retrieve "is_off" setting value
 * binds handler to mouseup which runs a translation process
 */
app.init = function () {
  chrome.runtime.sendMessage({getOption: 'is_off'});

  $(document).on('mouseup', function (e) {
    if ($(e.target).closest(tooltip.rootElem).length > 0) {
      return false;
    }
    if (this.isOff) {
      tooltip.hideTooltip();
      return false;
    }
    this.translate();
  }.bind(this));
};

/**
 * get currently selected text, process it,
 * send to background page, show or hide tooltip
 */
app.translate = function () {
  var selection = window.getSelection();
  var text = selection.toString().replace(/^\s+|\s+$/g, '');
  if (text && text.length > 1) {
    this.currentText = text;
    console.log(text);
    chrome.runtime.sendMessage({text: text});
    tooltip.showTooltip();
  } else {
    this.currentText = null;
    tooltip.hideTooltip();
  }
};

app.init();

/**
 * bind to various messages coming from background page
 * @todo: better to move to some component, which handles such events
 * @todo: smth like message.on(type, handler);
 */
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.translation) {
      tooltip.setTranslation(request.translation);
    }
    if (request.translationError) {
      tooltip.setError(request.translationError.join(','));
    }
    if (request.loginRequired) {
      tooltip.setError(chrome.i18n.getMessage('loginError'));
    }
    if (request.option && request.name === 'is_off') {
      app.isOff = request.value;
    }
  });

},{"./modules/tooltip":4}],4:[function(require,module,exports){
(function (global){
var webAppHelper = require('../webapp-helper');

var tooltip = {
    rootElem: null
};

tooltip.createTooltip = function () {
    var deferred = new $.Deferred();
    //todo: get locale from module (/modules)
    var locale = chrome.i18n.getMessage('@@ui_locale');
    var pathPrefix = chrome.extension.getURL('bower_components/ezdict-tooltip-element');

    global.ezdictTooltipElement.setPathPrefix(pathPrefix);
    global.ezdictTooltipElement.setLocale(locale.split('_')[0]);
    global.ezdictTooltipElement.register();

    global.xtag.addEvent(window, 'ezdict-tooltip-element_inserted', function () {
        this.rootElem = document.querySelector('ezdict-tooltip-element');
        this.rootElem.setJquery($).init();
        deferred.resolve(this.rootElem);
    }.bind(this));

    document.body.appendChild(document.createElement('ezdict-tooltip-element'));

    return deferred.promise();
};

tooltip.ready = function (callback) {
    if (!this.rootElem) {
        this.createTooltip().done(function () {
            callback.apply(this);
        }.bind(this));
    } else {
        callback.apply(this);
    }
};

tooltip.showTooltip = function () {
    this.ready(function () {
        this.rootElem.show();
        this.rootElem.setStateLoading(true);
        this.rootElem.redraw();
        this.updateTooltipPosition();
    }.bind(this));
};

tooltip.hideTooltip = function () {
    if (!this.rootElem) {
        return false;
    }
    this.rootElem.hide();
};

tooltip.setTranslation = function (translation) {
    this.ready(function () {
        var slug = translation.card ? translation.card.id : translation.translation_history.string;
        this.rootElem.setStateTranslation(translation);
        this.rootElem.setCardUrl(webAppHelper.getCardUrl(slug));
        this.rootElem.redraw();
        this.updateTooltipPosition();
    }.bind(this));
};

tooltip.setError = function (error) {
    this.ready(function () {
        this.rootElem.setStateError(error);
        this.rootElem.redraw();
        this.updateTooltipPosition();
    }.bind(this));
};

tooltip.updateTooltipPosition = function () {
    var selection = window.getSelection();
    var range = selection.getRangeAt(0); //get the text range
    var rect = range.getBoundingClientRect();
    var top = window.pageYOffset + rect.top - (this.rootElem.getHeight() + 40);
    var left = rect.left + rect.width / 2 - this.rootElem.getWidth() / 2;
    this.rootElem.setTop(top);
    this.rootElem.setLeft(left);
};

module.exports = tooltip;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../webapp-helper":5}],5:[function(require,module,exports){
var config = require('../../../config');

var helper = {};

helper.getCardUrl = function (slug) {
    return config.webAppProtocol + '://' + config.webAppHost + '#/card/' + slug;
};

module.exports = helper;

},{"../../../config":2}]},{},[3]);
