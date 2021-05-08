$('.password-control').on('click', function(){
	if ($('.form-password').attr('type') === 'password'){
		$(this).addClass('view');
		$('.form-password').attr('type', 'text');
	} 
  else {
		$(this).removeClass('view');
		$('.form-password').attr('type', 'password');
	}
	return false;
});