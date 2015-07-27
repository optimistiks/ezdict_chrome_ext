var init = function (bg) {
  $('#login_form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this).serializeArray();
    bg.bgApp.login(form).done(function () {
      window.location.href = '/popup/router.html';
    });
  });

};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    var html = Handlebars.templates.login({
      usernamePlaceholder: chrome.i18n.getMessage('usernamePlaceholder'),
      passwordPlaceholder: chrome.i18n.getMessage('passwordPlaceholder'),
      loginButtonText: chrome.i18n.getMessage('loginButtonText'),
      registrationLinkText: chrome.i18n.getMessage('registrationLinkText')
    });
    $('body').html(html);
    init(bg);
  })
});
