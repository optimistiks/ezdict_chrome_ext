Handlebars.registerHelper('chrome_t', function(key) {
  var result = chrome.i18n.getMessage(key);
  return new Handlebars.SafeString(result);
});
