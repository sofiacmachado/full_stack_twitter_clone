import * as requests from './requests';

$('.feed').ready(function(){
  console.log('ready');

  var currentUser;

  function profileCardChanger(username) {
    $('.user-field .username').text(username);
    $('.user-field .screenName').text('@'+username);
    requests.getUserTweets(username, function(response) {
      $('.user-stats-tweets').text(response.length);
    });
  };

  requests.authenticate(function(response) {
    console.log(response);
    if(response.authenticated) {
      currentUser = response.username;
      $('#user-icon').text(currentUser);
      $('.username').text(currentUser);
      $('.screenName').text('@'+currentUser);
      requests.getUserTweets(currentUser, function(response) {
        $('.user-stats-tweets').text(response.length);
      });
    } else {
      window.location.replace("/");
    }
  }, function(error) {
    console.log(error);
    // window.location.replace("/");
  });

  $('#log-out').click(function(e) {
    e.preventDefault();
    requests.logoutUser(function(){
      requests.authenticate(function(response) {
        if(!response.authenticated) {
          window.location.replace("/");
        }
      },
      function(error) {
        console.log(error);
        // window.location.replace("/");
      });
    });
  });

  //--------------- Post Tweet Char Counter ----------------
  
  function charCount() {
    var char = $('.post-input').val().length;
    $('.post-char-counter').text(140-char);
    if(char > 0 && char <= 140) {
      $("#post-tweet-btn").removeAttr('disabled');
    } else {
      $("#post-tweet-btn").attr('disabled','disabled');
    }
  };

  $('.post-input').on('keyup', function() {
    charCount();
  });

  $('#post-tweet-btn').click(function(e) {
    e.preventDefault();
    console.log('hoooo');
    requests.postTweet($('.post-input').val(), function(result) {
      if(result.success) {
        $('.post-input').val('');
        getTweetsAndPost();
        charCount();
        requests.getUserTweets(currentUser, function(response) {
        $('.user-stats-tweets').text(response.length);
      });
      }
    });
  });
  
  function getTweetsAndPost() {
    requests.getAllTweets(function(tweets){
      $('.feed').text('');
      console.log('got all tweets');
      $.each(tweets, function(index){
        if(tweets[index]['username'] === currentUser) {
          $('.feed').append(
            '<div class="tweet col-xs-12"> \
            <a class="tweet-username" href="#">'+tweets[index]['username']+'</a> \
            <a class="tweet-screenName" href="#">@'+tweets[index]['username']+'</a> \
            <p>'+tweets[index]['message']+'</p> \
            <a class="delete-tweet" id="'+tweets[index]['id']+'" href="#">Delete</a> \
            </div>'
          );
        } else {
          $('.feed').append(
            '<div class="tweet col-xs-12"> \
            <a class="tweet-username" href="#">'+tweets[index]['username']+'</a> \
            <a class="tweet-screenName" href="#">@'+tweets[index]['username']+'</a> \
            <p>'+tweets[index]['message']+'</p> \
            </div>'
          );
        }
      });
      assignDeleteFunction($('.delete-tweet'));
    });
  }
  
  $('.navbar-brand').click(function(e) {
    e.preventDefault();
    getTweetsAndPost();
    profileCardChanger(currentUser);
  });

  function assignDeleteFunction(buttons) {
    buttons.click(function(e) {
      e.preventDefault();
      console.log('clicked delete:', $(this).attr('id'));
      requests.deleteOneTweet($(this).attr('id'), function(){
        getTweetsAndPost();
      });
    });
  }

  function getUserTweetsAndPost(username) {
    requests.getUserTweets(username, function(response) {
      $('.feed').text('');
      console.log('got user tweets', response);
      $.each(response, function(index){
        if(response[index]['username'] === currentUser) {
          $('.feed').append(
            '<div class="tweet col-xs-12"> \
            <a class="tweet-username" href="#">'+response[index]['username']+'</a> \
            <a class="tweet-screenName" href="#">@'+response[index]['username']+'</a> \
            <p>'+response[index]['message']+'</p> \
            <a class="delete-tweet" id="'+response[index]['id']+'" href="#">Delete</a> \
            </div>'
          );
        } else {
          $('.feed').append(
            '<div class="tweet col-xs-12"> \
            <a class="tweet-username" href="#">'+response[index]['username']+'</a> \
            <a class="tweet-screenName" href="#">@'+response[index]['username']+'</a> \
            <p>'+response[index]['message']+'</p> \
            </div>'
          );
        }
      });
    });
  }

  $('.tweet-username').click(function(e) {
    e.preventDefault();
    console.log('user tweets');
    getUserTweetsAndPost($(this).text());
    profileCardChanger($(this).text());
  });

  $('.username').click(function(e) {
    e.preventDefault();
    getUserTweetsAndPost($(this).text());
    profileCardChanger($(this).text());
  });

  function searchTweetsAndPost(keyword) {
    requests.searchTweets(keyword, function(tweets){
      console.log(tweets.length);
      if(tweets.length > 0) {
        $('.feed').text('');
        $.each(tweets, function(index){
          if(tweets[index]['username'] === currentUser) {
            $('.feed').append(
              '<div class="tweet col-xs-12"> \
              <a class="tweet-username" href="#">'+tweets[index]['username']+'</a> \
              <a class="tweet-screenName" href="#">@'+tweets[index]['username']+'</a> \
              <p>'+tweets[index]['message']+'</p> \
              <a class="delete-tweet" id="'+tweets[index]['id']+'" href="#">Delete</a> \
              </div>'
            );
          } else {
            $('.feed').append(
              '<div class="tweet col-xs-12"> \
              <a class="tweet-username" href="#">'+tweets[index]['username']+'</a> \
              <a class="tweet-screenName" href="#">@'+tweets[index]['username']+'</a> \
              <p>'+tweets[index]['message']+'</p> \
              </div>'
            );
          }
        });
      }
    });
  };

  $('.search-btn').click(function(e) {
    e.preventDefault();
    searchTweetsAndPost($('.search-input').val());
  });

  getTweetsAndPost();
  
});
