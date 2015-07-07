popupApp = {};
popupApp.showLoginView = function () {
  window.location.href = '/popup/login.html';
};
popupApp.showMainView = function () {
  window.location.href = '/popup/main.html';
};

chrome.runtime.getBackgroundPage(function (bg) {
  $(document).ready(function () {
    bg.bgApp.checkLogin()
      .done(function () {
        popupApp.showMainView()
      })
      .fail(function () {
        popupApp.showLoginView();
      });
  })
});
