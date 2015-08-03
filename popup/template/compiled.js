(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"1":function(depth0,helpers,partials,data) {
    return "        <p class=\"text-danger\">"
    + this.escapeExpression(this.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-sm-12\">\n    <div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\n    <form id=\"login_form\">\n      <div class=\"form-group\">\n        <label for=\"username_input\">"
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
templates['main'] = template({"1":function(depth0,helpers,partials,data) {
    return "active";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-xs-12\">\n    <form>\n      <div class=\"form-group\">\n        <label for=\"ext_on\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"translateOnSelectText",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n          <label class=\"btn btn-success "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.isOff : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <input type=\"radio\" name=\"is_off\" id=\"ext_on\" autocomplete=\"off\" value=\"\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"onText",{"name":"chrome_t","hash":{},"data":data}))
    + "\n          </label>\n          <label class=\"btn btn-danger "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.isOff : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <input type=\"radio\" name=\"is_off\" id=\"ext_off\" autocomplete=\"off\" value=\"1\">"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"offText",{"name":"chrome_t","hash":{},"data":data}))
    + "\n          </label>\n        </div>\n        <span id=\"helpBlock\" class=\"help-block\">"
    + alias2(((helper = (helper = helpers.isOffShortcut || (depth0 != null ? depth0.isOffShortcut : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"isOffShortcut","hash":{},"data":data}) : helper)))
    + "</span>\n      </div>\n    </form>\n    <p>"
    + alias2((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias1).call(depth0,"loggedInAsText",{"name":"chrome_t","hash":{},"data":data}))
    + " "
    + alias2(this.lambda(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.username : stack1), depth0))
    + "</p>\n    <a href=\"#\" id=\"logout\">"
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