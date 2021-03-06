var registration = {
    bg: null,
    lastFormData: {}
};

registration.setBackgroundPage = function (bg) {
    this.bg = bg;
};

registration.init = function () {

    var reg = this;

    //todo: странный баг с не-отправкой формы в расширении с полем пароль в некоторых браузерах
    $('#registration_button').on('click', function () {
        $('#registration_form').trigger('submit');
    });

    $('#registration_form').on('submit', function (e) {

        e.preventDefault();

        var form = $(this).serializeArray();
        reg.lastFormData = {};

        form.forEach(function (field) {
            reg.lastFormData[field.name] = field.value;
        });

        reg.bg.app.register(form).then(function () {
            window.location.href = '/popup/router.html';
        }).catch(function (exception) {

        });
    });

};

chrome.runtime.getBackgroundPage(function (bg) {

    registration.setBackgroundPage(bg);

    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            if (request.errors) {

                var html = Handlebars.templates.registration({
                    errors: request.errors,
                    form: registration.lastFormData
                });
                $('#content').html(html);
                registration.init();

            }
        }
    );

    $(document).ready(function () {

        var html = Handlebars.templates.registration();
        $('#content').html(html);
        registration.init();

    })
});
