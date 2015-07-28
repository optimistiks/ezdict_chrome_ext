(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <form id=\"login_form\">\n      <div class=\"form-group\">\n        <label for=\"username_input\">"
    + alias3(((helper = (helper = helpers.usernamePlaceholder || (depth0 != null ? depth0.usernamePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"usernamePlaceholder","hash":{},"data":data}) : helper)))
    + "</label>\n        <input required=\"required\" type=\"text\" class=\"form-control\" placeholder=\""
    + alias3(((helper = (helper = helpers.usernamePlaceholder || (depth0 != null ? depth0.usernamePlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"usernamePlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"username\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password_input\">"
    + alias3(((helper = (helper = helpers.passwordPlaceholder || (depth0 != null ? depth0.passwordPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"passwordPlaceholder","hash":{},"data":data}) : helper)))
    + "</label>\n        <input required=\"required\" type=\"password\" class=\"form-control\" id=\"password_input\" placeholder=\""
    + alias3(((helper = (helper = helpers.passwordPlaceholder || (depth0 != null ? depth0.passwordPlaceholder : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"passwordPlaceholder","hash":{},"data":data}) : helper)))
    + "\" name=\"password\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-success\">"
    + alias3(((helper = (helper = helpers.loginButtonText || (depth0 != null ? depth0.loginButtonText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"loginButtonText","hash":{},"data":data}) : helper)))
    + "</button>\n    </form>\n    <a class=\"pull-right\" href=\"/popup/registration.html\">"
    + alias3(((helper = (helper = helpers.registrationLinkText || (depth0 != null ? depth0.registrationLinkText : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"registrationLinkText","hash":{},"data":data}) : helper)))
    + "</a>\n  </div>\n</div>\n";
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