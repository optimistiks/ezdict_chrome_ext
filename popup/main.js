var init = function (bg) {
  $('input').on('change', function (e) {
    var settings = $(this).closest('form').serializeArray();
    settings.forEach(function (setting) {
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

var render = function (bg) {
  var userInfoDef = bg.bgApp.getUserInfo();
  var isOffDef = bg.bgApp.getOption('is_off');
  var isOffShortcutDef = bg.bgApp.getOptionShortcut('is_off');
  $.when(userInfoDef, isOffDef, isOffShortcutDef)
    .done(function (userInfo, isOff, isOffShortcut) {
      var html = Handlebars.templates.main({
        isOff: isOff,
        isOffShortcut: isOffShortcut,
        userInfo: userInfo
      });
      $('#content').html(html);
      init(bg);
    });
};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    render(bg);
  });

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.commandToggle) {
        render(bg);
      }
    }
  );
});
