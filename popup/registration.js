var init = function (bg) {
    $('#registration_form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this).serializeArray();
        bg.bgApp.register(form).done(function () {
            console.log('register and login done');
            // todo: автологин после регистрации на стороне сервера
            // при успешном login редирект на попап
        });
    });

};

chrome.runtime.getBackgroundPage(function (bg) {
    $(document).ready(function () {
        init(bg);
    })
});
