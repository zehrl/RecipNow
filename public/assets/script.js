// form data base
var password = document.getElementById("password"),
  confirm_password = document.getElementById("confirm_password");

function validatePassword() {
  if (password.value != confirm_password.value) {
    confirm_password.setCustomValidity("Passwords Don't Match");
  } else {
    confirm_password.setCustomValidity('');
  }
}

password.onchange = validatePassword;
confirm_password.onkeyup = validatePassword;

$(window).load(function () {
  $(".trigger_popup_fricc").click(function(){
     $('.hover_bkgr_fricc').show();
  });
  $('.hover_bkgr_fricc').click(function(){
      $('.hover_bkgr_fricc').hide();
  });
  $('.popupCloseButton').click(function(){
      $('.hover_bkgr_fricc').hide();
  });
});

App.NavbarController = Ember.ArrayController.extend({
  isAuthenticated: false,
  login: function() {
    this.set('isAuthenticated', true);
  },
  logout: function() {
    this.set('isAuthenticated', false);
  }
});


// form data base end

// result collapsible arrow
$('.panel-collapse').on('show.bs.collapse', function () {
  $(this).siblings('.panel-heading').addClass('active');
});

$('.panel-collapse').on('hide.bs.collapse', function () {
  $(this).siblings('.panel-heading').removeClass('active');
});


