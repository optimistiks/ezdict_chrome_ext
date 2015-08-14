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
  var langsDef = bg.bgApp.getLangs();
  var userInfoDef = bg.bgApp.getUserInfo();
  var isOffDef = bg.bgApp.getOption('is_off');
  var isOffShortcutDef = bg.bgApp.getOptionShortcut('is_off');

  $.when(userInfoDef, isOffDef, isOffShortcutDef, langsDef)
    .done(function (userInfo, isOff, isOffShortcut, langs) {
      var html = Handlebars.templates.main({
        isOff: isOff,
        isOffShortcut: isOffShortcut,
        userInfo: userInfo,
        langs: langs
      });
      $('#content').html(html);
      init(bg);
    });
};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    $('#content').text(chrome.i18n.getMessage('loadingMessage'));
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
