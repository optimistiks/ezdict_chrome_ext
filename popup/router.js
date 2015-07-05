popupApp = {};
popupApp.showLoginView = function () {
    window.location.href = 'login.html';
};
popupApp.showMainView = function () {
    window.location.href = 'main.html';
};

chrome.runtime.getBackgroundPage(function (bg) {
    $(document).ready(function () {
        if (bg.bgApp.isLoggedIn()) {
            popupApp.showMainView();
        } else {
            popupApp.showLoginView();
        }
    })
});
