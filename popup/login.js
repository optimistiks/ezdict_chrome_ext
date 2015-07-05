var init = function (bg) {
    $('#login_form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this).serializeArray();
        bg.bgApp.login(form).done(function () {
            console.log('logged in, redir to popup');
        });
    });

};

chrome.runtime.getBackgroundPage(function (bg) {
    $(document).ready(function () {
        init(bg);
    })
});
