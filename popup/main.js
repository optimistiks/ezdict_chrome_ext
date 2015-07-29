var init = function (bg) {
  $('#logout').on('click', function (e) {
    e.preventDefault();
    bg.bgApp.logout().done(function () {
      window.location.href = '/popup/router.html';
    });
  });
};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    var html = Handlebars.templates.main({
      logoutLinkText: chrome.i18n.getMessage('logoutLinkText')
    });
    $('#content').html(html);
    init(bg);
  })
});
