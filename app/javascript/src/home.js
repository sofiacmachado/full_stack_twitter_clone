import * as requests from './requests';

$(".static_pages.home").ready(function(){

  //------------------ authenticate and redirect ---------------------

  function authenRedirect() {
    requests.authenticate(function(response) {
      if(response.authenticated) {
        window.location.replace("/feeds");
      }
    }, function(error) {
      console.log(error);
      // window.location.replace("/");
    });
  };

  //------------------- Sign up / Log in Buttons ---------------------

  $(document).on('click', '#sign-up-btn', function(e){
    e.preventDefault();
    var usernameInput = $('.sign-up .username').val();
    var emailInput = $('.sign-up .email').val();
    var passwordInput = $('.sign-up .password').val();
    requests.createUser(usernameInput, emailInput, passwordInput, function(){
      requests.signInUser(usernameInput, passwordInput, function(){
        authenRedirect();
      });
    });
  });

  $(document).on('click', '#log-in-btn', function(e){
    e.preventDefault();
    var usernameInput = $('.log-in .username').val();
    var passwordInput = $('.log-in .password').val();
    requests.signInUser(usernameInput, passwordInput, function(){
      authenRedirect();
    });
  });

  //------------------ changing background image ---------------------

  var backgroundURL = [
    '"images/background_2.png"',
    '"images/background_3.jpg"',
    '"images/background_1.png"'
  ]
  var backStep = 0;

  var backgroundTimer = setInterval(function(){
    backStep++;
    if(backStep == backgroundURL.length) {
      backStep = 0;
    };
    var imageUrl = backgroundURL[backStep];
    setTimeout(function(){
      $('#homeback').fadeOut(1000, function(){
        $('#homeback').css('background-image', 'url(' + imageUrl + ')');
        $('#homeback').fadeIn(1000);
      });
    });
  }, 10000);

});
