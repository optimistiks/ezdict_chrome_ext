Handlebars.registerHelper('t', function (i18n_key) {
    var result = i18n.t(i18n_key);

    return new Handlebars.SafeString(result);
});
