var init = function (bg) {
  $('#registration_form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this).serializeArray();
    bg.bgApp.register(form).done(function () {
      window.location.href = '/popup/router.html';
    });
  });

};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    var html = Handlebars.templates.registration({
      usernamePlaceholder: chrome.i18n.getMessage('usernamePlaceholder'),
      emailPlaceholder: chrome.i18n.getMessage('emailPlaceholder'),
      passwordPlaceholder: chrome.i18n.getMessage('passwordPlaceholder'),
      registerButtonText: chrome.i18n.getMessage('registerButtonText'),
      loginLinkText: chrome.i18n.getMessage('loginLinkText')
    });
    $('body').html(html);
    init(bg);
  })
});
