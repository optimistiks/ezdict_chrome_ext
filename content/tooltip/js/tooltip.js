var tooltip = {
  rootElem: null
};

tooltip.createTooltip = function () {
  var deferred = new $.Deferred();

  $.get(chrome.extension.getURL('bower_components/ezdict-tooltip-element/html/content.html'), function (content) {
    ezdictTooltipElement.register(content);

    xtag.addEvent(window, 'ezdict-tooltip-element_inserted', function () {
      this.rootElem = document.querySelector('ezdict-tooltip-element');
      this.rootElem.setJquery($).init();
      deferred.resolve(this.rootElem);
    }.bind(this));
    document.body.appendChild(document.createElement('ezdict-tooltip-element'));
  }.bind(this));

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
    this.resetCounter();
    this.setTranslationText(chrome.i18n.getMessage('loadingMessage'));
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
    this.rootElem.setCounter(translation.translation_history.count);
    this.rootElem.setTranslation(translation.translation);
    this.updateTooltipPosition();
  }.bind(this));
};

tooltip.resetCounter = function() {
  this.rootElem.setCounter('-');
};

tooltip.setTranslationText = function(translation) {
  this.rootElem.setTranslation(translation);
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
