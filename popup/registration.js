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
    init(bg);
  })
});
