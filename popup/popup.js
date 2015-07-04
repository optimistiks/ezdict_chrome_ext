popupApp = {};
popupApp.showLoginView = function () {
    $.get('login.html').done(function (data) {
        $('#content').html(data);
    });
};
popupApp.showMainView = function () {
    $.get('main.html').done(function (data) {
        var content = $('#content');
        content.html(data);
        content.find('#username').text('some username')
    });
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
