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
  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.errors) {
        var html = Handlebars.templates.login({
          errors: request.errors
        });
        $('#content').html(html);
        init(bg);
      }
    }
  );

  $(document).ready(function () {
    var html = Handlebars.templates.login();
    $('#content').html(html);
    init(bg);
  })
});
