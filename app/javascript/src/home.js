$(".static_pages.home").ready(function(){

  //------------------ authenticate and redirect ---------------------

  function authenRedirect() {
    authenticate(function(response) {
      if(response.authenticated) {
        window.location.replace("/feeds");
      }
    });
  };

  //------------------- Sign up / Log in Buttons ---------------------

  $(document).on('click', '#sign-up-btn', function(e){
    e.preventDefault();
    var usernameInput = $('.sign-up .username').val();
    var emailInput = $('.sign-up .email').val();
    var passwordInput = $('.sign-up .password').val();
    createUser(usernameInput, emailInput, passwordInput, function(){
      signInUser(usernameInput, passwordInput, function(){
        authenRedirect();
      });
    });
  });

  $(document).on('click', '#log-in-btn', function(e){
    e.preventDefault();
    var usernameInput = $('.log-in .username').val();
    var passwordInput = $('.log-in .password').val();
    signInUser(usernameInput, passwordInput, function(){
      authenRedirect();
    });
  });

  //------------------ changing background image ---------------------

  var backgroundURL = [
    "<%= asset_path 'background_2.png' %>",
    "<%= asset_path 'background_3.jpg' %>",
    "<%= asset_path 'background_1.png' %>"
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
