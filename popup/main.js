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
    bg.bgApp.checkLogin().done(function (userInfo) {
      var html = Handlebars.templates.main({
        userInfo: userInfo
      });
      $('#content').html(html);
      init(bg);
    }).fail(function () {
      window.location.href = '/popup/login.html';
    });
  })
});
