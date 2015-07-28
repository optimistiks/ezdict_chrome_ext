(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div>\n  <form id=\"login_form\">\n    <input required=\"required\" type=\"text\" placeholder=\""
    + alias3(((helper = (helper = helpers.usernamePlaceholder || (depth0 != null ? depth0.usernamePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"usernamePlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"username\">\n    <input required=\"required\" type=\"password\" placeholder=\""
    + alias3(((helper = (helper = helpers.passwordPlaceholder || (depth0 != null ? depth0.passwordPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"passwordPlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"password\">\n    <input type=\"submit\" value=\""
    + alias3(((helper = (helper = helpers.loginButtonText || (depth0 != null ? depth0.loginButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"loginButtonText","hash":{},"data":data}) : helper)))
    + "\">\n  </form>\n  <a href=\"/popup/registration.html\">"
    + alias3(((helper = (helper = helpers.registrationLinkText || (depth0 != null ? depth0.registrationLinkText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"registrationLinkText","hash":{},"data":data}) : helper)))
    + "</a>\n</div>";
},"useData":true});
templates['main'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper;

  return "<div>\n  <div id=\"username\">\n    logged in\n  </div>\n  <a href=\"#\" id=\"logout\">"
    + this.escapeExpression(((helper = (helper = helpers.logoutLinkText || (depth0 != null ? depth0.logoutLinkText : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"logoutLinkText","hash":{},"data":data}) : helper)))
    + "</a>\n</div>\n";
},"useData":true});
templates['registration'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div>\n  <form id=\"registration_form\">\n    <input required=\"required\" type=\"text\" placeholder=\""
    + alias3(((helper = (helper = helpers.usernamePlaceholder || (depth0 != null ? depth0.usernamePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"usernamePlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"username\">\n    <input required=\"required\" type=\"text\" placeholder=\""
    + alias3(((helper = (helper = helpers.emailPlaceholder || (depth0 != null ? depth0.emailPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"emailPlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"email\">\n    <input required=\"required\" type=\"password\" placeholder=\""
    + alias3(((helper = (helper = helpers.passwordPlaceholder || (depth0 != null ? depth0.passwordPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"passwordPlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"password\">\n    <input type=\"submit\" value=\""
    + alias3(((helper = (helper = helpers.registerButtonText || (depth0 != null ? depth0.registerButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"registerButtonText","hash":{},"data":data}) : helper)))
    + "\">\n  </form>\n  <a href=\"/popup/router.html\">"
    + alias3(((helper = (helper = helpers.loginLinkText || (depth0 != null ? depth0.loginLinkText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"loginLinkText","hash":{},"data":data}) : helper)))
    + "</a>\n</div>";
},"useData":true});
})();