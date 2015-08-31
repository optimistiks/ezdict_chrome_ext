popupApp = {};
popupApp.showLoginView = function () {
    window.location.href = '/popup/login.html';
};
popupApp.showMainView = function () {
    window.location.href = '/popup/main.html';
};

chrome.runtime.getBackgroundPage(function (bg) {
    $(document).ready(function () {
        $('#content').text(chrome.i18n.getMessage('loadingMessage'));
        bg.app.getUserInfo()
            .done(function () {
                popupApp.showMainView()
            })
            .fail(function () {
                popupApp.showLoginView();
            });
    })
});
