var init = function (bg) {
  $('input, select').on('change', function (e) {
    var settings = $(this).closest('form').serializeArray();
    settings.forEach(function (setting) {
      bg.app.setOption(setting.name, setting.value);
    });
  });
  $('#logout').on('click', function (e) {
    e.preventDefault();
    bg.app.logout().done(function () {
      window.location.href = '/popup/router.html';
    });
  });
};

var render = function (bg) {
  var langsDef = bg.app.getLangs();
  var userInfoDef = bg.app.getUserInfo();
  var isOffDef = bg.app.getOption('is_off');
  var isOffShortcutDef = bg.app.getOptionShortcut('is_off');
  var targetLangDef = bg.app.getOption('target_lang');

  $.when(userInfoDef, isOffDef, isOffShortcutDef, langsDef, targetLangDef)
    .done(function (userInfo, isOff, isOffShortcut, langs, targetLang) {
      var html = Handlebars.templates.main({
        isOff: isOff,
        isOffShortcut: isOffShortcut,
        userInfo: userInfo,
        langs: langs,
        targetLang: targetLang
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
