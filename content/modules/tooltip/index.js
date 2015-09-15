var webAppHelper = require('../webapp-helper');

var tooltip = {
    rootElem: null
};

tooltip.createTooltip = function () {
    if (this.rootElem) {
        throw new Error('Can\'t create tooltip, it\'s already created.', this.rootElem);
    }

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