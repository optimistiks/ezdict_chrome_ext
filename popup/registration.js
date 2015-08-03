var registration = {
  bg: null,
  lastFormData: {}
};

registration.setBackgroundPage = function (bg) {
  this.bg = bg;
};

registration.init = function () {
  var reg = this;
  $('#registration_form').on('submit', function (e) {
    e.preventDefault();
    var form = $(this).serializeArray();
    reg.lastFormData = {};
    form.forEach(function (field) {
      reg.lastFormData[field.name] = field.value;
    });
    reg.bg.bgApp.register(form).done(function () {
      window.location.href = '/popup/router.html';
    });
  });
};

chrome.runtime.getBackgroundPage(function (bg) {
  registration.setBackgroundPage(bg);

  chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
      if (request.errors) {
        var html = Handlebars.templates.registration({
          errors: request.errors,
          form: registration.lastFormData
        });
        $('#content').html(html);
        registration.init();
      }
    }
  );
  $(document).ready(function () {
    var html = Handlebars.templates.registration();
    $('#content').html(html);
    registration.init();
  })
});
