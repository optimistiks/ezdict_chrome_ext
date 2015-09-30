var login = {
    bg: null,
    lastFormData: {}
};

login.setBackgroundPage = function (bg) {

    this.bg = bg;

};

login.init = function () {

    var login = this;

    //todo: странный баг с не-отправкой формы в расширении с полем пароль в некоторых браузерах
    $('#login_button').on('click', function () {
        $('#login_form').trigger('submit');
    });

    $('#login_form').on('submit', function (e) {

        e.preventDefault();

        var form = $(this).serializeArray();
        login.lastFormData = {};

        form.forEach(function (field) {
            login.lastFormData[field.name] = field.value;
        });

        login.bg.app.login(form).then(function () {
            window.location.href = '/popup/router.html';
        }).catch(function (exception) {

        });

    });
};

chrome.runtime.getBackgroundPage(function (bg) {

    login.setBackgroundPage(bg);

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            if (request.errors) {

                var html = Handlebars.templates.login({
                    errors: request.errors,
                    form: login.lastFormData
                });
                $('#content').html(html);
                login.init();

            }

        }
    );

    $(document).ready(function () {

        var html = Handlebars.templates.login();
        $('#content').html(html);
        login.init();

    })
});
