chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.text) {
      alert('sending ajax request to /translate');
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {translation: 'translation'});
      });
    }
  });
