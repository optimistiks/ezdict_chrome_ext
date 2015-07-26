$(document).on('mouseup', function (e) {
  if ($(e.target).closest(tooltip.rootElem).length > 0) {
    return true;
  }
  var selection = window.getSelection();
  var text = selection.toString().replace(/^\s+|\s+$/g, '');
  if (text && text.length > 1) {
    console.log(text);
    chrome.runtime.sendMessage({text: text});
    tooltip.showTooltip();
  } else {
    tooltip.hideTooltip();
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.translation) {
      tooltip.setTranslation(request.translation);
    }
    if (request.translationError) {
      tooltip.setTranslation(request.translationError.join(','));
    }
    if (request.loginRequired) {
      tooltip.setTranslation('Пожалуйста, войдите в систему или зарегистрируйтесь.');
    }
  });
