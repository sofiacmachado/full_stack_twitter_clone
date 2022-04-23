function Request() {
  this.type = '';
  this.url = '';
  this.data = {};
  this.dataType = 'json';
  this.success = function(response){
    console.log('success', response);
  }
  this.error = function(response){
    console.log('error', response);
  }
};

//------------------ Create User --------------------

export function createUser(username, email, password, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'POST';
  newRequest['url'] = 'api/users';
  newRequest['data'] = {
    'user': {
      'username': username,
      'email': email,
      'password': password
    }
  };
  newRequest['success'] = function(response){
    console.log(response);
    if (response.success != false) {
      return callback();
    }
  };

  $.ajax(newRequest);
};

//------------------ Signing In -----------------------

export function signInUser(username, password, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'POST';
  newRequest['url'] = 'api/sessions';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['data'] = {
    'user': {
      'username': username,
      'password': password
    }
  };
  newRequest['success'] = function(response){
    console.log(response);
    if (response.success != false) {
      return callback();
    }
  };

  $.ajax(newRequest);
};

//------------------- Logging Out ---------------------

export function logoutUser(callback) {
  var newRequest = new Request();
  newRequest['type'] = 'DELETE';
  newRequest['url'] = 'api/sessions';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['success'] = function(response){
    console.log(response);
    if (response.success != false) {
      return callback();
    }
  };

  $.ajax(newRequest);
}

//------------------ Authenticate ---------------------

export function authenticate(successCB,errorCB) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/authenticated';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['success'] = function(response){
    console.log(response);
    return successCB(response);
  };
  newRequest['error'] = function(request, errorMessage) {
    return errorCB(errorMessage);
  }

  $.ajax(newRequest);
};

//---------------------- Tweets -----------------------

//------------------- Post a Tweet --------------------
export function postTweet(msg, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'POST';
  newRequest['url'] = 'api/tweets';
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['data'] = {
    'tweet': {
      'message': msg
    }
  };
  newRequest['success'] = function(response){
    console.log(response);
    return callback({'success': true});
  };

  $.ajax(newRequest);
};

//------------------- Get all Tweets ------------------

export function getAllTweets(callback) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/tweets';
  newRequest['success'] = function(response){
    return callback(response.tweets);
  };

  $.ajax(newRequest);
};

//----------------- Get tweet by ID --------------------

export function getOneTweet(id) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/tweets/' + id;
  newRequest['success'] = function(response){
    console.log(response);
  };

  $.ajax(newRequest);
};

//------------- Get All Tweets by Username -------------

export function getUserTweets(username, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'GET';
  newRequest['url'] = 'api/users/' + username + '/tweets';
  newRequest['success'] = function(response){
    console.log(response);
    return callback(response.tweets);
  };

  $.ajax(newRequest);
};

//---------------- Delete a tweet by ID ----------------

export function deleteOneTweet(id, callback) {
  var newRequest = new Request();
  newRequest['type'] = 'DELETE';
  newRequest['url'] = 'api/tweets/' + id;
  newRequest['xhrFields'] = { 'withCredentials': true };
  newRequest['success'] = function(response){
    console.log(response);
    return callback();
  };

  console.log('deleting tweet:', id);
  $.ajax(newRequest);
};

//--------------- Search Tweet by Keyword --------------

export function searchTweets(keyword, callback) {
  var newRequest = new Request();
  newRequest['type'] = "GET";
  newRequest['url'] = "api/tweets/search/"+keyword;
  newRequest["success"] = function(response){
    console.log(response);
    return callback(response.tweets);
  };

  $.ajax(newRequest);
};
