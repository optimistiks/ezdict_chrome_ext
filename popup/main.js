var init = function (bg) {
  $('input').on('change', function (e) {
    var settings = $(this).closest('form').serializeArray();
    settings.forEach(function(setting) {
      bg.bgApp.setOption(setting.name, setting.value);
    });
  });
  $('#logout').on('click', function (e) {
    e.preventDefault();
    bg.bgApp.logout().done(function () {
      window.location.href = '/popup/router.html';
    });
  });
};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    var userInfoDef = bg.bgApp.getUserInfo();
    var isOffDef = bg.bgApp.getOption('is_off');
    $.when(userInfoDef, isOffDef).done(function (userInfo, isOff) {
      var html = Handlebars.templates.main({
        isOff: isOff,
        userInfo: userInfo
      });
      $('#content').html(html);
      init(bg);
    });
  })
});
