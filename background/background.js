var sendMessageToActiveTab = function (payload) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, payload);
    });
};

bgApp = {};
bgApp.isLoggedIn = function () {
    return false;
};

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.text) {
            console.log('sending ajax request to /translate');
            sendMessageToActiveTab({translation: 'translation'});
        }
    });
