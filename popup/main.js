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
    init(bg);
  })
});
