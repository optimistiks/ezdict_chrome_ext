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
