var currentText = null;

$(document).on('mouseup', function (e) {
  if ($(e.target).closest(tooltip.rootElem).length > 0) {
    return false;
  }
  chrome.runtime.sendMessage({getOption: 'is_off'});
});

xtag.addEvent(window, 'ezdict-tooltip-element_add-to-learning', function () {
  chrome.runtime.sendMessage({addToLearning: currentText});
});

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
    if (request.option && request.name === 'is_off' && !request.value) {
      if (request.value) {
        return false;
      }
      var selection = window.getSelection();
      var text = selection.toString().replace(/^\s+|\s+$/g, '');
      if (text && text.length > 1) {
        currentText = text;
        console.log(text);
        chrome.runtime.sendMessage({text: text});
        tooltip.showTooltip();
      } else {
        currentText = null;
        tooltip.hideTooltip();
      }
    }
  });
