var getSelectedText = function () {
  var userSelection = window.getSelection();
  return userSelection.toString().replace(/^\s+|\s+$/g, '');
};

document.addEventListener('mouseup', function () {
  var text = getSelectedText();
  if (text && text.length > 1) {
    alert(text);
    chrome.runtime.sendMessage({text: text});
  }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.translation) {
      alert('translation received by content script, showing tooltip now');
    }
  });
