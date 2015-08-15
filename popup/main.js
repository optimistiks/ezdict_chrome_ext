var init = function (bg) {

  // изменение настроек расширения
  $('.js-extension').on('change', function (e) {
    var settings = $(this).closest('form').find('.js-extension').serializeArray();
    settings.forEach(function (setting) {
      bg.app.setOption(setting.name, setting.value);
    });
  });

  // изменение настроек профиля пользователя
  $('.js-global').on('change', function (e) {
    var settings = $(this).closest('form').find('.js-global').serializeArray();
    var profileParams = {};
    settings.forEach(function (setting) {
      profileParams[setting.name] = setting.value;
    });
    bg.app.updateProfile(profileParams);
  });

  $('#logout').on('click', function (e) {
    e.preventDefault();
    bg.app.logout().done(function () {
      window.location.href = '/popup/router.html';
    });
  });
};

var render = function (bg) {
  var langsDef = bg.app.getLanguages();
  var userInfoDef = bg.app.getUserInfo();
  var isOffDef = bg.app.getOption('is_off');
  var isOffShortcutDef = bg.app.getOptionShortcut('is_off');

  var userProfileDef = $.Deferred();
  bg.app.getProfile().then(function (profile) {
    userProfileDef.resolve(profile)
  });

  $.when(userInfoDef, isOffDef, isOffShortcutDef, langsDef, userProfileDef)
    .done(function (userInfo, isOff, isOffShortcut, languages, userProfile) {
      var html = Handlebars.templates.main({
        isOff: isOff,
        isOffShortcut: isOffShortcut,
        userInfo: userInfo,
        languages: languages,
        userProfile: userProfile
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
