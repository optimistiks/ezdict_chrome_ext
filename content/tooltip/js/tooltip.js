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
    this.setTranslation('loading...');
    this.updateTooltipPosition();
  }.bind(this));
};

tooltip.hideTooltip = function () {
  if (!this.rootElem) {
    return false;
  }
  this.rootElem.hide();
};

tooltip.setTranslation = function (translationResponse) {
  this.ready(function () {
    this.rootElem.setCounter(translationResponse.translation_history.count);
    this.rootElem.setTranslation(translationResponse.translation);
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
