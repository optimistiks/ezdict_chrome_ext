var init = function (bg) {
    $('#registration_form').on('submit', function (e) {
        e.preventDefault();
        var form = $(this).serializeArray();
        bg.bgApp.register(form).done(function (response) {
            console.log('registered, autologin, redir to popup');
            console.log('got response', response);
            // todo: ��������� ����� ����������� �� ������� �������
            // ��� �������� login �������� �� �����
        });
    });

};

chrome.runtime.getBackgroundPage(function (bg) {
    $(document).ready(function () {
        init(bg);
    })
});
