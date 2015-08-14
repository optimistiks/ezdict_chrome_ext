Handlebars.registerHelper('chrome_t', function(key) {
  var result = chrome.i18n.getMessage(key);
  return new Handlebars.SafeString(result);
});

(function() {
  function checkCondition(v1, operator, v2) {
    switch(operator) {
      case '==':
        return (v1 == v2);
      case '===':
        return (v1 === v2);
      case '!==':
        return (v1 !== v2);
      case '<':
        return (v1 < v2);
      case '<=':
        return (v1 <= v2);
      case '>':
        return (v1 > v2);
      case '>=':
        return (v1 >= v2);
      case '&&':
        return (v1 && v2);
      case '||':
        return (v1 || v2);
      default:
        return false;
    }
  }

  Handlebars.registerHelper('compare', function (v1, operator, v2, options) {
    return checkCondition(v1, operator, v2)
      ? options.fn(this)
      : options.inverse(this);
  });
}());