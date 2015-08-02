(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <form id=\"login_form\">\n      <div class=\"form-group\">\n        <label for=\"username_input\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <input required=\"required\" type=\"text\" class=\"form-control\" placeholder=\""
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"username\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password_input\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <input required=\"required\" type=\"password\" class=\"form-control\" id=\"password_input\" placeholder=\""
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"password\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-success\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"loginButtonText",{"name":"chrome_t","hash":{},"data":data}))
    + "</button>\n    </form>\n    <a class=\"pull-right\" href=\"/popup/registration.html\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"registrationLinkText",{"name":"chrome_t","hash":{},"data":data}))
    + "</a>\n  </div>\n</div>\n";
},"useData":true});
templates['main'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-xs-12\">\n    <form>\n      <div class=\"form-group\">\n        <label for=\"ext_on\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"translateOnSelectText",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n          <label class=\"btn btn-success active\">\n            <input type=\"radio\" name=\"options\" id=\"ext_on\" autocomplete=\"off\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"onText",{"name":"chrome_t","hash":{},"data":data}))
    + "\n          </label>\n          <label class=\"btn btn-danger\">\n            <input type=\"radio\" name=\"options\" id=\"ext_off\" autocomplete=\"off\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"offText",{"name":"chrome_t","hash":{},"data":data}))
    + "\n          </label>\n        </div>\n        <span id=\"helpBlock\" class=\"help-block\">Ctrl + X</span>\n      </div>\n    </form>\n    "
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"loggedInAsText",{"name":"chrome_t","hash":{},"data":data}))
    + " "
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.username : stack1), depth0))
    + "\n    <a href=\"#\" id=\"logout\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"logoutLinkText",{"name":"chrome_t","hash":{},"data":data}))
    + "</a>\n  </div>\n</div>\n";
},"useData":true});
templates['registration'] = template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <form id=\"registration_form\">\n      <div class=\"form-group\">\n        <label for=\"username_input\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <input required=\"required\" type=\"text\" class=\"form-control\" placeholder=\""
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"username\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"email_input\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"emailPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <input required=\"required\" type=\"email\" class=\"form-control\" id=\"email_input\" placeholder=\""
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"emailPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"email\">\n      </div>\n      <div class=\"form-group\">\n        <label for=\"password_input\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <input required=\"required\" type=\"password\" class=\"form-control\" id=\"password_input\" placeholder=\""
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"password\">\n      </div>\n      <button type=\"submit\" class=\"btn btn-success\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"registerButtonText",{"name":"chrome_t","hash":{},"data":data}))
    + "</button>\n    </form>\n    <a class=\"pull-right\" href=\"/popup/login.html\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"loginLinkText",{"name":"chrome_t","hash":{},"data":data}))
    + "</a>\n  </div>\n</div>\n\n";
},"useData":true});
})();