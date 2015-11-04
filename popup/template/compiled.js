(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['login'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"text-danger\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        <form id=\"login_form\">\n            <div class=\"form-group\">\n                <label for=\"username_input\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n                <input required=\"required\" type=\"text\" class=\"form-control\"\n                       placeholder=\""
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"username\" value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.form : depth0)) != null ? stack1.username : stack1), depth0))
    + "\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password_input\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n                <input required=\"required\" type=\"password\" class=\"form-control\" id=\"password_input\"\n                       placeholder=\""
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"password\" value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.form : depth0)) != null ? stack1.password : stack1), depth0))
    + "\">\n            </div>\n            <button id=\"login_button\" type=\"button\" class=\"btn btn-success\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"loginButtonText",{"name":"chrome_t","hash":{},"data":data}))
    + "</button>\n            <a class=\"pull-right\" href=\"/popup/registration.html\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"registrationLinkText",{"name":"chrome_t","hash":{},"data":data}))
    + "</a>\n        </form>\n    </div>\n</div>\n";
},"useData":true});
templates['main'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "active";
},"3":function(container,depth0,helpers,partials,data) {
    return "checked";
},"5":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=container.lambda, alias2=container.escapeExpression;

  return "            <option value=\""
    + alias2(alias1((depth0 != null ? depth0.code : depth0), depth0))
    + "\" "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.code : depth0),"===",((stack1 = (depths[1] != null ? depths[1].userProfile : depths[1])) != null ? stack1.target_lang : stack1),{"name":"compare","hash":{},"fn":container.program(6, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">"
    + alias2(alias1((depth0 != null ? depth0.name : depth0), depth0))
    + "</option>\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "selected";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression;

  return "<div class=\"row\">\n  <div class=\"col-xs-12\">\n    <form>\n      <div class=\"form-group\">\n        <label for=\"ext_on\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"translateOnSelectText",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <div class=\"btn-group btn-group-justified\" data-toggle=\"buttons\">\n          <label class=\"btn btn-success "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isOff : depth0),{"name":"unless","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <input class=\"js-extension\" type=\"radio\" name=\"is_off\" id=\"ext_on\" autocomplete=\"off\" value=\"\"\n                   "
    + ((stack1 = helpers.unless.call(alias1,(depth0 != null ? depth0.isOff : depth0),{"name":"unless","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n            "
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"onText",{"name":"chrome_t","hash":{},"data":data}))
    + "\n          </label>\n          <label class=\"btn btn-danger "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOff : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\">\n            <input class=\"js-extension\" type=\"radio\" name=\"is_off\" id=\"ext_off\" autocomplete=\"off\" value=\"1\"\n                   "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.isOff : depth0),{"name":"if","hash":{},"fn":container.program(3, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + ">\n            "
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"offText",{"name":"chrome_t","hash":{},"data":data}))
    + "\n          </label>\n        </div>\n        <span id=\"helpBlock\" class=\"help-block\">"
    + alias3(((helper = (helper = helpers.isOffShortcut || (depth0 != null ? depth0.isOffShortcut : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"isOffShortcut","hash":{},"data":data}) : helper)))
    + "</span>\n      </div>\n      <div class=\"form-group\">\n        <label for=\"target_lang\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"targetLanguageText",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n        <select id=\"target_lang\" name=\"target_lang\" class=\"form-control js-global\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.languages : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0, blockParams, depths),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </select>\n      </div>\n    </form>\n    <p>"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"loggedInAsText",{"name":"chrome_t","hash":{},"data":data}))
    + " "
    + alias3(container.lambda(((stack1 = (depth0 != null ? depth0.userInfo : depth0)) != null ? stack1.username : stack1), depth0))
    + "</p>\n    <a href=\"#\" id=\"logout\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"logoutLinkText",{"name":"chrome_t","hash":{},"data":data}))
    + "</a>\n  </div>\n</div>\n";
},"useData":true,"useDepths":true});
templates['registration'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"text-danger\">"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</p>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3=container.escapeExpression, alias4=container.lambda;

  return "<div class=\"row\">\n    <div class=\"col-xs-12\">\n        <div>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.errors : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n        <form id=\"registration_form\">\n            <div class=\"form-group\">\n                <label for=\"username_input\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n                <input required=\"required\" type=\"text\" class=\"form-control\"\n                       placeholder=\""
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"usernamePlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"username\" value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.form : depth0)) != null ? stack1.username : stack1), depth0))
    + "\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"email_input\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"emailPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n                <input required=\"required\" type=\"email\" class=\"form-control\" id=\"email_input\"\n                       placeholder=\""
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"emailPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"email\" value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.form : depth0)) != null ? stack1.email : stack1), depth0))
    + "\">\n            </div>\n            <div class=\"form-group\">\n                <label for=\"password_input\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "</label>\n                <input required=\"required\" type=\"password\" class=\"form-control\" id=\"password_input\"\n                       placeholder=\""
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"passwordPlaceholder",{"name":"chrome_t","hash":{},"data":data}))
    + "\" name=\"password\" value=\""
    + alias3(alias4(((stack1 = (depth0 != null ? depth0.form : depth0)) != null ? stack1.password : stack1), depth0))
    + "\">\n            </div>\n            <button id=\"registration_button\" type=\"button\" class=\"btn btn-success\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"registerButtonText",{"name":"chrome_t","hash":{},"data":data}))
    + "</button>\n            <a class=\"pull-right\" href=\"/popup/login.html\">"
    + alias3((helpers.chrome_t || (depth0 && depth0.chrome_t) || alias2).call(alias1,"loginLinkText",{"name":"chrome_t","hash":{},"data":data}))
    + "</a>\n        </form>\n    </div>\n</div>\n\n";
},"useData":true});
})();