var api = {
  URL: 'http://api.ezdict.potapovmax.com'
};

api.buildUrl = function(path) {
  return this.URL + path + '/';
};

api.sendRequest = function(ajaxParams) {
  return $.ajax(ajaxParams);
};

api.register = function(formData) {
  return this.sendRequest({
    url: this.buildUrl('/user/register'),
    type: 'POST',
    data: formData
  })
};
api.login = function() {};
api.logout = function() {};
api.translate = function() {};

